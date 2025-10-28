<template>
  <main>
    <div class="container editor">
      <div class="content">
        <header>
          <h1 class="title">
            <slot name="title" />
          </h1>
          <p class="description">
            <slot name="description" />
          </p>
        </header>

        <div>
          <slot />
        </div>
      </div>

      <footer>
        <slot name="footer">
          <button class="btn" disabled>
            Save
          </button>
        </slot>
      </footer>
    </div>

    <div class="container preview">
      <slot name="preview">
        <AppEditorPreview />
      </slot>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: var(--space-200);
  block-size: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: var(--space-300);
}

.container {
  background-color: hsl(var(--color-white));
  border-radius: var(--br-500);
}

.editor {
  display: grid;
  grid-template-rows: 1fr auto;
}

.preview {
  padding: var(--space-300);
  display: grid;
  place-content: center;
}

.title {
  font-size: var(--fs-600);
}

.description {
  margin-block-start: var(--space-100);
}

.content {
  margin: var(--space-300);
}

header {
  margin-block-end: var(--space-500);
}

footer {
  padding: var(--space-200);
  text-align: right;
  border-top: 1px solid hsl(var(--color-grey-200));
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  main {
    padding: 0 var(--space-300) var(--space-300);
  }

  .content {
    margin: var(--space-500);
  }

  .title {
    font-size: var(--fs-800);
  }

  footer {
    padding: var(--space-300) var(--space-500);
  }

  footer button {
    inline-size: unset;
  }
}

/* viewport: tablet -> desktop */
@media (min-width: 60rem) {
  main {
    flex-direction: row-reverse;
  }

  .editor {
    flex-basis: 808px;
  }

  .preview {
    flex-basis: 560px;
  }
}
</style>
