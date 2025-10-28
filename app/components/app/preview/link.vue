<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const platforms = [
  { name: "Frontend Mentor", icon: "icon-frontend-mentor", backgroundColor: "#FFFFFF", color: "#333333", border: "var(--border-width) solid #D9D9D9" },
  { name: "GitHub", icon: "icon-github", backgroundColor: "#1A1A1A" },
  { name: "LinkedIn", icon: "icon-linkedin", backgroundColor: "#2D68FF" },
  { name: "Twitter", icon: "icon-twitter", backgroundColor: "#43B7E9" },
  { name: "YouTube", icon: "icon-youtube", backgroundColor: "#EE3939" },
  { name: "Facebook", icon: "icon-facebook", backgroundColor: "#2442AC" },
  { name: "Twitch", icon: "icon-twitch", backgroundColor: "#EE3FC8" },
  { name: "Dev.to", icon: "icon-devto", backgroundColor: "#333333" },
  { name: "Codewars", icon: "icon-codewars", backgroundColor: "#8A1A50" },
  { name: "freeCodeCamp", icon: "icon-freecodecamp", backgroundColor: "#302267" },
  { name: "GitLab", icon: "icon-gitlab", backgroundColor: "#EB4925" },
  { name: "Hashnode", icon: "icon-hashnode", backgroundColor: "#0330D1" },
  { name: "Stack Overflow", icon: "icon-stack-overflow", backgroundColor: "#EC7100" },
];

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
