#  goit-react-hw-03-image-finder 

This is homework for the React HTTP requests.

## Live page

The live page for this repository can be viewed at [GitHub Pages](https://oleksandr-romashko.github.io/goit-react-hw-03-image-finder/).

## Local build and run

  1. Make sure you have an LTS version of Node.js installed on your computer. [Download and install](https://nodejs.org/en/) if needed.
  1. Install the project's base dependencies with the `npm install` command.
  1. Start development mode by running the `npm start` command.
  2. Go to [localhost:3000](http://localhost:3000/) (may vary) in your browser. This page will automatically reload after saving changes to the project files.

## Task Acceptance Criteria

[React project template](https://github.com/goitacademy/react-homework-template/blob/main/README.en.md) is used as a starting point for the application (more information about how to start-up with such a project may be found at the template repo description or [here in a Readme file](./assets/README.project-template.en.md)).

  * The `goit-react-hw-03-image-finder` repository is created.
  * When submitting homework, there are two links: to the source files and the live pages of each assignment on `GitHub Pages'.
  * The component state stores the minimum required set of data, the rest is calculated.
  * There are no errors or warnings in the console when running application code.
  * Each component has a separate folder with the React-component file and styles file.
  * The `propTypes` are described for all components.
  * Everything that a component expects in the form of props is passed to it when it is called.
  * Component names are clear and descriptive.
  * The JS code is clean and clear, `Prettier` is used.
  * Styling is done by `CSS modules` or `Styled Components`.

## Task - Image Search

Write a keyword image search application. Preview of a working application see [link](./assets/task/image-finder-example.mp4) or [link](https://drive.google.com/file/d/1oXCGyiq4uKwW0zzraZLKk4lh3voBlBzZ/view?usp=sharing).

Create components `<Searchbar>`, `<ImageGallery>`, `<ImageGalleryItem>`, `<Loader>`, `<Button>` и `<Modal>`. Ready styles of components can be taken in file [styles.css](./assets/task/styles.css) and tweak them if needed.

<p align="center">
  <img max-width="960" src="./assets/task/image-finder-component-preview.jpg" alt="component preview">
</p>

### Pixabay API instructions

For HTTP requests, use a public image search service [Pixabay](https://pixabay.com/api/docs/). Register and get a private access key.

The URL string of the HTTP request.

```
https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
```

Pixabay API supports pagination, by default the `page` parameter is set to `1`. Let the response comes with 12 objects each, set to `per_page`. Don't Remember that when you search for a new keyword, you have to reset the value of page to `1`.

The response from the api comes an array of objects in which you are only interested in the following properties:

  * `id` - a unique identifier
  * `webformatURL` - link to the small image for the list of cards
  * `largeImageURL` - link to the large image for the modal window

### Description of the component `<Searchbar>`

The component takes one prop `onSubmit` - a function to pass the value of the input when the form is submitted. Creates a DOM element of the following structure:

```html
<header class="searchbar">
  <form class="form">
    <button type="submit" class="button">
      <span class="button-label">Search</span>
    </button>

    <input
      class="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
    />
  </form>
</header>
```

### Description of the `<ImageGallery>` component

A list of image cards. Creates a DOM element of the following structure:

```html
<ul class="gallery">
  <! -- Set <li>
  with images -->
</ul>
```

### Description of the component `<ImageGalleryItem>`

A list item component with an image. Creates a DOM element of the following structure:

```html
<li class="gallery-item">
  <img src="" alt="" />
</li>
```

### Description of the `<Button>` component

Pressing the `Load more` button should load the next batch of Images and rendered with the previous ones. The button should be rendered only when there are some loaded images. If the image array is empty, the button is not rendered.

### Description of the `<Loader>` component

Spinner component, displays while images are being loaded. Use any ready made component, e.g. [react-loader-spinner](https://github.com/mhnpd/react-loader-spinner).

### Description of the component `<Modal>`

When you click on a gallery item a modal window with a dark overlay and display a larger version of the image. The modal window should be closed.

The appearance is similar to the functionality of this [VanillaJS-plugin](https://basiclightbox.electerious.com/), only instead of white modal window the image is rendered (in the example press `Run`). Animation is not required.

```html
<div class="overlay">
  <div class="modal">
    <img src="" alt="" />
  </div>
</div>
```
