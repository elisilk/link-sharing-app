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
        <NuxtLink to="/links">
          <Icon class="icon" name="my-icon:icon-links-header" />
          <span class="text">Links</span>
        </NuxtLink>
      </li>

      <li>
        <NuxtLink to="/profile">
          <Icon class="icon" name="my-icon:icon-profile-details-header" />
          <span class="text">Profile Details</span>
        </NuxtLink>
      </li>

      <li class="preview">
        <NuxtLink to="/preview">
          <Icon class="icon" name="my-icon:icon-preview-header" />
          <span class="text">Preview</span>
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

li {
  list-style-type: none;
  inline-size: var(--inline-size-items);
}

li:first-child {
  margin-inline-end: auto;
  align-self: center;
}

li:last-child {
  margin-inline-start: auto;
}

a {
  block-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-100);
  border-radius: var(--br-400);
  color: hsl(var(--color-grey-500));
  font-weight: var(--fw-semibold);
}

a.router-link-active {
  background-color: hsl(var(--color-grey-100));
  color: hsl(var(--color-purple-600));
}

.preview > a {
  color: hsl(var(--color-purple-600));
  background-color: transparent;
  border: 1px solid hsl(var(--color-purple-600));
}

a:hover,
a:focus-visible {
  color: hsl(var(--color-purple-600));
  border: 0;
}

a:focus-visible {
  outline-offset: 2px;
  outline: 2px dashed hsl(var(--color-purple-600));
}

.preview > a:hover,
.preview > a:focus-visible {
  background-color: hsl(var(--color-grey-100));
  border: 1px solid hsl(var(--color-purple-600));
}

.text {
  display: none;
}

.icon {
  block-size: 20px;
  inline-size: 20px;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  header {
    margin: var(--space-300);
    border-radius: var(--br-500);
  }

  li {
    inline-size: unset;
  }

  a {
    padding-inline: var(--space-300);
  }

  .preview > a {
    padding-inline: 0;
    inline-size: 108px;
  }

  .text {
    display: block;
  }

  .preview .icon {
    display: none;
  }
}
</style>
