<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  confirm: string;
  cancel: string;
}>();

const emit = defineEmits<{ close: [boolean] }>();
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    :title
    :description
  >
    <template #footer>
      <div class="ms-auto flex flex-wrap gap-2">
        <UButton
          color="neutral"
          variant="outline"
          :label="cancel"
          @click="emit('close', false)"
        />
        <UButton
          color="primary"
          variant="solid"
          :label="confirm"
          @click="emit('close', true)"
        />
      </div>
    </template>
  </UModal>
</template>
