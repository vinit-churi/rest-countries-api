# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I researched](#what-i-researched)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [github](https://github.com/vinit-churi/rest-countries-api)
- Live Site URL: [github pages](https://vinit-churi.github.io/rest-countries-api/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I researched

**Things I needed to research for this project :**

- learn how to do single page application in vanilla JavaScript
- learn more about CSS grid and build it with CSS grid
- learn how to make dark and light mode in vanilla JavaScript.
- learn about CSS clamp function, and the min-max for better responsiveness
- learn more about fetch
- learn about pagination on frontend side
- event delegation

```html
<h1>Some code I'm proud of</h1>
```

> making the grid responsive without the media query

```css
.proud-of-this-css {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

> implementing Light and dark mode by changing the css root variable value

&

> implementing load more functionality, by storing the fetched data and click count in global variables

```js
const root = document.documentElement;
const switchTheme = (isDarkSelected) => {
  if (isDarkSelected) {
    root.style.setProperty("--background-color", "hsl(0, 0%, 98%)");
    root.style.setProperty("--element-color", "hsl(0, 0%, 100%)");
    root.style.setProperty("--font-color", "hsl(200, 15%, 8%)");
  }
};
//for load more functionality check out the code in main.js
```

---

### Continued development:

> I didn’t really need to make it a single page application. I can just load in a offscreen div and input the fetched data in it

> styling the select element is difficult and defaults to browser specific styling after googling found out that it can be done using radio button, we only want to select one of the item so I’m doing it using radio button.

---

### Useful resources

- [youtube video](https://www.youtube.com/watch?v=ceveRz3e7F0&list=WL&index=11) - custom styling the select component.
- [blog article](https://itnext.io/build-a-single-page-web-app-javascript-and-the-dom-90c99b08f8a9) - This helped me to learn how to build SPA in vanilla JS
- [W3 schools](https://www.w3schools.com/css/css3_variables_javascript.asp) - change css variables using javascript.
