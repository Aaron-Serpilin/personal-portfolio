<template>
  <section class="other-projects section" ref="sectionRef">
    <h2 class="other-projects__title">Other Noteworthy Projects</h2>
    <router-link to="/projects" class="other-projects__archive">
      <AnimatedLink as="span">view the archive</AnimatedLink>
    </router-link>

    <ul class="other-projects__grid" ref="gridRef">
      <li 
        v-for="project in displayedProjects" 
        :key="project.title"
        class="other-projects__item"
      >
        <ProjectCard :project="project" />
      </li>
    </ul>

    <BaseButton 
      v-if="hasMoreProjects && !showAll" 
      @click="showAll = true"
      class="other-projects__more"
    >
      Show More
    </BaseButton>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import AnimatedLink from '@/components/atoms/AnimatedLink.vue';
import ProjectCard from '@/components/molecules/ProjectCard.vue';
import { projects } from '@/data/projects';
import { staggerChildren, killScrollTriggers, ScrollTrigger } from '@/animations/gsap';

const sectionRef = ref<HTMLElement | null>(null);
const gridRef = ref<HTMLElement | null>(null);
const showAll = ref(false);

const scrollTriggers: (ScrollTrigger | null)[] = [];

// Get non-featured projects
const otherProjects = projects.filter(p => !p.featured);

const hasMoreProjects = computed(() => otherProjects.length > 6);

const displayedProjects = computed(() => {
  return showAll.value ? otherProjects : otherProjects.slice(0, 6);
});

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
  margin-bottom: var(--space-sm);
}

.other-projects__archive {
  display: inline-block;
  margin-bottom: var(--space-3xl);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--color-accent);
  text-decoration: none;
}

.other-projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-lg);
  list-style: none;
  padding: 0;
  margin: 0;
}

.other-projects__more {
  margin-top: var(--space-3xl);
}
</style>
