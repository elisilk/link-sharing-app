<script setup lang="ts">
const props = defineProps<{
  platform: string;
  url: string | null;
}>();

const platform = computed(() => platforms.find(item => item.name === props.platform));
</script>

<template>
  <UButton
    v-if="platform"
    :to="props.url || undefined"
    :label="platform.name"
    :icon="platform.icon"
    trailing-icon="i-custom-icon-arrow-right"
    class="p-4"
    :style="{ backgroundColor: platform.backgroundColor,
              color: platform.color,
              border: platform.border }"
    target="_blank"
  />
  <div v-else>
    Placeholder Link Button
  </div>
</template>
