<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const platform = computed(() => platforms.find(item => item.name === props.name));
</script>

<template>
  <div
    :style="{ backgroundColor:
                platform && platform.backgroundColor,
              color:
                platform && platform.color,
              border:
                platform && platform.border }"
  >
    <Icon :name="`my-icon:${platform && platform.icon}`" />
    <span>{{ platform && platform.name }}</span>
    <Icon name="my-icon:icon-arrow-right" />
  </div>
</template>

<style scoped>
div {
  block-size: var(--link-block-size);
  display: flex;
  align-items: center;
  gap: var(--space-100);
  border-radius: var(--br-400);
  padding: var(--space-200);
  background-color: black;
  color: white;
}

div > :last-child {
  margin-inline-start: auto;
}
</style>
