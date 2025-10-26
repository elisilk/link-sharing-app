<template>
  <div class="container">
    <div class="links">
      <AppPreviewLink name="GitHub" />
      <AppPreviewLink name="YouTube" />
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
  top: 279px;
  left: 50%;
  transform: translateX(-50%);
  width: 237px;
}

.links > * + * {
  margin-block-start: var(--space-250);
}
</style>
