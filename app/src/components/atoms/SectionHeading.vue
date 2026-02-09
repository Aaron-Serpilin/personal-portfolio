<template>
  <component
    :is="as"
    class="heading"
    :class="[`heading--${level}`, { 'heading--numbered': numbered }]"
  >
    <span v-if="numbered" class="heading__number">{{ formattedNumber }}</span>
    <span class="heading__text"><slot /></span>
    <span v-if="numbered" class="heading__line"></span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  numbered?: boolean;
  number?: number;
}

const props = withDefaults(defineProps<Props>(), {
  level: 2,
  numbered: false,
  number: 1,
});

const as = computed(() => props.as || `h${props.level}`);

const formattedNumber = computed(() => {
  return props.number.toString().padStart(2, '0') + '.';
});
</script>

<style scoped>
.heading {
  color: var(--color-text-primary);
  font-weight: var(--fw-bold);
  line-height: var(--lh-tight);
  margin: 0;
}

.heading--1 {
  font-size: var(--fs-hero);
}

.heading--2 {
  font-size: clamp(var(--fs-2xl), 4vw, var(--fs-4xl));
}

.heading--3 {
  font-size: var(--fs-2xl);
}

.heading--4 {
  font-size: var(--fs-xl);
}

.heading--5 {
  font-size: var(--fs-lg);
}

.heading--6 {
  font-size: var(--fs-base);
}

/* Numbered Heading */
.heading--numbered {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  white-space: nowrap;
}

.heading__number {
  font-family: var(--font-mono);
  font-size: clamp(var(--fs-sm), 2vw, var(--fs-lg));
  font-weight: var(--fw-normal);
  color: var(--color-accent);
}

.heading__text {
  color: var(--color-text-primary);
}

.heading__line {
  display: block;
  width: 100%;
  max-width: 300px;
  height: 1px;
  background-color: var(--color-bg-lighter);
}

@media (max-width: 600px) {
  .heading__line {
    max-width: 100px;
  }
}
</style>
