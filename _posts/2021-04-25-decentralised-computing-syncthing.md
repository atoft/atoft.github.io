---
layout: post
title: "Towards more decentralised computing with Syncthing"
---

For individuals, a personal computer is more and more just a window to services that are provided over the internet. One of the driving factors for that is the expectation for your stuff to be "available everywhere". When most people use multiple devices, from phones to tablets to desktops, local files are not good enough any more, leading to the proliferation of cloud services from the likes of Google and Dropbox.

Disregarding the privacy implications of handing your data over to third parties, your reliance on their security in the face of potential breaches, or the dubious power and influence of the corporations involved, there are more pragmatic reasons to avoid relying on centralised services. What if your file syncing service [stops supporting the setup that you use](https://www.dropboxforum.com/t5/Dropbox-files-folders/Dropbox-client-warns-me-that-it-ll-stop-syncing-in-Nov-why/m-p/290065/highlight/true#M42255), or your password manager [starts charging for features you were using for free](https://blog.lastpass.com/2021/02/changes-to-lastpass-free/)? Both of these examples actually happened to me, and led me to look at alternatives where the control of my stuff is back in my hands.

---

[Syncthing](https://syncthing.net/) is a simple piece of software for syncing things between your devices. You can think of it like Dropbox or Google Drive, but with the big distinction that there is no remote server, no datacentre in which your files are stored. Instead they are shared (more or less) directly between your own devices.

Install the program on each of your computers and link them up to one another (they'll find each other automatically if they're connected to the same network, and you use a simple QR code or ID to verify their identity). Then, you can choose one or more folders that you want to share, and which devices you want to share them between. And that's it - once you're up and running, it's one of those rare pieces of software that pretty much "just works".

![Syncthing web interface](/images/posts/syncthing/web-interface.png)

As well as running on virtually any desktop operating system, it also works on Android, iOS, and even [Linux mobile devices](/posts/2020/07/26/getting-started-with-a-linux-smartphone/). Best of all, it's fully free and open source.

Once you have it set up, Syncthing will happily run in the background to keep your documents, to-do lists, notes, etc. available on whatever device you're using. The main limitation to keep in mind, since there's no "cloud" in the background, is that two devices need to be turned on at the same time to sync files between them. If this becomes an issue for you, I found one neat way to avoid it. I use my phone as an "always online" go-between for my most frequently used files. Even though my laptop and desktop aren't always turned on at the same time (especially in the before times when I was out and about a lot), as long as each of them can find my phone when they are on, then my to-do lists and other bits and pieces will be synced there, and shared back to the other computer when I need them. This is another thing that "just works" in Syncthing, and doesn't need any extra setup.

Beyond just the obvious file syncing uses, here's a couple of other ways that I use Syncthing to do things that would otherwise require online services.

# Photo syncing
I take photos on my phone, but I want to look at them on my computer. And, after having the same phone for years, its storage is always full of pictures. Rather than rely on Google Photos or whatever Apple provides, I make the phone's camera folder a Syncthing folder (something that the Android app will offer to do for you automatically).

![Syncthing running on Android](/images/posts/syncthing/android-interface.jpg)

Then on my desktop I can delete the ones I don't want, and move old pictures I want to save to another folder.

# Calendar
Who needs Google Calendar? I have a .ics calendar file in my Syncthing, and I can use the same calendar on my desktop and my laptop.

![Using a calendar synced by Syncthing in GNOME Calendar](/images/posts/syncthing/gnome-calendar.png)

(One caveat on this one, I'm yet to find a good Android app that can edit these calendar files. Give me a shout it you find one!)

# Password manager
This section comes with the disclaimer that I'm not a security expert. 😉

I mentioned my password manager troubles at the start of the post. Instead I now have a KeePass file in my Syncthing which I use to hold my passwords. KeePass files are encrypted, and use both a master password and a separate private key file (which is not synced) so, even if you don't trust Syncthing (which is encrypted anyway) or the network you're using, it ought to be secure.

Once you have it, there are nice apps on every platform (including mobile) that can use KeePass files, making it very easy to use.

![Password Safe app on GNOME desktop](/images/posts/syncthing/password-safe.png)

# Tradeoffs and alternatives
One limitation to mention is that Syncthing is not a backup program. If your house burns down containing all your devices, or all your hard drives get hit by cosmic rays, your files are gone for good. There are plenty of open source backup programs you can use that will work fine alongside Syncthing, but if you need offsite backups for your most important files you'll probably need to pay someone to store them for you.

Syncthing is also not version control. It has options to store the history of your files, so you can rollback to an earlier version, but if you're likely to need to merge different versions of your files and have a full revision history, then you're going to want a Git repository.

One very popular alternative is to use [Nextcloud](https://nextcloud.com/). It aims to provide a much more full-featured set of services in your web browser, like a Google Docs replacements with collaborative editing, chat, video playback, email, and more. The tradeoff is added complexity, and the need to host your own server, either on a machine at home or hosted by a provider. For me it's a little more than I need.

---

Hopefully this post gave some good examples of the potential for modern tech to be used without relying on closed, centralised platforms, and how doing so could even making computing better and easier.

![Low quality meme of Marge Simpson saying "I just think they're neat", holding the Syncthing logo.](/images/posts/syncthing/neat.png)
