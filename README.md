# Frontend Mentor - Link-sharing app solution

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

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Accessibility
- [Nuxt](https://nuxt.com/)
- [Vite](https://vite.dev/)
- [Vue](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vitest](https://vitest.dev/guide/)
- [Vue Test Utils](https://test-utils.vuejs.org/guide/)

Additional tools:

- [pnpm](https://pnpm.io/) - package manager
- [ESLint](https://eslint.org/) - linter
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [Husky](https://typicode.github.io/husky/) - pre-commit hooks
- [lint-staged](https://github.com/lint-staged/lint-staged)
- [@nuxt/eslint](https://nuxt.com/modules/eslint) - eslint Nuxt module
- [@nuxt/icon](https://nuxt.com/modules/icon) - icon Nuxt moduel

### What I learned

As always, so many cool :sunglasses: things. Here are some of the key resources I used.

#### Testing the App

#### Building the App

- File Input Styling
  - [Custom File Input Styling](https://css-tricks.com/snippets/css/custom-file-input-styling-webkitblink/)
  - [Custom styled input type file upload button with pure CSS](https://nikitahl.com/custom-styled-input-type-file)
- LastPass extension layout and hydration issues
  - [`<ClientOnly>`](https://nuxt.com/docs/4.x/api/components/client-only)
- [Interact with the clipboard](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard)
  - [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard)
- Custom dropdown menu
  - [`<select>`: The HTML Select element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select)
  - [Creating a custom `<select>` dropdown with CSS](https://blog.logrocket.com/creating-custom-select-dropdown-css/)
  - [Select-Only Combobox Example](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
    - [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
  - [Customizable select elements (not yet widely available)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)

### Continued development

Specific areas that the solution should be improved (known issues):

Specific enhancements I'd like to make (feature requests):

More general ideas I want to consider:

Hmm 🤔 ...

- Learn and use [TypeScript](https://www.typescriptlang.org/)
- Implement a full-stack app

### Useful resources

- [Vue Guide](https://vuejs.org/guide/)
- [Pinia Guide](https://pinia.vuejs.org/core-concepts/)
- [Vite Guide](https://vite.dev/guide/)
- [MDN Web Docs for CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Went here a lot to reference the different CSS properties and the shorthands, and all the great explanations about best practices.

## Author

- Website - [Eli Silk](https://github.com/elisilk)
- Frontend Mentor - [@elisilk](https://www.frontendmentor.io/profile/elisilk)
