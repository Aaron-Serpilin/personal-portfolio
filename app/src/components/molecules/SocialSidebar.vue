<template>
  <aside class="social-sidebar social-sidebar--left" ref="leftSidebarRef" aria-label="Social links">
    <ul class="social-sidebar__list">
      <li class="social-sidebar__item">
        <SocialIcon href="https://github.com/Aaron-Serpilin" label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </SocialIcon>
      </li>
      <li class="social-sidebar__item">
        <SocialIcon href="https://www.linkedin.com/in/aaronserpilin/" label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </SocialIcon>
      </li>
      <li class="social-sidebar__item">
        <SocialIcon href="https://www.instagram.com/__aaronchelo__/" label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </SocialIcon>
      </li>
      <li class="social-sidebar__item">
        <SocialIcon href="mailto:serpilin.aaron@gmail.com" label="Email">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </SocialIcon>
      </li>
    </ul>
    <div class="social-sidebar__line"></div>
  </aside>

  <aside class="social-sidebar social-sidebar--right" ref="rightSidebarRef" aria-label="Email contact">
    <a href="mailto:serpilin.aaron@gmail.com" class="social-sidebar__email">serpilin.aaron@gmail.com</a>
    <div class="social-sidebar__line"></div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SocialIcon from '../atoms/SocialIcon.vue';
import { gsap, DURATION, EASING, prefersReducedMotion } from '../../animations/gsap';

const leftSidebarRef = ref<HTMLElement | null>(null);
const rightSidebarRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (prefersReducedMotion()) return;

  const delay = 1.5; // After page load animation

  if (leftSidebarRef.value) {
    gsap.from(leftSidebarRef.value, {
      opacity: 0,
      y: 20,
      duration: DURATION.medium,
      delay,
      ease: EASING.out,
    });
  }

  if (rightSidebarRef.value) {
    gsap.from(rightSidebarRef.value, {
      opacity: 0,
      y: 20,
      duration: DURATION.medium,
      delay: delay + 0.1,
      ease: EASING.out,
    });
  }
});
</script>

<style scoped>
.social-sidebar {
  display: none;
  position: fixed;
  bottom: 0;
  width: 40px;
  z-index: var(--z-dropdown);
  pointer-events: auto;
}

@media (min-width: 1080px) {
  .social-sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.social-sidebar--left {
  left: 40px;
}

.social-sidebar--right {
  right: 40px;
}

.social-sidebar__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  list-style: none;
  margin: 0;
  padding: 0;
}

.social-sidebar__item {
  position: relative;
  z-index: 1;
}

.social-sidebar__line {
  width: 1px;
  height: 90px;
  margin-top: var(--space-lg);
  background-color: var(--color-text-secondary);
}

.social-sidebar__email {
  writing-mode: vertical-rl;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-text-secondary);
  text-decoration: none;
  letter-spacing: 0.1em;
  transition: 
    color var(--dur-2) var(--ease-out),
    transform var(--dur-2) var(--ease-out);
}

.social-sidebar__email:hover {
  color: var(--color-accent);
  transform: translateY(-3px);
}
</style>
