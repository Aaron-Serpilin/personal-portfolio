<template>
  <header class="header" :class="{ 'header--hidden': isHidden }" ref="headerRef">
    <nav class="header__nav container" aria-label="Main navigation">
      <!-- Logo -->
      <router-link to="/" class="header__logo" @click="closeMobileMenu">
        <svg viewBox="0 0 100 100" width="42" height="42" class="logo-svg">
          <polygon 
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            fill="transparent"
            stroke="currentColor"
            stroke-width="4"
          />
          <text 
            x="50" 
            y="62" 
            text-anchor="middle" 
            fill="currentColor"
            font-family="var(--font-mono)"
            font-size="38"
            font-weight="600"
          >
            A
          </text>
        </svg>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="header__links">
        <ol class="nav-list">
          <li 
            v-for="(link, index) in navLinks" 
            :key="link.path"
            class="nav-item"
            ref="navItemsRef"
          >
            <router-link 
              :to="link.path" 
              class="nav-link"
              :class="{ 'nav-link--active': isActive(link.path) }"
            >
              <span class="nav-link__number">{{ formatNumber(index + 1) }}</span>
              <span class="nav-link__text">{{ link.name }}</span>
            </router-link>
          </li>
        </ol>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="header__menu-btn" 
        :class="{ 'header__menu-btn--open': isMobileMenuOpen }"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
        <span class="menu-bar"></span>
      </button>
    </nav>

    <!-- Mobile Menu Backdrop -->
    <Transition name="backdrop">
      <div 
        v-if="isMobileMenuOpen" 
        class="mobile-menu__backdrop"
        @click="closeMobileMenu"
      ></div>
    </Transition>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="mobile-menu">
        <nav class="mobile-menu__nav" aria-label="Mobile navigation">
          <ol class="mobile-nav-list">
            <li v-for="(link, index) in navLinks" :key="link.path" class="mobile-nav-item">
              <router-link 
                :to="link.path" 
                class="mobile-nav-link"
                @click="closeMobileMenu"
              >
                <span class="mobile-nav-link__number">{{ formatNumber(index + 1) }}</span>
                <span class="mobile-nav-link__text">{{ link.name }}</span>
              </router-link>
            </li>
          </ol>

        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from '@/components/atoms/BaseButton.vue';
import { createHeaderScrollAnimation, prefersReducedMotion } from '@/animations/gsap';

interface NavLink {
  name: string;
  path: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Story', path: '/story' },
];

const route = useRoute();
const headerRef = ref<HTMLElement | null>(null);
const navItemsRef = ref<HTMLElement[]>([]);
const isHidden = ref(false);
const isMobileMenuOpen = ref(false);

let cleanupScroll: (() => void) | null = null;

const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0') + '.';
};

const isActive = (path: string): boolean => {
  return route.path === path;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu();
});

onMounted(() => {
  if (headerRef.value && !prefersReducedMotion()) {
    cleanupScroll = createHeaderScrollAnimation(headerRef.value);
  }
});

onUnmounted(() => {
  cleanupScroll?.();
  document.body.style.overflow = '';
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  height: var(--nav-height);
  background-color: transparent;
  transition: transform var(--dur-3) var(--ease-out);
}

.header--hidden {
  transform: translateY(-100%);
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.header__logo {
  display: flex;
  align-items: center;
  color: var(--color-accent);
  transition: color var(--dur-2) var(--ease-out);
}

.header__logo:hover {
  color: var(--color-accent-hover);
}

.logo-svg {
  transition: transform var(--dur-3) var(--ease-out);
}

.header__logo:hover .logo-svg {
  transform: scale(1.05);
}

/* Desktop Nav */
.header__links {
  display: none;
  align-items: center;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .header__links {
    display: flex;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-secondary);
  font-size: var(--fs-sm);
  text-decoration: none;
  padding: var(--space-sm);
  transition: color var(--dur-2) var(--ease-out);
}

.nav-link:hover,
.nav-link--active {
  color: var(--color-accent);
}

.nav-link__number {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-accent);
}

/* Mobile Menu Button */
.header__menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: var(--z-modal);
}

@media (min-width: 768px) {
  .header__menu-btn {
    display: none;
  }
}

.menu-bar {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--color-accent);
  border-radius: var(--radius-full);
  transition: 
    transform var(--dur-3) var(--ease-out),
    opacity var(--dur-2) var(--ease-out);
  transform-origin: center;
}

.header__menu-btn--open .menu-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__menu-btn--open .menu-bar:nth-child(2) {
  opacity: 0;
}

.header__menu-btn--open .menu-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu Backdrop */
.mobile-menu__backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(3px);
  z-index: calc(var(--z-fixed) - 1);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(75vw, 400px);
  background-color: var(--color-bg);
  padding: calc(var(--nav-height) + var(--space-2xl)) var(--space-2xl) var(--space-2xl);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  z-index: var(--z-fixed);
  overflow-y: auto;
}

.mobile-menu__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2xl);
  height: 100%;
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}

.mobile-nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-text-primary);
  text-decoration: none;
  padding: var(--space-md);
  font-size: var(--fs-lg);
  width: 100%;
  text-align: center;
}

.mobile-nav-link__number {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--color-accent);
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: transform var(--dur-4) var(--ease-out);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  transform: translateX(100%);
}

/* Backdrop Transitions */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity var(--dur-3) var(--ease-out);
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
