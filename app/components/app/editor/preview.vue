<template>
  <div class="container">
    <img
      src="/illustration-phone-mockup-outline.svg"
      alt="Illustration phone mockup"
      width="308"
      height="632"
    >

    <AppPreviewProfile layout="editor" />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  justify-items: center;
}

.container > * {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}
</style>
