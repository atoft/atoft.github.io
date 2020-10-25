---
layout: post
title: "Some minor website updates"
project: addymotion
img: images/posts/2020-site-updates/header.jpg
---

I've made a few changes to my website. Here's a boring blog post about it.

There were a couple of issues I felt existed with the site that I wanted to address. The first of these was that I no longer liked the big, animated banner on the homepage. 
I think it's a bit distracting having the main image on the page change
every few seconds. More importantly, the banner shows images from projects that are posted on my site. Recently these are the games I've worked on on at my job, so it feels
a bit strange to have the page focus so much on marketing images - I'm not an artist so I had no part in making the images themselves. On the other hand, I like how visual
the site is so I wanted to keep a lot of big, bold pictures.

![The old animated banner.](/images/posts/2020-site-updates/old-banner.png)

I decided to scrap the animated banner and [replace it](/) with a background of logos/icons which I moved from another part of the page. 
They're intended to reference some of the projects that I've worked on and tools that I've used (although some of them probably need swapping out at some point). 

![The banner as of October 2020.](/images/posts/2020-site-updates/new-banner.png)

The other problem I had with the site was the way that everything was lumped together as "projects". A toy C++ program written in my spare time and a big budget video game I
was paid to work on for over a year probably shouldn't be in the same list. So I wanted to split out things related to my career or my education into a separate place.

This led to me throwing out the original structure of the site entirely. The original idea back in ~2015 was to have everything on one single homepage, with only individual 
projects getting their own pages. This would get even more messy with wanting to add more sections, and does it even make sense if each part of the site is 
aimed at somewhat different audiences?

So it's out with the big, long page with fancy dynamic scrolling between sections, and back to old-fashioned hyperlinks to different pages. On the homepage I've kept the 
preview of recent blog posts to make things feel a bit more active, and added an area to direct the visitor to the various sections. 
Contact links are pushed down to the bottom of every page, which means I can get rid of this horribly designed contact section, which was possibly the most ugly and 
inefficient way to display three tiny links:

![The old contacts section](/images/posts/2020-site-updates/old-contacts.png)

Tech-wise, things haven't changed much. I'm still using [Jekyll](https://jekyllrb.com) to generate the content, which works nicely enough. The design still uses the same 
[CSS and JavaScript framework](https://materializecss.com/) along with an increasingly disastrous mess of custom CSS. At some point I'd like to rewrite everything to be
much simpler, ideally with no third-party frameworks or any JavaScript at all. But today is not that day 🙃. I'd also like to stop relying on GitHub Pages, in light 
of some recent events[*](https://www.latimes.com/business/technology/story/2019-12-04/github-open-source-developers-ice-contract) [**](https://www.engadget.com/github-youtube-downloaders-riaa-223558038.html).

For now though, I hope this was a mildly interesting look at my thought process.
