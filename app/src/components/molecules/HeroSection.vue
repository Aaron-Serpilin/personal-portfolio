<template>
  <section class="hero" ref="heroRef">
    <div class="hero__content">
      <p class="hero__greeting" ref="greetingRef">
        <AccentText mono>Hi, my name is</AccentText>
      </p>
      
      <h1 class="hero__name" ref="nameRef">Aaron Serpilin.</h1>
      
      <h2 class="hero__tagline" ref="taglineRef">I build ideas, software, and initiatives.</h2>
      
      <p class="hero__description" ref="descriptionRef">
        I'm a Junior Software Engineer with a background in niche-AI and foundational background in ML.
        <br>I love turning ideas, initiatives, and my passions into reality, whether digitally or physically.
      </p>

      <div class="hero__cta" ref="ctaRef">
        <BaseButton as="router-link" to="/projects" size="lg">
          Check out my work
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import AccentText from '@/components/atoms/AccentText.vue';
import AnimatedLink from '@/components/atoms/AnimatedLink.vue';
import { gsap, DURATION, EASING, STAGGER, prefersReducedMotion } from '@/animations/gsap';

const heroRef = ref<HTMLElement | null>(null);
const greetingRef = ref<HTMLElement | null>(null);
const nameRef = ref<HTMLElement | null>(null);
const taglineRef = ref<HTMLElement | null>(null);
const descriptionRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (prefersReducedMotion()) return;

  const elements = [
    greetingRef.value,
    nameRef.value,
    taglineRef.value,
    descriptionRef.value,
    ctaRef.value,
  ].filter(Boolean);

  gsap.set(elements, { opacity: 0, y: 20 });

  const tl = gsap.timeline({ delay: 0.5 });

  tl.to(elements, {
    opacity: 1,
    y: 0,
    duration: DURATION.medium,
    stagger: STAGGER.slow,
    ease: EASING.out,
  });
});
</script>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: var(--nav-height) 0;
}

.hero__content {
  max-width: 1000px;
}

.hero__greeting {
  margin-bottom: var(--space-lg);
  font-size: var(--fs-base);
}

.hero__name {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: var(--fw-bold);
  line-height: var(--lh-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.hero__tagline {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: var(--fw-bold);
  line-height: var(--lh-tight);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-xl);
}

.hero__description {
  max-width: 540px;
  font-size: var(--fs-lg);
  line-height: var(--lh-relaxed);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2xl);
}

.hero__cta {
  display: flex;
  gap: var(--space-md);
}
</style>
