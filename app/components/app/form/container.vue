<template>
  <div class="form__container">
    <header class="form__header">
      <h1>
        <slot name="title" />
      </h1>
      <p>
        <slot name="description" />
      </p>
    </header>

    <div class="form__fields">
      <slot />
    </div>

    <div class="form__controls">
      <slot name="controls" />
    </div>

    <footer class="form__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.form__container {
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
}

header > * + * {
  margin-block-start: var(--space-100);
}

h1 {
  font-size: var(--fs-600);
  font-weight: var(--fw-bold);
}

.form__fields > * + * {
  margin-block-start: var(--space-300);
}

footer {
  text-align: center;
}

@media (min-width: 29rem) {
  h1 {
    font-size: var(--fs-800);
  }
}
</style>
