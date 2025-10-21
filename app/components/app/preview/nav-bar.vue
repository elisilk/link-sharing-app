<template>
  <header>
    <menu>
      <li>
        <NuxtLink to="/links">
          Back to Editor
        </NuxtLink>
      </li>
      <li>
        <button>
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
  margin: 0;
  padding: 0;
}

menu > li {
  list-style-type: none;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  header {
    padding: var(--space-300);
    background-color: hsl(var(--color-purple-600));
    border-end-start-radius: var(--br-800);
    border-end-end-radius: var(--br-800);
  }

  menu {
    background-color: hsl(var(--color-white));
    padding: var(--space-200) var(--space-300);
    border-radius: var(--br-500);
  }
}
</style>
