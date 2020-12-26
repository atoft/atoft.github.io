---
layout: post
title: "What is freeplanet?"
project: freeplanet
img: images/code/banner_freeplanet.jpg
---

Over the past few years I've been fortunate to work on several big video games. I've mostly worked on gameplay, such as the implementation of parts of the "game feel" for characters and interactions, or the frameworks that power game modes and rules. In my spare time I've sometimes wanted to learn more in other areas of software engineering for games, such as lower level engine architecture or rendering. Some of that learning has gone into a project called freeplanet (naming things is hard).

freeplanet is written from scratch in C++. It's not exactly a game, as it doesn't have much in the way of gameplay (yet), but it doesn't have the authoring capabilities or editor of a full game engine. To give myself some direction, I aimed towards making a procedural sandbox inspired by the likes of Minecraft and No Man's Sky. 

![freeplanet screenshot](/images/posts/2020-freeplanet-screenshot.jpg)

Here's some of the main features of this not-game so far:

- 3D rendering with OpenGL.
- An architecture for large game worlds which supports loading/unloading parts of them on the fly.
- [Basic 3D object collisions.](http://localhost:4000/posts/2020/04/12/implementing-3d-collision-resolution/)
- Randomly generated spherical planets.
- Creation and destruction of smooth 3D volumetric terrain.
- Randomly generated and spawned trees.
- Particle effects.
- A 2D user interface.
- Keyboard and mouse controls, config files, an in game console, 3D and 2D debug displays, etc. etc.

Working on each of these things taught me a bunch and presented their own unique challenges. You can see some of them come together in this video:

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/MIRIqRrVlBs" style="max-width:100%" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

If you're especially keen, [builds of freeplanet](https://github.com/atoft/freeplanet/releases) are available to try out for Linux and Windows. For those who are feeling more technical, you can also check out [the code](https://github.com/atoft/freeplanet/). (It's available under a free software license.) 

In the future, there are loads of other areas I'd like to learn more about, and implement into the project. Some examples:

- Serialization and save games.
- Networking and client server architecture.
- Improved procedural generation, such as planets with distinct biomes and more variation in plants.
- Audio.
- Skeletal animation.

You know, nothing big 😛

So far freeplanet is a learning exercise, a tech demo, and a sandbox. What I'll make of it in future remains to be seen 🙂
