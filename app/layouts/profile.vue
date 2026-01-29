<script setup lang="ts">
const toast = useToast();

const { loggedIn, user } = useUserSession();
const url = useRequestURL();
const route = useRoute();

const profileUserId = computed(() => {
  // if a route param, then use that
  if (route.params.id) {
    return route.params.id;
  }
  // if no route param, but a user is logged in, then use that
  if (loggedIn.value && user.value) {
    return user.value.id;
  }
  // else something is wrong
  return null;
});

const shareLink = computed(() => profileUserId.value ? `${url.protocol}://${url.host}/profile/${profileUserId.value}` : null);

async function handleShareLink() {
  if (!shareLink.value)
    return;

  try {
    await navigator.clipboard.writeText(shareLink.value);
    toast.add({
      title: "The link has been copied to your clipboard!",
      description: shareLink.value,
      icon: "i-custom-icon-link-copied-to-clipboard",
      color: "success",
    });
  }
  catch (error) {
    if (error instanceof Error) {
      toast.add({
        title: "Something went wrong!",
        description: error.message,
        icon: "i-lucide-angry",
        color: "error",
      });
    }
    else {
      console.error("An unknown error occurred:", error);
      toast.add({
        title: "Something went wrong!",
        description: "The share link failed to copy.",
        icon: "i-custom-icon-link-copied-to-clipboard",
        color: "error",
      });
    }
  }
}
</script>

<template>
  <UContainer class="min-h-dvh px-0 sm:px-0 lg:px-0 preview-layout-container">
    <UHeader
      :ui="{
        toggle: 'hidden',
        root: 'border-0 h-auto sm:p-6 sm:bg-primary sm:rounded-b-4xl',
        container: 'px-6 py-4 lg:px-6 sm:h-auto sm:bg-white sm:rounded-xl',
      }"
    >
      <template #left>
        <UButton
          v-if="loggedIn"
          label="Back to Editor"
          variant="outline"
          @click="$router.back()"
        />
        <UButton
          v-else
          to="/"
          label="Back to Home"
          variant="outline"
        />
      </template>
      <template #right>
        <UButton
          label="Share Link"
          class="cursor-pointer"
          :disabled="!profileUserId"
          @click="handleShareLink"
        />
      </template>
    </UHeader>

    <UMain class="min-h-0">
      <slot />
    </UMain>
  </UContainer>
</template>

<style scoped>
.preview-layout-container {
  --profile-inline-size-max: 90rem; /* 1440px */
  --profile-block-size-header-row: 14rem; /* 224px */
  --profile-block-size-header-overlap: 8.3125rem; /* 133px */

  display: grid;
  grid-template-rows: auto 1fr;
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .preview-layout-container {
    grid-template-rows:
      var(--profile-block-size-header-row)
      var(--profile-block-size-header-overlap)
      1fr;
  }

  .preview-layout-container > :first-child {
    grid-column: 1 / -1;
    grid-row: 1 / 3;
    z-index: 1;
    position: relative;
  }

  .preview-layout-container > :last-child {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    z-index: 2;
  }
}
</style>
