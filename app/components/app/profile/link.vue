<script setup lang="ts">
type Props = {
  size?: "sm" | "md";
  platform: PlatformName;
  url: string | null;
};

const { size = "md", platform, url } = defineProps<Props>();

const platformInfo = computed<Platform | undefined>(() => platforms[platform]);
</script>

<template>
  <UButton
    v-if="platformInfo"
    :to="url || undefined"
    :label="platformInfo.label"
    :icon="platformInfo.icon"
    trailing-icon="i-custom-icon-arrow-right"
    :ui="{
      trailingIcon: 'ms-auto size-4',
      leadingIcon: [size === 'md' ? 'size-5' : 'size-4'],
    }"
    class="p-4 gap-2 font-normal"
    :class="[size === 'md' ? 'h-14 text-base' : 'h-11 text-xs']"
    :style="{ backgroundColor: platformInfo.backgroundColor,
              color: platformInfo.color,
              border: platformInfo.border }"
    target="_blank"
  />
  <div v-else>
    Placeholder Link Button
  </div>
</template>
