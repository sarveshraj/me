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

## A little background

I developed my [first website](https://www.iitg.ac.in/scifac/cep/public_html/index.html) back in university. It was for my department's student association and it was built on nothing more than plain old HTML and CSS with some rudimentary JS. Although I remain massively proud of the design and animations I was able to pull off, it had one glaring limitation: **the content was tied to the code**. 

The solution was obvious though. I needed a CMS and a frontend library which supported componentization.

But having a CMS meant requiring a database and all the management costs that come with it. A frontend library like React and Angular is simply too much trouble for a single-person project. I plan to keep the development efforts of my site to a minimum so that I can focus more on what's important: writing. 

Enter [static site generators](https://www.staticgen.com/). Rather than fetching content from a database and rendering it on-demand as a typical CMS-backed website would, a static site generator generates all the pages of the website once when all changes to the site are complete. This kills all moving parts on the website making it substantially more performant. Another overlooked advantage with a static site generator is that all my articles are stored as static markdown files, which makes their management highly convenient. 

## About Hugo

Hugo is a static site generator and it is godsent for people who are facing the same problem described above. It is used by the likes of [Smashing Magazine](https://www.smashingmagazine.com/2019/05/switch-wordpress-hugo), [Bootstrap Documentation](https://blog.getbootstrap.com/2020/06/16/bootstrap-5-alpha/#docs), [1Password Support](https://support.1password.com/) and is one of the most popular static site generator out there.

But Sarvesh, I googled static site generators and there are many other options available. Why did you choose Hugo?

Well I did look into the other options, and here's why I chose Hugo:

### Hugo is FAST
Jekyll and Gatsby were the two other options I was considering when I started building this website. Jekyll has been around for a long time and enjoys a ton of themes and support. Gatsby is the newer kid on the block and is based on React which means it comes with all the goodiness of React and npm. In fact, Gatsby was my first choice before I saw [this](https://discourse.gohugo.io/t/smashing-magazine-s-redesign-powered-by-hugo-jamstack/5826/9).

> Smashing Magazine built their entire website, comprisiing of more than 7500 content-rich pages in 13 seconds. 

7500 pages in a mere 13 seconds.

In the daytime I am responsible for a couple of Java/Spring based microservices which are part of Adobe's cloud infrastructure. As I switch gears with the setting of sun, watching the build times on the terminal drop from minutes to milliseconds is a (huge) breath of fresh air.

<?Enter image of build time>

### Hugo is low maintenance
Hugo is a self-contained binary with zero dependencies, a very simple setup, and no database or complicated hosting steps. All these factors directly contribute to significantly reducing the maintenance churn with Hugo when compared to other approaches of web development. 

At work, I own a backoffice tool which is a Node server backing a Angular frontend. Although very powerful and extensible, the Angular-Node stack comes with a high maintenance expense. Dependencies break with updates and security issues keep popping up more often than I would like. 

I plan on keeping my website running for a long time; you can probably see why Hugo appealed to me.

### Hugo is extremely powerful
Hugo comes with a ton of features out of the box.

* Table of contents? You got it.
* Tags (or any custom taxonomy) support? Yes, sir.
* Build reusable HTML layouts? Ahuh.
* Word count, Minutes to read? Free of cost.
* Rich content inside Markdown? Yep.
* SEO friendly, Disqus, Google analytics? You get the drill.

These features are tailor made to support websites which are consumption heavy like blogs, personal portfolios, documenations etc.

***

## Github, Netlify and Forestry

I host all my code on Github with Netlify integration for deployments. There are a couple of things I do on Github which I would like to bring to notice.

**Pull requests:** I raise PRs despite being the sole developer. This gives me a chance to review my code before pushing it to release. Squash and merge is the only way I merge. Non linear history causes all kinds of problems. Don’t believe me? Watch Netflix’s Dark.

**Release branches:** I do not subscribe to the develop-master branch duality for development. It works but I prefer replacing the develop branch with release branches. I first came across releases branches in a project at work and I could immediately see its merits. These branches while serving the purpose of interim develop branches also act as trackable milestones. I could use tags, but I find this more convenient. 

**Github Issues:** In university we did course projects as big blobs. There were hardly any task breakdowns and we tried to deliver the perfect project in one homogenous, all-encompassing step; to say in other words, we were not agile. I have come to realize and accept that as the inferior way of project management. This quote from Robert A. Heinlein humorously sumrises the intent:

> They didn't want it good, they wanted it Wednesday.

I track tasks using Github Issues. It has just the right amount of features to get the job done and it lives right in my repository. Apart from the usual, `enhancement` and `bug` tags, I also add two additional tags as a rule. One tag is an `eta` tag which is a rough estimate of the time it will take to complete the task. The other is an `importance` tag which, well, determines the importance of the task. 

<?add image of tags>

Using these two tags I am able to effectively plan the priority of the tasks I undertake by building my own Eisenhower-esque matrix. As none of the tasks are urgent (I am my own boss here 🙂), I substitute the urgency parameter with ease-of-completion. 

<?add image of my matrix>

**Netlify:** 3 clicks. That's all it takes for me to deploy my website. All with a staging deploy, inbuilt compression <? add more things>

**Forestry:** Forestry is CMS which links to your Github account and reads your JAMStack website. Honestly one needs to try Forestry to appreciate it. It is that good.

Here is a before-after comparison of life with Forestry:

<?image of working with forestry>


### Which theme, about page
### future plans, percy, snackbar, mobile optimizations, [git lfs](https://www.smashingmagazine.com/2019/05/switch-wordpress-hugo/#activating-git-lfs)



I don't trust humans that is why I ask for tickets


