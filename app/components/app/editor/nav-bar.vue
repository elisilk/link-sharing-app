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
        <AppEditorTab to="/links">
          <template #icon>
            <Icon name="my-icon:icon-links-header" />
          </template>
          Links
        </AppEditorTab>
      </li>

      <li>
        <AppEditorTab to="/profile">
          <template #icon>
            <Icon name="my-icon:icon-profile-details-header" />
          </template>
          Profile Details
        </AppEditorTab>
      </li>

      <li class="preview">
        <AppEditorTab to="/preview" secondary>
          <template #icon>
            <Icon name="my-icon:icon-preview-header" />
          </template>
          Preview
        </AppEditorTab>
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
