<script setup lang="ts">
const { toasts, removeToast } = useToastNotifications();
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup>
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          :class="[`toast-${toast.type}`]"
        >
          <Icon
            v-if="toast.icon"
            :name="toast.icon"
            class="icon"
          />
          <span>{{ toast.message }}</span>
          <button v-if="toast.close" @click="removeToast(toast.id)">
            X
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  z-index: 1;
  --inline-size-gutter: var(--space-200);
  inline-size: calc(100% - 2 * var(--inline-size-gutter));
  max-inline-size: max-content;

  position: fixed;
  bottom: var(--space-200);
  left: 50%;
  transform: translateX(-50%);

  display: grid;
  gap: var(--space-100);
}

.toast-item {
  background-color: var(--color-background-notification);
  color: var(--color-text-notification);
  display: flex;
  align-items: center;
  gap: var(--space-100);
  border-radius: var(--br-500);
  padding: var(--space-200);
  box-shadow: var(--shadow-toast-notification);
}

.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-leave-active {
  position: absolute;
}
</style>
