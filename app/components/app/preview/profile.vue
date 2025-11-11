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
      <img
        v-if="!!profile.details.pictureUrl"
        :src="profile.details.pictureUrl"
        class="picture"
      >
      <div v-else id="placeholder-picture" />

      <div v-if="!!profile.fullName" class="name">
        {{ profile.fullName }}
      </div>
      <div v-else id="placeholder-name" />

      <div v-if="!!profile.details.email" class="email">
        {{ profile.details.email }}
      </div>
      <div v-else id="placeholder-email" />
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
          class="placeholder-link"
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
  min-block-size: var(--preview-editor-block-size-container-min);
}

.details {
  display: grid;
  gap: var(--space-100);
  justify-items: center;
  text-align: center;
}

.picture {
  inline-size: var(--preview-profile-picture-size);
  block-size: var(--preview-profile-picture-size);
  border: var(--preview-profile-picture-border) solid var(--color-preview-image-border);
  border-radius: 50%;
  object-fit: cover;
  /* margin-block-end: var(--space-300); */
}

.preview-profile-container.editor .picture {
  inline-size: var(--preview-editor-profile-picture-size);
  block-size: var(--preview-editor-profile-picture-size);
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

#placeholder-picture {
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

.placeholder-link {
  width: 237px;
  height: 44px;
  border-radius: 8px;
  background-color: var(--color-preview-empty);
}
</style>
