---
title: I (almost) completed my first side project!
date: 2020-07-26
draft: true
hero: "/images/computer-display.jpg"
caption:
  text: 
  attribution: Markus Spiske from Pexels
  attributionLink: https://www.pexels.com/@markusspiske?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels
excerpt: How eavesdropping on conversations between product managers helped me build my personal website.
bar:
  message: Wish to read this article on Medium?
  link: https://medium.com/@sarvesh0803/lets-talk-about-resiliency-37660be5eaf3
  linktext: Click here
tags: 
  - Website
  - Software
  - Me
  - Hugo
years: 2020
---

Having your own website is a lot like owning a house, the sense of satisfaction and belongingness that comes with having a place that you can call your own is unparalleled. This feeling, and the fact that websites are significantly more cheaper than houses, motivated me to make a personal website.

What I hadn't realized was how difficult it would be to complete a side project once I became tied with a job, living in a new city having to do all things adult. But thanks to a few learnings about project management I   picked up in my ongoing stint as a software developer, I have been able to complete this website to an extent where I can share it with the world.

## What is this article about?

This article is primarily aimed at people who are trying hard to complete a side project or people who are exploring technologies to make a personal website (do send me a note if you find this article useful, I love cheers!). 

* I will tell you about Hugo and why it is my technology of choice for developing this website or any text-heavy website.
* I will talk about how I set up my Github repository, Forestry and Netlify to help me manage, write and deploy at lightning speeds. 
* Every now and then I will chip in my learnings on some of the underrated aspects of product management that I actively applied during development.

This article won't delve into the code running this website but if you are interested, this website is [open source](https://github.com/sarveshraj/me)!

Ready and set? Let's go!

## Hugo

I developed my [first website](https://www.iitg.ac.in/scifac/cep/public_html/index.html) back in university. It was for my department's student body and it was built on nothing more than plain old HTML and CSS with some rudimentary JS. Although I remain massively proud of the design and animations I was able to pull off, it had one glaring limitation: **the content was tied to the code**. 

The solution was obvious though. I needed a CMS and a frontend library which supported componentization.

But having a CMS meant requiring a database and all the management costs that come with it. A frontend library like React and Angular is simply too much trouble for a single-person project. I plan to keep the development efforts of my site to a minimum so that I can focus more on what's important: writing. 

Enter [static site generators](https://www.staticgen.com/). Rather than fetching content from a database and rendering it on-demand as a typical CMS-backed website would, a SSG generates all the pages of the website once when all changes to the site are complete. This kills all moving parts making the website substantially more performant. By going with a SSG, all my articles are stored as static markdown files, which makes their management highly convenient. I even get a CMS thanks to Forestry! And with the advent of Netlify deployment has never been easier.

Hugo is a static site generator used by the likes of [Smashing Magazine](https://www.smashingmagazine.com/2019/05/switch-wordpress-hugo) and [Bootstrap Documentation](https://blog.getbootstrap.com/2020/06/16/bootstrap-5-alpha/#docs). 

### Github setup - tracking issues, managing releases, inspiration from work
### Netlify - everything is so easy nowadays
### Forestry - when I initially started building this website, this is how I worked, when I got to know about Forestry this is how I write now
### Hugo - who uses Hugo, toc, tags, componentization, why not _js, 
### Which theme, about page
### future plans, percy, snackbar, mobile optimizations, 

They don't want it perfect, they want it wednesday
Small steps, agile


