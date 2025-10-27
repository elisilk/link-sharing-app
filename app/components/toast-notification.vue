<script setup lang="ts">
defineProps<{
  icon: string;
}>();
</script>

<template>
  <div>
    <Icon :name="icon" />
    <p><slot /></p>
  </div>
</template>

<style scoped>
div {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: hsl(var(--color-grey-900));
  color: hsl(var(--color-grey-50));
  display: flex;
  align-items: center;
  gap: var(--space-100);
  border-radius: var(--br-500);
  padding: var(--space-200) var(--space-300);
  box-shadow: var(--shadow-toast-notification);
}
</style>
