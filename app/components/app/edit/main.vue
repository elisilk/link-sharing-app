<script setup lang="ts">
const { addToast } = useToastNotifications();

function save() {
  addToast("Your changes have been successfully saved!", "my-icon:icon-changes-saved", false);
}
</script>

<template>
  <main>
    <div class="container edit">
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
          <button class="btn" @click="save">
            Save
          </button>
        </slot>
      </footer>
    </div>

    <div class="container preview">
      <slot name="preview">
        <AppEditPreview />
      </slot>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: var(--space-200);
  block-size: 100%;
  overflow-y: scroll;
}

.container {
  background-color: var(--color-background-edit-main);
  border-radius: var(--br-500);
}

.edit {
  block-size: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  position: relative;
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
  padding: var(--space-300) var(--space-300) calc(var(--space-300) + var(--edit-block-size-footer-row));
  overflow-y: scroll;
}

header {
  margin-block-end: var(--space-500);
}

footer {
  block-size: var(--edit-block-size-footer-row);
  padding: var(--space-200);
  text-align: right;
  background-color: var(--color-background-edit-main);
  border-top: var(--border-width) solid var(--color-divider);
  position: absolute;
  bottom: 0;
  inline-size: 100%;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  main {
    padding: 0 var(--space-300) var(--space-300);
  }

  .content {
    padding: var(--space-500) var(--space-500) calc(var(--space-500) + var(--edit-block-size-footer-row));
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
    display: flex;
    flex-direction: row-reverse;
    gap: var(--space-300);
  }

  .edit {
    flex-basis: var(--edit-inline-size-edit-column);
  }

  .preview {
    flex-basis: var(--edit-inline-size-preview-column);
  }
}
</style>
