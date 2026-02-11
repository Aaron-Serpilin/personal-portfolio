<template>
  <section class="other-projects section" ref="sectionRef">
    <h2 class="other-projects__title">Other Noteworthy Projects</h2>
    
    <ul class="other-projects__grid" ref="gridRef">
      <li 
        v-for="project in otherProjects" 
        :key="project.title"
        class="other-projects__item"
      >
        <ProjectCard :project="project" />
      </li>
    </ul>

    <router-link to="/projects" class="other-projects__archive">
      <AnimatedLink as="span">view the full archive</AnimatedLink>
    </router-link>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AnimatedLink from '@/components/atoms/AnimatedLink.vue';
import ProjectCard from '@/components/molecules/ProjectCard.vue';
import { projects } from '@/data/projects';
import { staggerChildren, killScrollTriggers, ScrollTrigger } from '@/animations/gsap';

const sectionRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);

const scrollTriggers: (ScrollTrigger | null)[] = [];

// Get non-featured projects
const otherProjects = projects.filter(p => !p.featured);

onMounted(() => {
  if (gridRef.value) {
    scrollTriggers.push(staggerChildren(gridRef.value, '.other-projects__item', { 
      y: 30, 
      stagger: 0.1,
    }));
  }
});

onUnmounted(() => {
  killScrollTriggers(scrollTriggers);
});
</script>

<style scoped>
    .other-projects {
    text-align: center;
    }

    .other-projects__title {
    font-size: clamp(var(--fs-xl), 4vw, var(--fs-2xl));
    color: var(--color-text-primary);
    margin-bottom: var(--space-3xl);
    }

    .other-projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-lg);
    list-style: none;
    padding: 0;
    margin: 0 auto var(--space-3xl);
    max-width: 1200px;
    }

    @media (max-width: 640px) {
    .other-projects__grid {
        grid-template-columns: 1fr;
        gap: var(--space-md);
    }
    }

    .other-projects__item {
    width: 100%;
    min-height: 320px;
    display: flex;
    }

    @media (max-width: 640px) {
    .other-projects__item {
        min-height: 280px;
    }
    }

    .other-projects__archive {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    color: var(--color-accent);
    text-decoration: none;
    }
</style>