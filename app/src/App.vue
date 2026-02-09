<template>
  <div id="app" :class="{ 'blur-content': isMenuOpen }">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <Header @menu-toggle="isMenuOpen = $event" />
    <SocialSidebar />
    <router-view v-slot="{ Component, route }">
      <Transition 
        name="page" 
        mode="out-in"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <main id="main-content" :key="route.path">
          <component :is="Component" />
        </main>
      </Transition>
    </router-view>
    <TheFooter />
    <div class="bg-gradient" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/molecules/Header.vue";
import TheFooter from "./components/molecules/TheFooter.vue";
import SocialSidebar from "./components/molecules/SocialSidebar.vue";
import { pageEnter, pageLeave, prefersReducedMotion } from "./animations/gsap";

const isMenuOpen = ref(false);

// Page transition hooks
const onBeforeEnter = (el: Element) => {
  if (prefersReducedMotion()) return;
  (el as HTMLElement).style.opacity = "0";
};

const onEnter = (el: Element, done: () => void) => {
  pageEnter(el, done);
};

const onLeave = (el: Element, done: () => void) => {
  pageLeave(el, done);
};
</script>

<style>
/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity var(--dur-3) var(--ease-out), transform var(--dur-3) var(--ease-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<style scoped>
#app {
  position: relative;
  min-height: 100vh;
}

.blur-content > *:not(.mobile-menu) {
  filter: blur(5px);
  pointer-events: none;
}

/* Skip Link for Accessibility */
.skip-link {
  position: fixed;
  top: -100%;
  left: var(--space-md);
  z-index: 9999;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-accent);
  color: var(--color-bg);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: top var(--dur-2) var(--ease-out);
}

.skip-link:focus {
  top: var(--space-md);
}

/* Background Gradient Effect */
.bg-gradient {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  pointer-events: none;
  z-index: var(--z-behind);
  background: radial-gradient(
    ellipse 80% 50% at 50% -20%,
    rgba(100, 255, 218, 0.08),
    transparent
  );
}

/* Main Content Area */
#main-content {
  position: relative;
  z-index: var(--z-base);
}
</style>
