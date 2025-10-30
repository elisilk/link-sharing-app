<script setup lang="ts">
const props = defineProps<{
  platform: string;
  url: string;
}>();

const platform = computed(() => platforms.find(item => item.name === props.platform));
</script>

<template>
  <NuxtLink
    :to="props.url"
    :style="{ backgroundColor:
                platform && platform.backgroundColor,
              color:
                platform && platform.color,
              border:
                platform && platform.border }"
    target="_blank"
  >
    <Icon :name="`my-icon:${platform && platform.icon}`" />
    <span>{{ platform && platform.name }}</span>
    <Icon name="my-icon:icon-arrow-right" />
  </NuxtLink>
</template>

<style scoped>
a {
  block-size: var(--link-block-size);
  display: flex;
  align-items: center;
  gap: var(--space-100);
  border-radius: var(--br-400);
  padding: var(--space-200);
  background-color: black;
  color: white;
}

a > :last-child {
  margin-inline-start: auto;
}
</style>
