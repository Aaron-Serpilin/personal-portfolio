<template>
  <div class="social-icon" ref="iconRef">
    <a 
      :href="href" 
      :aria-label="label"
      target="_blank"
      rel="noopener noreferrer"
      class="social-icon__link"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
    >
      <slot />
    </a>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap, DURATION, EASING, prefersReducedMotion } from '@/animations/gsap';

interface Props {
  href: string;
  label: string;
}

defineProps<Props>();

const iconRef = ref<HTMLElement | null>(null);

const onEnter = () => {
  if (prefersReducedMotion() || !iconRef.value) return;
  
  gsap.to(iconRef.value, {
    y: -4,
    color: 'var(--color-accent)',
    duration: DURATION.short,
    ease: EASING.out,
  });
};

const onLeave = () => {
  if (prefersReducedMotion() || !iconRef.value) return;
  
  gsap.to(iconRef.value, {
    y: 0,
    color: 'var(--color-text-secondary)',
    duration: DURATION.short,
    ease: EASING.out,
  });
};
</script>

<style scoped>
.social-icon {
  color: var(--color-text-secondary);
  transition: color var(--dur-2) var(--ease-out);
}

.social-icon__link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm);
  color: inherit;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.social-icon__link:hover {
  color: var(--color-accent);
}

.social-icon__link svg {
  width: 20px;
  height: 20px;
  pointer-events: none;
}
</style>
