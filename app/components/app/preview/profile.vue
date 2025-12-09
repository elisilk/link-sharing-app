<script setup lang="ts">
const props = withDefaults(defineProps<{
  layout?: string;
}>(), { layout: "preview" });

const isEditor = computed(() => props.layout === "editor");

const profile = useProfileStore();
</script>

<template>
  <div
    class="preview-profile-container"
    :class="{ editor: isEditor }"
  >
    <div class="details">
      <div class="picture">
        <img
          v-if="!!profile.details.pictureUrl"
          :src="profile.details.pictureUrl"
        >
        <span v-else class="placeholder" />
      </div>

      <div class="name">
        <span v-if="!!profile.fullName">
          {{ profile.fullName }}
        </span>
        <span v-else class="placeholder" />
      </div>

      <div class="email">
        <span v-if="!!profile.details.email">
          {{ profile.details.email }}
        </span>
        <span v-else class="placeholder" />
      </div>
    </div>

    <div class="links">
      <TransitionGroup>
        <AppPreviewLink
          v-for="link in profile.links"
          :key="link.platform"
          :platform="link.platform"
          :url="link.url"
        />
      </TransitionGroup>
      <TransitionGroup
        v-if="profile.numLinks < 5"
      >
        <div
          v-for="n in 5 - profile.numLinks"
          :key="`placeholder-${n}`"
          class="placeholder"
        />
      </TransitionGroup>
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
  margin-block-start: 63.5px;
  min-block-size: var(--preview-editor-block-size-container-min);
}

.details {
  display: grid;
  justify-items: center;
  text-align: center;
}

.picture {
  margin-block-end: var(--space-300);
}

.picture > img {
  inline-size: var(--preview-profile-picture-size);
  block-size: var(--preview-profile-picture-size);
  border: var(--preview-profile-picture-border) solid var(--color-preview-image-border);
  border-radius: 50%;
  object-fit: cover;
}

.preview-profile-container.editor .picture > img {
  inline-size: var(--preview-editor-profile-picture-size);
  block-size: var(--preview-editor-profile-picture-size);
}

.name {
  color: var(--color-preview-name);
  font-size: var(--fs-800);
  font-weight: var(--fw-bold);
}

.email {
  margin-block-start: var(--space-100);
  color: var(--color-preview-email);
}

.email:has(.placeholder) {
  margin-block-start: var(--space-150);
}

.links {
  margin-block-start: var(--space-700);
  display: grid;
  gap: var(--space-300);
}

.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-leave-active {
  position: absolute;
}

/* placeholder shapes */

.placeholder {
  display: block;
  background-color: var(--color-preview-empty);
}

.picture > .placeholder {
  width: 96px;
  height: 96px;
  border-radius: 50%;
}

.name > .placeholder {
  width: 160px;
  height: 16px;
  border-radius: 104px;
}

.email > .placeholder {
  width: 72px;
  height: 8px;
  border-radius: 104px;
}

.links > .placeholder {
  width: 237px;
  height: 44px;
  border-radius: 8px;
}
</style>
