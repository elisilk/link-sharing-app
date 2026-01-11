# Frontend Mentor - Link-Sharing App

This is a solution to the [Link-sharing app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Create, read, update, delete links and see previews in the mobile mockup
- Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform
- Drag and drop links to reorder them
- Add profile details like profile picture, first name, last name, and email
- Receive validations if the profile details form is saved with no first or last name
- Preview their devlinks profile and copy the link to their clipboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account and log in (add user authentication to the full-stack app)

### Screenshots

|        Mobile designed at 375px:         |        Tablet designed at 1440px:        | Desktop designed at 1440px:               |
| :--------------------------------------: | :--------------------------------------: | ----------------------------------------- |
| ![](./screenshots/screenshot-mobile.png) | ![](./screenshots/screenshot-tablet.png) | ![](./screenshots/screenshot-desktop.png) |

### Links

- Solution URL: [https://github.com/elisilk/link-sharing-app](https://github.com/elisilk/link-sharing-app)
- Live Site URL: [https://link-sharing-app-eight-nu.vercel.app/](https://link-sharing-app-eight-nu.vercel.app/)

## My process

### Built with

- [Nuxt](https://nuxt.com/)

### What I learned

As always, so many cool :sunglasses: things. Here are some of the key resources I used.

#### Building the App

- [Full Stack App Build | Travel Log w/ Nuxt, Vue, Better Auth, Drizzle, Tailwind, DaisyUI, MapLibre](https://www.youtube.com/watch?v=DK93dqmJJYg) - I learned so much from watching and following along with this video. I adopted/adapted much the same approach and tech stack. Thanks, CJ!
- [Nuxt Auth Utils: Secure, Simple, and Flexible Logins](https://vueschool.io/courses/nuxt-auth-utils-secure-simple-and-flexible-logins) - I learned a ton from this video course too, and an [associated blog post](https://vueschool.io/articles/vuejs-tutorials/email-password-logins-with-nuxt-auth-utils-and-nuxt-ui/). Among other things, helped me to realize that I preferred using Nuxt UI rather than DaisyUI. Thank you, Daniel!

#### Testing the App

### Continued development

Known issues - specific areas that the solution should be improved:

- [ ] When viewing the page on a mobile device, the page zooms in automatically when going into an input field. That behavior is fine, but the issue is more when the form is submitted and the user is navigated to the next page, it seems to maintain that zoom instead of resetting fully to the original zoom of the page. How to fix? Hmm 🤔
  - [Google search: "nuxt mobile zoom out to full page on navigation to new page"](https://www.google.com/search?q=nuxt+mobile+zoom+out+to+full+page+on+navigation+to+new+page)
  - [Disable Auto Zoom in Input "Text" tag - Safari on iPhone](https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone)
- [ ] Issue of warning message that occurs on Chrome when opening up the toggled navigation menu from the header: "Blocked aria-hidden on an element because its descendant retained focus". The issue doesn't seem to arise on Firefox so far.

Feature requests - specific enhancements to make:

- [ ] Method for updating login info, including login email and password
- [ ] Method for retrieving/changing a forgotten password
- [ ] Implement [next level security features to prevent brute force attacks](https://vueschool.io/lessons/next-level-security-features-attempt-locks-to-prevent-brute-force-attacks)
- [ ] Implement [protection of sensitive data in API routes with requireUserSession](https://vueschool.io/lessons/protect-sensitive-data-in-api-routes-with-requireusersession)

More general ideas to consider:

Hmm 🤔 ...

### Useful resources

Hmm 🤔 ...

## Author

- Website - [Eli Silk](https://github.com/elisilk)
- Frontend Mentor - [@elisilk](https://www.frontendmentor.io/profile/elisilk)
