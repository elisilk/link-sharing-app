<template>
  <UContainer class="min-h-dvh max-w-119 p-8 sm:px-0 lg:px-0 grid content-start sm:content-center gap-16 sm:gap-12">
    <header class="sm:mx-auto">
      <NuxtLink to="/">
        <img
          src="/logo-devlinks-large.svg"
          alt="Devlinks logo"
          width="183"
          height="40"
        >
      </NuxtLink>
    </header>

    <slot />
  </UContainer>
</template>
