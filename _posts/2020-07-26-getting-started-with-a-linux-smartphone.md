---
layout: post
title: "Getting started with a Linux smartphone"
img: images/posts/pinephone/pinephone-1-crop.jpg
project: 
---

I've been using GNU/Linux as the main operating system on my desktop (and laptop) for a few years. As a programmer I much prefer it as an operating system, thanks to how natural it is to use the terminal and Unix commands. For everyday use I find it more pleasant than Windows, and the user experience is getting better all the time.

The same has not really been possible on other devices like my phone, but fortunately several projects are working to change that. One example is Pine64's [PinePhone](https://www.pine64.org/pinephone/), a phone aimed at enthusiasts and developers who are working on mobile Linux distributions and apps.

In this post I'll take a look at my experience using and programming for the PinePhone so far. I'll go into some technical details, but you can skip over them if you just want an idea of what the phone is like.

# The phone
The PinePhone costs $150, so obviously it doesn't compare to high-end Android devices and iPhones. That said, the build quality is good and it feels like a "real phone". As well as a good, large screen and front and rear cameras, it also has a headphone jack, a removable battery and a MicroSD card slot. Another interesting feature is the hardware switches behind the back case to disable features like the modem and GPS for the privacy-conscious.

![Rear view of the PinePhone, showing the UBports and Pine64 logos.](/images/posts/pinephone/pinephone-2.jpg)

All in all the hardware, while still definitely an early model, is really impressive.

# Getting started with Ubuntu Touch
The version of the phone I bought came pre-installed with an operating system called [Ubuntu Touch](https://ubports.com/), from the UBports team. It has a fairly polished graphical user interface, a good web browser, and an app store, and a few basic apps installed. These apps are generally designed specifically for the OS, so they work properly on a mobile screen, but they vary a bit in how polished they are.

Like all the operating systems that are available, it's still early days on the device, so some things needed improvement (battery life) and others (camera) didn't work at all.

It has some interesting ideas from an architecture point of view; [the system software is immutable (read-only)](https://ubports.com/blog/ubports-blogs-news-1/post/terminal-chapter-1-3082) so all apps have to come in a specific package format called Clicks and run sandboxed from the rest of the software.

# Installing another operating system
Ubuntu Touch is an impressive project, but personally I wanted an operating system with capabilities more similar to what I was used to with Linux on the desktop.

Fortunately one of the benefits of the PinePhone is the ability to install virtually any Linux-based OS, and it's surprisingly easy to do. All you need is a MicroSD card and a USB cable.

On your PC, you can download a tool called [Jumpdrive](https://github.com/dreemurrs-embedded/Jumpdrive) and install ("flash") it onto the card using a simple Unix tool called `dd`.

![Jumpdrive running on the phone, with its filesystem shown on the monitor in the background.](/images/posts/pinephone/pinephone-3.jpg)

Once this card is inserted into the PinePhone, you can connect the phone to the PC by USB and access its internal storage. Now you can flash any operating system image onto it with `dd`. Remove the card, power on the phone, and that's it!

# Mobian
I chose to try [Mobian](https://mobian-project.org/), which is a version of the venerable Linux distribution Debian which is tweaked to work better on mobile devices.

This means you have access to all the software in the Debian package repositories, and other software sources like [Flatpak](https://www.flatpak.org/). It also means that all the tools and utilities available will be familiar to anyone who's used a Debian-based distribution like Ubuntu.

Mobian runs a user interface called [Phosh](https://source.puri.sm/Librem5/phosh), which is being developed for another Linux phone project, the [Librem 5](https://puri.sm/products/librem-5/). It's designed to be something of a mobile equivalent to the [GNOME Shell](https://en.wikipedia.org/wiki/GNOME_Shell), a desktop environment that will again be familiar to users of many Linux distributions. It still has rough edges, but it definitely shows lots of potential:

![Mobian lock screen, app drawer and settings.](/images/posts/pinephone/phosh.png)

As I mentioned, thanks to it being Debian-based, practically any open-source software for Linux can be installed and run on the phone. Of course, the majority of GUI applications won't have been designed to run on a mobile device, so how well they fit on the screen is a gamble. GNOME-based ([GTK](https://gtk.org/)) apps tend to have the best chance of working, and projects are starting to use the [`libhandy` library](https://gitlab.gnome.org/GNOME/libhandy/) to make their apps "reactive" so that the same user interface can scale between desktop and mobile, the same way that most modern websites do.

Meanwhile, Mobian also added a "fit to screen" feature which attempts to scale the apps so that they at least don't spill off the edges of the screen, although this can lead to comically tiny user interfaces to try and use on a touch screen.

Here's some examples of apps that work nicely on Mobian:

![Tootle, GNOME Web, and Feeds.](/images/posts/pinephone/mobian-apps.png)
- Fractal - a messaging client
- Calls and Chats - the Librem 5 phone and text apps
- Tootle - a Mastodon client (pictured)
- GNOME Web - a browser (pictured)
- Feeds - an RSS reader (pictured)
- Geary - an email client
- Lollypop - a music player

# Accessing the phone remotely
Since it's pretty early days for the software, you'll often find the need to install or tweak something using the command line. Mobian comes with a Terminal app you can use on the phone, but honestly trying to type out long commands on a touch screen is a complete nightmare. Thankfully, Unix tools come to the rescue again. It's easy to connect to the phone over `ssh`, so that you can send commands to the phone from your desktop, making the whole process much more usable. Similarly, you can transfer files across using `scp`.

![The terminal on PinePhone vs a remote session over ssh.](/images/posts/pinephone/terminal-vs-ssh.png)

For more everyday use, I use [Syncthing](https://syncthing.net/) to share files between my laptop, desktop and Android phone, and it works great on the PinePhone as well.

# Developing an app
My excuse for buying a PinePhone was that I'd make it a project to develop some software for it. Despite having used Linux for a few years I'm not that familiar with the toolkits that are available to develop with, so this seemed like a fun opportunity to learn.

Unlike on iPhone and Android, you can write apps for the phone in any programming language you like, from C or C++ to Python, JavaScript or even [bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell))! For the user interface, GTK provides bindings for all these languages and others.

I chose to use Rust as I've been meaning to get more experience with it. [GNOME Builder](https://wiki.gnome.org/Apps/Builder) comes with a template to make a GTK/Rust/Flatpak application so it's quite easy to get started. I found the interaction between "safe" Rust programming and the C-based GTK libraries to be very awkward, but I expect it will get easier when I get more familiar with both of them.

I hacked together an implementation of the famous zero-player game [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) as a learning exercise. It lets you open the game's "patterns" from a text file, and view and control the simulation. Compiling and testing the app on the PC is easy, but of course we want to try it on the phone!

![GNOME Builder running a Game of Life program.](/images/posts/pinephone/builder.png)

In theory we can compile the project on the phone itself, since all the compilers and build systems are available. In practice it's a little bit slow due to the underpowered hardware, and in fact I found that trying to compile the Rust libraries I needed would cause the phone to hang entirely. So, it's more feasible to compile on your desktop and transfer the build across. This requires "cross-compiling" since most desktops use x86_64 processors while the PinePhone, like most mobile devices, has an ARM-based processor. Using Flatpak, compiling for ARM turned out to be [quite a simple process](https://lists.freedesktop.org/archives/flatpak/2018-March/001019.html) (albeit still a bit slow) and produced a repository that can be transferred to the phone with `scp`. Then, the app can be installed and run on the phone.

It works! I didn't do anything to make the displayed patterns resize, so the app quickly expands off the edges of the screen if you load one that's too big, but as a proof-of-concept I'm happy with it!

![My Game of Life app on the phone.](/images/posts/pinephone/game.png)

# Impressions
It should be pretty clear from the post that "Linux on mobile" is not ready for the average user. That said, most of these projects are very new and the improvements I've seen in just the short time I've had the phone (in battery life, performance, and features) have been very impressive. Huge thanks to everyone working on the projects that are making this possible.

I'm still holding on to my Android phone for now. I'm really excited to see how the experience improves and I hope it won't be too long before I can switch over to the PinePhone for everyday use. In the meantime I hope to keep using it to learn more about Linux tools, and programming with new languages and libraries. I'd also like to work on a more useful app that might more helpful for Linux phone users.

