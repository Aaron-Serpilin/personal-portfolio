<template>
  <component
    :is="as"
    class="btn"
    :class="[
      `btn--${variant}`,
      `btn--${size}`,
      { 'btn--icon-only': iconOnly },
      { 'btn--loading': loading }
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
    ref="buttonRef"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <span class="btn__content">
      <slot name="icon-left" />
      <span v-if="!iconOnly" class="btn__text">
        <slot />
      </span>
      <slot name="icon-right" />
    </span>
    <span class="btn__bg" ref="bgRef"></span>
  </component>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap, DURATION, EASING, prefersReducedMotion } from '@/animations/gsap';

interface Props {
  as?: 'button' | 'a' | 'router-link';
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  as: 'button',
  variant: 'primary',
  size: 'md',
  iconOnly: false,
  disabled: false,
  loading: false,
});

const buttonRef = ref<HTMLElement | null>(null);
const bgRef = ref<HTMLElement | null>(null);

const onMouseEnter = () => {
  if (prefersReducedMotion()) return;
  
  gsap.to(buttonRef.value, {
    y: -2,
    duration: DURATION.short,
    ease: EASING.out,
  });
};

const onMouseLeave = () => {
  if (prefersReducedMotion()) return;
  
  gsap.to(buttonRef.value, {
    y: 0,
    duration: DURATION.short,
    ease: EASING.out,
  });
};
</script>

<style scoped>
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  text-decoration: none;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  overflow: hidden;
  transition: 
    transform var(--dur-2) var(--ease-out),
    box-shadow var(--dur-2) var(--ease-out);
  will-change: transform;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.btn__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-3) var(--ease-out-expo);
}

.btn:hover .btn__bg {
  transform: scaleX(1);
}

/* Variants */
.btn--primary {
  background-color: transparent;
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn--primary .btn__bg {
  background-color: var(--color-accent-tint);
}

.btn--secondary {
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
}

.btn--secondary:hover {
  background-color: var(--color-accent-hover);
}

.btn--ghost {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-text-primary);
}

.btn--ghost .btn__bg {
  background-color: var(--color-accent-tint);
}

.btn--outline {
  background-color: transparent;
  border-color: var(--color-text-tertiary);
  color: var(--color-text-secondary);
}

.btn--outline:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Sizes */
.btn--sm {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--fs-xs);
}

.btn--md {
  padding: var(--space-md) var(--space-lg);
}

.btn--lg {
  padding: var(--space-lg) var(--space-xl);
  font-size: var(--fs-base);
}

/* Icon Only */
.btn--icon-only.btn--sm {
  padding: var(--space-sm);
}

.btn--icon-only.btn--md {
  padding: var(--space-md);
}

.btn--icon-only.btn--lg {
  padding: var(--space-lg);
}

/* Loading */
.btn--loading .btn__text {
  opacity: 0;
}

.btn--loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
