<script setup lang="ts">
const profile = useProfileStore();
</script>

<template>
  <div class="container">
    <div class="profile">
      <span class="name">
        {{ profile.firstName }}
        {{ profile.lastName }}
      </span>
      <span class="email">{{ profile.email }}</span>
    </div>

    <div class="links">
      <AppPreviewLink
        v-for="link in profile.links"
        :key="link.platform"
        :platform="link.platform"
        :url="link.url"
      />
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

.profile {
  position: absolute;
  top: var(--preview-profile-position);
  left: 50%;
  transform: translateX(-50%);

  display: grid;
  gap: var(--space-100);
  justify-items: center;
}

.name {
  color: var(--color-preview-name);
  font-size: var(--fs-500);
  font-weight: var(--fw-semibold);
}

.email {
  color: var(--color-preview-email);
  font-size: var(--fs-300);
}

.links {
  position: absolute;
  width: var(--link-inline-size);
  top: var(--preview-links-position);
  left: 50%;
  transform: translateX(-50%);
}

.links > * + * {
  margin-block-start: var(--space-250);
}
</style>
