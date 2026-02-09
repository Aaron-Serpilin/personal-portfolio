<template>
  <span class="accent-text" :class="{ 'accent-text--mono': mono }">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  mono?: boolean;
}

withDefaults(defineProps<Props>(), {
  mono: false,
});
</script>

<style scoped>
.accent-text {
  color: var(--color-accent);
}

.accent-text--mono {
  font-family: var(--font-mono);
}
</style>
