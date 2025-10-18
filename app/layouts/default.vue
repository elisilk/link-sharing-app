<template>
  <div class="container">
    <header>
      <img
        src="/logo-devlinks-large.svg"
        alt="Devlinks logo"
        width="183"
        height="40"
      >
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.container {
  min-block-size: 100vb;
  max-inline-size: var(--default-inline-size-max);
  margin-inline: auto;
  padding: var(--space-400);
  background-color: var(--color-background-form);
  display: flex;
  flex-direction: column;
  gap: var(--space-800);
}

main {
  flex-grow: 1;
  background-color: var(--color-background-form);
}

/* viewport: mobile -> tablet */
@media (min-width: 29rem) {
  .container {
    background-color: unset;
    justify-content: center;
    gap: var(--space-600);
    padding-inline: 0;
  }

  header {
    margin-inline: auto;
  }

  main {
    flex-grow: 0;
    padding: var(--space-500);
    border-radius: var(--br-500);
  }
}
</style>
