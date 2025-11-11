<script setup lang="ts">
const props = defineProps<{
  platform: string;
  url: string | null;
}>();

const platform = computed(() => platforms.find(item => item.name === props.platform));
</script>

<template>
  <NuxtLink
    v-if="props.url"
    class="link"
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
  <div
    v-else
    class="link"
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
.link {
  block-size: var(--link-block-size);
  display: flex;
  align-items: center;
  gap: var(--space-100);
  border-radius: var(--br-400);
  padding: var(--space-200);
  background-color: black;
  color: white;
}

.link > :last-child {
  margin-inline-start: auto;
}
</style>
