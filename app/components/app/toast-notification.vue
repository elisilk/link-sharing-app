<script setup lang="ts">
defineProps<{
  icon?: string;
}>();

const show = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

watch(show, (newValue) => {
  if (newValue) {
    timeoutId = setTimeout(() => {
      show.value = false;
    }, 3000);
  }
});

onMounted(() => {
  show.value = true;
});

onBeforeUnmount(() => {
  if (timeoutId)
    clearTimeout(timeoutId);
});
</script>

<template>
  <Transition>
    <div v-if="show">
      <Icon
        v-if="icon"
        :name="icon"
        class="icon"
      />
      <p><slot /></p>
    </div>
  </Transition>
</template>

<style scoped>
div {
  --inline-size-gutter: var(--space-200);
  inline-size: calc(100% - 2 * var(--inline-size-gutter));
  max-inline-size: max-content;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: hsl(var(--color-grey-900));
  color: hsl(var(--color-grey-50));
  display: flex;
  align-items: center;
  gap: var(--space-100);
  border-radius: var(--br-500);
  padding: var(--space-200);
  box-shadow: var(--shadow-toast-notification);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.icon {
  inline-size: 20px;
  block-size: 20px;
  flex-shrink: 0;
}

/* viewport: mobile -> tablet */
@media (min-width: 45rem) {
  div {
    padding-inline: var(--space-300);
  }
}
</style>
