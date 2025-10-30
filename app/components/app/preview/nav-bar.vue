<script setup lang="ts">
const emit = defineEmits(["shareLink"]);

async function navigateBackToEditor() {
  await navigateTo("/links");
}
</script>

<template>
  <header>
    <menu>
      <li>
        <button class="btn btn-secondary" @click="navigateBackToEditor">
          Back to Editor
        </button>
      </li>
      <li>
        <button class="btn" @click="emit('shareLink')">
          Share Link
        </button>
      </li>
    </menu>
  </header>
</template>

<style scoped>
header {
  padding: var(--space-200) var(--space-300);
}

menu {
  display: flex;
  justify-content: space-between;
  gap: var(--space-200);
  margin: 0;
  padding: 0;
}

menu > li {
  list-style-type: none;
  flex-basis: 100%;
}

menu > li > .btn {
  padding-inline: 0;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  header {
    padding: var(--space-300);
    background-color: var(--color-background-preview-nav-bar-header);
    border-end-start-radius: var(--br-800);
    border-end-end-radius: var(--br-800);
  }

  menu {
    background-color: var(--color-background-preview-nav-bar-menu);
    padding: var(--space-200) var(--space-300);
    border-radius: var(--br-500);
  }

  menu > li {
    flex-basis: unset;
  }

  menu > li > .btn {
    padding-inline: var(--space-300);
  }
}
</style>
