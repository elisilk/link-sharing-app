<template>
  <div>
    <UMain class="sm:bg-grey-50">
      <UContainer class="min-h-dvh max-w-119 mx-auto p-8 sm:px-0 lg:px-0 grid content-start sm:content-center gap-16 sm:gap-12">
        <header class="sm:mx-auto">
          <img
            src="/logo-devlinks-large.svg"
            alt="Devlinks logo"
            width="183"
            height="40"
          >
        </header>

        <slot />
      </UContainer>
    </UMain>
  </div>
</template>
