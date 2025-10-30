<script setup lang="ts">
type Props = {
  layout?: string;
};

const { layout = "preview" } = defineProps<Props>();

const isEditor = computed(() => layout === "editor");

const profile = useProfileStore();
const fullName = computed(() => (profile.firstName === null ? "" : profile.firstName) + (profile.firstName === "" || profile.lastName === "" ? "" : " ") + (profile.lastName === null ? "" : profile.lastName));
</script>

<template>
  <div
    class="preview-profile-container"
    :class="{ editor: isEditor }"
  >
    <div class="image circle" />

    <div class="info">
      <div v-if="!!fullName" class="name">
        {{ fullName }}
      </div>
      <div v-else id="placeholder-name" />

      <div v-if="!!profile.email" class="email">
        {{ profile.email }}
      </div>
      <div v-else id="placeholder-email" />
    </div>

    <div class="links">
      <AppPreviewLink
        v-for="link in profile.links"
        :key="link.platform"
        :platform="link.platform"
        :url="link.url"
      />
    </div>
  </div>
</template>

<style scoped>
.preview-profile-container {
  inline-size: var(--preview-inline-size-container);
  min-block-size: var(--preview-block-size-container-min);

  display: grid;
  grid-template-rows: repeat(3, min-content);
}

.preview-profile-container.editor {
  min-block-size: var(--preview-editor-block-size-container-min);
}

.circle {
  margin-block-end: var(--space-300);
  margin-inline: auto;
  inline-size: var(--preview-profile-image-size);
  block-size: var(--preview-profile-image-size);
  border: var(--preview-profile-image-border) solid var(--color-preview-image-border);
  border-radius: 50%;
  background-color: var(--color-preview-empty);
}

.preview-profile-container.editor .circle {
  inline-size: var(--preview-editor-profile-image-size);
  block-size: var(--preview-editor-profile-image-size);
}

.info {
  display: grid;
  justify-items: center;
  gap: var(--space-100);
}

.name {
  color: var(--color-preview-name);
  font-size: var(--fs-800);
  font-weight: var(--fw-bold);
}

.email {
  color: var(--color-preview-email);
}

.links {
  margin-block-start: var(--space-700);
  display: grid;
  gap: var(--space-300);
}

/* placeholder shapes */

#placeholder-photo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: var(--color-preview-empty);
}

#placeholder-name {
  width: 160px;
  height: 16px;
  border-radius: 104px;
  background-color: var(--color-preview-empty);
}

#placeholder-email {
  width: 72px;
  height: 8px;
  border-radius: 104px;
  background-color: var(--color-preview-empty);
}

#placeholder-link {
  width: 237px;
  height: 44px;
  border-radius: 8px;
  background-color: var(--color-preview-empty);
}
</style>
