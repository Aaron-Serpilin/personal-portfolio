<template>
  <span 
    class="tag" 
    :class="[`tag--${variant}`, `tag--${size}`]"
    ref="tagRef"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  variant?: 'default' | 'accent' | 'muted';
  size?: 'sm' | 'md';
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
});

const tagRef = ref<HTMLElement | null>(null);
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-weight: var(--fw-normal);
  border-radius: var(--radius-full);
  white-space: nowrap;
  transition: 
    background-color var(--dur-2) var(--ease-out),
    color var(--dur-2) var(--ease-out);
}

/* Sizes */
.tag--sm {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--fs-xs);
}

.tag--md {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--fs-sm);
}

/* Variants */
.tag--default {
  background-color: var(--color-accent-tint);
  color: var(--color-accent);
}

.tag--accent {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

.tag--muted {
  background-color: var(--color-bg-lighter);
  color: var(--color-text-secondary);
}
</style>
