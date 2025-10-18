<script setup lang="ts">
defineProps<{
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder?: string;
}>();
</script>

<template>
  <div class="container">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :name="name"
      :type="type"
      :placeholder="placeholder"
    >
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-100);
}

label {
  font-size: var(--fs-200);
}

input {
  padding: var(--space-200);
  border-radius: var(--br-400);
  border: 1px solid var(--color-input-border);
}

input:focus-visible {
  box-shadow: var(--shadow-input-field);
  border: 1px solid var(--color-input-active);
  outline: none;
}
</style>
