<template>
  <article 
    class="project-card" 
    :class="{ 'project-card--featured': featured, 'project-card--reverse': reverse }"
    ref="cardRef"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Image -->
    <div class="project-card__image-wrapper">
      <a :href="project.external || project.github" target="_blank" rel="noopener noreferrer">
        <div class="project-card__image-container" ref="imageRef">
          <img 
            :src="project.image || '/food-transition.jpg'" 
            :alt="project.title" 
            class="project-card__image"
            loading="lazy"
          />
          <div class="project-card__image-overlay"></div>
        </div>
      </a>
    </div>

    <!-- Content -->
    <div class="project-card__content">
      <p class="project-card__overline">
        <AccentText mono>{{ featured ? 'Featured Project' : 'Project' }}</AccentText>
      </p>
      
      <h3 class="project-card__title">
        <a 
          :href="project.external || project.github" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {{ project.title }}
        </a>
      </h3>

      <div class="project-card__description">
        <p>{{ project.description }}</p>
      </div>

      <ul class="project-card__tech" ref="techRef">
        <li v-for="tech in project.tech" :key="tech" class="project-card__tech-item">
          <TechTag>{{ tech }}</TechTag>
        </li>
      </ul>

      <div class="project-card__links">
        <a 
          v-if="project.github" 
          :href="project.github" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-card__link"
          aria-label="GitHub repository"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <a 
          v-if="project.external" 
          :href="project.external" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-card__link"
          aria-label="External link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import TechTag from '@/components/atoms/TechTag.vue';
import AccentText from '@/components/atoms/AccentText.vue';
import { 
  revealOnScroll, 
  staggerChildren, 
  gsap, 
  DURATION, 
  EASING, 
  killScrollTriggers, 
  ScrollTrigger,
  prefersReducedMotion 
} from '@/animations/gsap';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  external?: string;
}

interface Props {
  project: Project;
  featured?: boolean;
  reverse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
  reverse: false,
});

const cardRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);
const techRef = ref<HTMLElement | null>(null);

const scrollTriggers: (ScrollTrigger | null)[] = [];

const onMouseEnter = () => {
  if (prefersReducedMotion() || !imageRef.value) return;
  
  gsap.to(imageRef.value.querySelector('.project-card__image'), {
    scale: 1.05,
    duration: DURATION.slow,
    ease: EASING.out,
  });
};

const onMouseLeave = () => {
  if (prefersReducedMotion() || !imageRef.value) return;
  
  gsap.to(imageRef.value.querySelector('.project-card__image'), {
    scale: 1,
    duration: DURATION.slow,
    ease: EASING.out,
  });
};

onMounted(() => {
  if (cardRef.value) {
    scrollTriggers.push(revealOnScroll(cardRef.value, { y: 40 }));
  }

  if (techRef.value) {
    scrollTriggers.push(staggerChildren(techRef.value, '.project-card__tech-item', { 
      y: 10, 
      stagger: 0.05,
      start: 'top 90%',
    }));
  }
});

onUnmounted(() => {
  killScrollTriggers(scrollTriggers);
});
</script>

<style scoped>
.project-card {
  position: relative;
  display: grid;
  gap: var(--space-md);
  align-items: center;
}

/* Featured Layout */
.project-card--featured {
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .project-card--featured {
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-md);
  }
}

/* Image */
.project-card__image-wrapper {
  position: relative;
  z-index: 1;
}

.project-card--featured .project-card__image-wrapper {
  grid-column: 1 / -1;
  grid-row: 1 / 1;
  margin-bottom: var(--space-md);
}

@media (min-width: 768px) {
  .project-card--featured .project-card__image-wrapper {
    grid-column: 1 / 8;
    grid-row: 1 / -1;
    margin-bottom: 0;
  }

  .project-card--featured.project-card--reverse .project-card__image-wrapper {
    grid-column: 6 / -1;
  }
}

.project-card__image-container {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  aspect-ratio: 4 / 3;
  background-color: var(--color-bg-lighter);
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform var(--dur-4) var(--ease-out);
}

.project-card__image-overlay {
  position: absolute;
  inset: 0;
  background-color: var(--color-accent-tint);
  mix-blend-mode: multiply;
  transition: background-color var(--dur-3) var(--ease-out);
}

@media (min-width: 768px) {
  .project-card__image-overlay {
    mix-blend-mode: multiply;
  }
}

/* Remove overlay on mobile for better visibility */
@media (max-width: 767px) {
  .project-card__image-overlay {
    display: none;
  }
  
  .project-card__image {
    filter: none;
  }
}

.project-card:hover .project-card__image-overlay {
  background-color: transparent;
}

/* Content */
.project-card__content {
  position: relative;
  z-index: 2;
}

.project-card--featured .project-card__content {
  grid-column: 1 / -1;
  grid-row: 2 / 2;
  padding: var(--space-lg);
  background-color: var(--color-bg-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}

@media (min-width: 768px) {
  .project-card--featured .project-card__content {
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    text-align: right;
    align-items: flex-end;
  }

  .project-card--featured.project-card--reverse .project-card__content {
    grid-column: 1 / 8;
    text-align: left;
    align-items: flex-start;
  }
}

.project-card__overline {
  font-size: var(--fs-sm);
  margin-bottom: var(--space-sm);
}

.project-card__title {
  font-size: clamp(var(--fs-xl), 3vw, var(--fs-2xl));
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.project-card__title a {
  color: inherit;
  text-decoration: none;
  transition: color var(--dur-2) var(--ease-out);
}

.project-card__title a:hover {
  color: var(--color-accent);
}

.project-card__description {
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  margin-bottom: var(--space-lg);
}

@media (min-width: 768px) {
  .project-card--featured .project-card__description {
    padding: var(--space-lg);
    background-color: var(--color-bg-light);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
  }
}

@media (max-width: 767px) {
  .project-card--featured .project-card__description {
    font-size: var(--fs-sm);
  }
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-lg) 0;
}

@media (max-width: 767px) {
  .project-card__tech {
    gap: var(--space-xs);
  }
}

@media (min-width: 768px) {
  .project-card--featured .project-card__tech {
    justify-content: flex-end;
  }

  .project-card--featured.project-card--reverse .project-card__tech {
    justify-content: flex-start;
  }
}

.project-card__links {
  display: flex;
  gap: var(--space-md);
}

@media (min-width: 768px) {
  .project-card--featured .project-card__links {
    justify-content: flex-end;
  }

  .project-card--featured.project-card--reverse .project-card__links {
    justify-content: flex-start;
  }
}

.project-card__link {
  display: flex;
  align-items: center;
  color: var(--color-text-primary);
  padding: var(--space-sm);
  transition: color var(--dur-2) var(--ease-out);
}

.project-card__link:hover {
  color: var(--color-accent);
}

/* Non-featured card style */
.project-card:not(.project-card--featured) {
  background-color: var(--color-bg-light);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: 
    transform var(--dur-3) var(--ease-out),
    box-shadow var(--dur-3) var(--ease-out);
}

.project-card:not(.project-card--featured):hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-card-hover);
}

.project-card:not(.project-card--featured) .project-card__image-wrapper {
  display: none;
}
</style>
