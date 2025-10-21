<template>
  <header>
    <menu>
      <li>
        <picture>
          <source media="(min-width: 45rem)" srcset="/logo-devlinks-large.svg">
          <img src="/logo-devlinks-small.svg" alt="Devlinks logo">
        </picture>
      </li>

      <li>
        <NuxtLink to="/links" class="nav-bar-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            fill="none"
            viewBox="0 0 21 20"
          ><path fill="currentColor" d="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z" /></svg>
          <span>Links</span>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/profile" class="nav-bar-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="20"
            fill="none"
            viewBox="0 0 21 20"
          ><path fill="currentColor" d="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z" /></svg>
          <span>Profile Details</span>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/preview" class="nav-bar-item nav-bar-item--preview">
          <img
            src="/icon-preview-header.svg"
            alt=""
            width="20"
            height="20"
          >
          <span>Preview</span>
        </NuxtLink>
      </li>
    </menu>
  </header>
</template>

<style scoped>
header {
  --inline-size-items: 52px;
  --block-size-inner: 52px;
  --block-size-padding: 16px;
  block-size: calc(var(--block-size-inner) + 2 * var(--block-size-padding));

  padding: var(--space-200) var(--space-200) var(--space-200) var(--space-300);
  background-color: hsl(var(--color-white));
}

menu {
  block-size: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}

menu > li {
  inline-size: var(--inline-size-items);
  list-style-type: none;
}

menu > li:first-child {
  margin-inline-end: auto;
  align-self: center;
}

menu > li:last-child {
  margin-inline-start: auto;
}

.nav-bar-item {
  block-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-100);
  border-radius: var(--br-400);
  color: hsl(var(--color-grey-500));
  font-weight: var(--fw-semibold);
}

.nav-bar-item.router-link-active {
  background-color: hsl(var(--color-grey-100));
  color: hsl(var(--color-purple-600));
}

.nav-bar-item--preview {
  color: hsl(var(--color-purple-600));
  background-color: transparent;
  border: 1px solid hsl(var(--color-purple-600));
}

.nav-bar-item:hover,
.nav-bar-item:focus-visible {
  color: hsl(var(--color-purple-600));
  border: 0;
}

.nav-bar-item:focus-visible {
  outline-offset: 2px;
  outline: 2px dashed hsl(var(--color-purple-600));
}

.nav-bar-item--preview:hover,
.nav-bar-item--preview:focus-visible {
  background-color: hsl(var(--color-grey-100));
  border: 1px solid hsl(var(--color-purple-600));
}

.nav-bar-item span {
  display: none;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  header {
    margin: var(--space-300);
    border-radius: var(--br-500);
  }

  menu > li {
    inline-size: unset;
  }

  .nav-bar-item {
    padding-inline: var(--space-300);
  }

  .nav-bar-item--preview {
    padding-inline: 0;
    inline-size: 108px;
  }

  .nav-bar-item span {
    display: block;
  }

  .nav-bar-item--preview img {
    display: none;
  }
}
</style>
