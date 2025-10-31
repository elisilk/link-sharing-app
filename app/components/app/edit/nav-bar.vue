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
        <AppEditTab to="/links">
          <template #icon>
            <Icon name="my-icon:icon-links-header" />
          </template>
          Links
        </AppEditTab>
      </li>

      <li>
        <AppEditTab to="/profile">
          <template #icon>
            <Icon name="my-icon:icon-profile-details-header" />
          </template>
          Profile Details
        </AppEditTab>
      </li>

      <li class="preview">
        <AppEditTab to="/preview" secondary>
          <template #icon>
            <Icon name="my-icon:icon-preview-header" />
          </template>
          Preview
        </AppEditTab>
      </li>
    </menu>
  </header>
</template>

<style scoped>
header {
  block-size: calc(var(--edit-nav-bar-block-size-inner) + 2 * var(--space-200));

  padding: var(--space-200) var(--space-200) var(--space-200) var(--space-300);
  background-color: var(--color-background-edit-nav-bar);
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
  inline-size: var(--edit-nav-bar-inline-size-items);
}

li:first-child {
  margin-inline-end: auto;
  align-self: center;
}

li:last-child {
  margin-inline-start: auto;
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
}
</style>
