<template>
  <section class="featured-projects section" ref="sectionRef">
    <SectionHeading :level="2" numbered :number="3">Some Things I've Built</SectionHeading>

    <div class="featured-projects__list">
      <ProjectCard
        v-for="(project, index) in featuredProjects"
        :key="project.title"
        :project="project"
        featured
        :reverse="index % 2 === 1"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from '@/components/atoms/SectionHeading.vue';
import ProjectCard from '@/components/molecules/ProjectCard.vue';
import { projects } from '@/data/projects';

// Get featured projects
const featuredProjects = projects.filter(p => p.featured).slice(0, 4);
</script>

<style scoped>
.featured-projects__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-5xl);
  margin-top: var(--space-2xl);
}
</style>
