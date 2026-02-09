<template>
  <component
    :is="as"
    class="link"
    :class="{ 'link--with-icon': hasIcon }"
    v-bind="$attrs"
    ref="linkRef"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <span class="link__text">
      <slot />
    </span>
    <span class="link__underline" ref="underlineRef"></span>
    <span v-if="hasIcon" class="link__icon">
      <slot name="icon">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { createUnderlineSweep } from '@/animations/gsap';

interface Props {
  as?: 'a' | 'router-link' | 'button' | 'span';
}

withDefaults(defineProps<Props>(), {
  as: 'a',
});

const slots = useSlots();
const hasIcon = computed(() => !!slots.icon || true);

const linkRef = ref<HTMLElement | null>(null);
const underlineRef = ref<HTMLElement | null>(null);

let hoverAnimation: { enter: () => void; leave: () => void } | null = null;

const onEnter = () => {
  if (!underlineRef.value || !linkRef.value) return;
  
  if (!hoverAnimation) {
    hoverAnimation = createUnderlineSweep(linkRef.value, underlineRef.value);
  }
  hoverAnimation.enter();
};

const onLeave = () => {
  hoverAnimation?.leave();
};
</script>

<style scoped>
.link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: inherit;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.link__text {
  position: relative;
}

.link__underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left center;
}

.link__icon {
  display: inline-flex;
  align-items: center;
  transition: transform var(--dur-2) var(--ease-out);
}

.link:hover .link__icon {
  transform: translate(2px, -2px);
}

.link:hover {
  color: var(--color-accent);
}
</style>
