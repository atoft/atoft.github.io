---
layout: post
title: "Engines, compile-time programming, and a new language for games?"
img: images/posts/zig/header-mascot.svg
---

Zig is a new systems programming language that is still under active development. It's been described as a C replacement, and there are a few features that make it appealing for games. In this post, I want to dive into one area that has a lot of potential.

---

Game engines are *data-driven*. Characters, inventory items, levels, player settings, all of these are represented by data structures defined in code (structs or classes) which will determine what the game does. However, we also need to convert these structures between various different forms, and interact with them in different ways.

We want to load the game data into memory from a compact binary format on the player's hard disk. Our game designers would like a visual editor, such as a property grid, to view and tweak the data and save it. Perhaps we need to load the player's preferences from a human-readable text format. And if our game is multiplayer, we'll want to send some of our data across the internet and put it back together on another player's machine.

![Diagram showing a struct compiled from source code to produce a runtime game object, which must also be transformed to and from a binary blob, a config file, an editor GUI, and a network packet.](/images/posts/zig/reflection-examples.svg)

All of these features require our program to have some knowledge of the contents of its own data structures at runtime. For example, we need to be able to iterate over all the fields in a struct and be aware of their types in order to draw them in a GUI in a sensible way. We need some [reflection](https://en.wikipedia.org/wiki/Reflective_programming) capability.

Unfortunately, C++ reflection is almost non-existent. If we want to do something with each field in a struct, we'll have to write some code to do it for each type we ever use. Taking my [toy game engine](/projects/code/freeplanet) as an example, it has a few template classes to convert data to and from text or binary files. But every time I want to use this system with a new type, I have to write a new template which calls a function for every single field. (Sorry if you're not that familiar with C++, feel free to skim over this bit!) For example, here are the graphics settings:

```C++
// C++
struct GraphicsConfig
{
    glm::ivec2 m_Resolution = glm::ivec2(1280, 720);
    bool m_IsFullscreen = true;

    u32 m_AntialiasingLevel = 4;
    bool m_IsVsyncEnabled = true;

    f32 m_FieldOfViewDegrees = 90.f;
};
```

and here's the function defined afterwards that "inspects" each of the fields to let the reflection system know about it:

```C++
// C++
template <typename InspectionContext>
void Inspect(std::string _name, GraphicsConfig& _target, InspectionContext& _context)
{
    _context.Struct("GraphicsConfig", InspectionType::GraphicsConfig, 0);

    Inspect("Resolution", _target.m_Resolution, _context);
    Inspect("IsFullscreen", _target.m_IsFullscreen, _context);
    Inspect("AntialiasingLevel", _target.m_AntialiasingLevel, _context);
    Inspect("IsVsyncEnabled", _target.m_IsVsyncEnabled, _context);

    Inspect("FieldOfViewDegrees", _target.m_FieldOfViewDegrees, _context);

    _context.EndStruct();
}
```

This works, but it's not exactly ideal. Better hope that nobody adds a new field to GraphicsConfig and forgets to update the function. Also keep in mind that each of those fields has a type of its own, each of which also needs its own `Inspect` function implemented. When there are thousands of types in a game, with dozens of properties each, this kind of code doesn't scale well.

The way that most game engines actually solve this problem is through [code generation](https://www.unrealengine.com/en-US/blog/unreal-property-system-reflection). Rather than writing this crappy code by hand, they introduce some new markup, either in the form of macros or a custom definition language, and hand this over to a program which outputs the needed crappy code for us. So now we've got a whole other program to maintain (or a black box that we dare not look into, depending on whether we're using our own engine or someone else's), a whole new markup language to learn, an extra step in our build process, and a bunch of auto-generated junk cluttering up our codebase.

What if there was a way we could have everything we needed, without any boilerplate, and entirely within the same programming language? I guess you can see where this is going... 😉

# Zig time!

Zig largely aims to be a simple language, but one major feature it has compared to its competitors is strong **compile-time programming** support. This means that you can write arbitrary code that can be executed by the compiler as your program is being built, rather than directly generating runtime instructions.

What's especially cool about this is that compile-time code isn't written in a special meta-language like macros or C++ templates - it's just regular code, the same as the rest of your Zig program. A function that doesn't depend on any runtime values can be executed at compile time.

Here's one [example](https://ziglang.org/learn/overview/#compile-time-reflection-and-compile-time-code-execution), where a function is executed at compile time to decide the length of array to allocate. It's also probably the first Zig code you've seen, but hopefully it's simple enough to get the gist of the syntax:
```Zig
// Zig

// A normal Zig function.
fn fibonacci(x: u32) u32 {
    if (x <= 1) return x;
    return fibonacci(x - 1) + fibonacci(x - 2);
}

// Declaring a fixed-size array.
var array: [fibonacci(6)]i32 = undefined;
```

Going further, Zig uses the same concept to implement generic types. A function executed at compile-time can take types as arguments and return a type as a result. This makes it natural to define, for example, a generic linked list as a function that takes as its argument the type of the list element, and returns the new linked list type.
```Zig
// Zig

// A function which takes, at compile-time, a type as its argument, and returns a new type.
pub fn List(comptime T: type) type {
    return struct {
        next: ?*List(T),  // An optional pointer to the next element.
        value: Type,      // A value of type T.
    };
}
```

The [language documentation](https://ziglang.org/documentation/master/#comptime) introduces the whole compile-time programming concept ("comptime") very well if you're interested to learn more.

# Reflecting back

So how does this relate back to the original problem I introduced? One more feature available at compile-time is the built-in `@typeInfo` function. This performs compile-time reflection, returning a struct of meta information about the type that was passed in. For example, it gives the names and types of all the fields within a struct. This is exactly the information we'd need to generate the code that was in the boilerplate template in the C++ example. 

We can use a compile-time `for` loop to iterate over all the fields of the struct and implement whatever logic we'd need to do for each of them (serializing to/from disk, drawing a UI widget, etc. etc.). All of these constructs will compile down so that only the code that's needed at runtime will be part of the actual executable, meaning there should be no runtime overhead compared to manually writing out the code for every single type that's needed.

I had a go at re-implementing the text serialization from my game engine in this way. Here's a small sample just to give a feel for the code. (With the disclaimer that I'm still learning this language, and left out some stuff like error handling...!) It takes a `value` (the type of which is known at compile-time), and writes a string representation to `result`.
```Zig
// Zig
fn toText(value: anytype, result: *String, depth: u32) !void {
    const Type = @TypeOf(value);
    switch (@typeInfo(Type)) {
        .Struct => |struct_info| {
            inline for (struct_info.fields) |field| {
            
                // Add in some whitespace, and print the name of the field.
                try appendIndent(result, depth + 1);
                try std.fmt.format(result.writer(), "{}: ", .{field.name});
                
                // Get a pointer to the field. 
                // Note that the field name is known at compile-time, and the value at run-time.
                const field_value = &@field(value, field.name);
                
                // Recursively call the function for this field of the struct.
                try toText(field_value.*, result, depth + 1);
                try result.appendSlice(";\n");
            }
        },
        .Bool => {
            // Handling the specific case of writing a boolean to text.
            try result.appendSlice(if (value) "true" else "false");
        },
        // More cases...
```
The key point to make here is that this code is written once and will work for any new type that is thrown at it. And this is just a simple case, but all the examples I gave at the start of the post should be possible in the same way.

This post is already too long and dense, but it's only scratching the surface of the potential with comptime. Just as an aside, it completely eliminates the need to use pre-processor macros for conditional compilation (in fact, Zig has no macros at all). As it can import external files and do string processing, it could parse custom config files (or even scripting languages...?) at compile time to bake them into the program. There are all kinds of cases where it could reduce program complexity and boilerplate compared to C or C++, without adding any runtime overhead. This is all without mentioning the general quality of life improvements in the language design, cross-compilation capabilities, ease of using existing C libraries, and built-in build system.

As I said at the top, Zig is still in active development and has yet to reach a 1.0 release. That said, it's going to be very exciting to see how it shapes up and whether it can take on other potential challengers (*\*cough\** Rust *\*cough\**) as a replacement for C++ in games.

If you've made it this far, I'd really recommend reading through the [documentation](https://ziglang.org/documentation/master/) and giving it a try!

---

Header image from <https://github.com/ziglang/logo>, licensed under the Attribution 4.0 International (CC BY 4.0).
