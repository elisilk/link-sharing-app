<template>
  <div class="container">
    <div class="links">
      <AppPreviewLink name="GitHub" />
      <AppPreviewLink name="YouTube" />
      <AppPreviewLink name="Frontend Mentor" />
    </div>

    <img
      src="/illustration-phone-mockup.svg"
      alt="Illustration phone mockup"
      width="308"
      height="632"
    >
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.links {
  position: absolute;
  width: var(--link-inline-size);
  top: var(--link-block-position);
  left: 50%;
  transform: translateX(-50%);
}

.links > * + * {
  margin-block-start: var(--space-250);
}
</style>
