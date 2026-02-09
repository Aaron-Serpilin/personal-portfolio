<template>
  <section class="contact section" ref="sectionRef">
    <p class="contact__overline" ref="overlineRef">
      <AccentText mono>04. What's Next?</AccentText>
    </p>
    
    <h2 class="contact__title" ref="titleRef">Get In Touch</h2>
    
    <p class="contact__description" ref="descRef">
      I'm currently looking for new opportunities and my inbox is always open. 
      Whether you have a question or just want to say hi, I'll try my best to get back to you!
    </p>

    <div ref="ctaRef">
      <BaseButton as="a" href="mailto:serpilin.aaron@gmail.com" size="lg">
        Say Hello
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import AccentText from '@/components/atoms/AccentText.vue';
import { revealOnScroll, killScrollTriggers, ScrollTrigger } from '@/animations/gsap';

const sectionRef = ref<HTMLElement | null>(null);
const overlineRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
const ctaRef = ref<HTMLElement | null>(null);

const scrollTriggers: (ScrollTrigger | null)[] = [];

onMounted(() => {
  const elements = [overlineRef.value, titleRef.value, descRef.value, ctaRef.value];
  
  elements.forEach((el, index) => {
    if (el) {
      scrollTriggers.push(revealOnScroll(el, { y: 20, delay: index * 0.1 }));
    }
  });
});

onUnmounted(() => {
  killScrollTriggers(scrollTriggers);
});
</script>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-5xl) 0;
}

.contact__overline {
  font-size: var(--fs-base);
  margin-bottom: var(--space-lg);
}

.contact__title {
  font-size: clamp(var(--fs-3xl), 5vw, var(--fs-4xl));
  color: var(--color-text-primary);
  margin-bottom: var(--space-lg);
}

.contact__description {
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  margin-bottom: var(--space-2xl);
  max-width: 500px;
}
</style>
