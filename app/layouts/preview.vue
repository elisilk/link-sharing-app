<script setup lang="ts">
const toast = useToast();

const { user } = useUserSession();
const url = useRequestURL();

const shareLink = computed(() => `${url.protocol}://${url.host}/profile/${user.value?.id}`);

async function handleShareLink() {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    toast.add({
      title: "The link has been copied to your clipboard!",
      description: shareLink.value,
      icon: "i-custom-icon-link-copied-to-clipboard",
      color: "success",
      // close: false,
      // progress: false,
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
  <div class="preview-layout-container">
    <UHeader
      :ui="{
        toggle: 'hidden',
        root: 'border-0 static z-0 h-auto sm:p-6 sm:bg-primary sm:rounded-b-4xl',
        container: 'px-6 py-4 lg:px-6 sm:h-auto sm:bg-white sm:rounded-xl',
      }"
    >
      <template #left>
        <UButton
          to="/editor"
          label="Back to Editor"
          variant="outline"
        />
      </template>
      <template #right>
        <UButton
          label="Share Link"
          class="cursor-pointer"
          @click="handleShareLink"
        />
      </template>
    </UHeader>

    <UMain class="min-h-0 sm:z-1">
      <slot />
    </UMain>
  </div>
</template>

<style scoped>
.preview-layout-container {
  --preview-inline-size-max: 90rem; /* 1440px */
  --preview-block-size-header-row: 14rem; /* 224px */
  --preview-block-size-header-overlap: 8.3125rem; /* 133px */

  display: grid;
  grid-template-rows: auto 1fr;
}

/* viewport: mobile -> tablet */
@media (min-width: 40rem) {
  .preview-layout-container {
    grid-template-rows:
      var(--preview-block-size-header-row)
      var(--preview-block-size-header-overlap)
      1fr;
  }

  .preview-layout-container > :first-child {
    grid-column: 1 / -1;
    grid-row: 1 / 3;
  }

  .preview-layout-container > :last-child {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
  }
}
</style>
