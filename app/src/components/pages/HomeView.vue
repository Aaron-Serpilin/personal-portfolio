<template>
  <main class="home">
    <div class="container">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <FeaturedProjects />
      <OtherProjects />
      <ContactSection />
    </div>
  </main>
</template>

<script setup lang="ts">
import HeroSection from '@/components/molecules/HeroSection.vue';
import AboutSection from '@/components/molecules/AboutSection.vue';
import ExperienceSection from '@/components/molecules/ExperienceSection.vue';
import FeaturedProjects from '@/components/molecules/FeaturedProjects.vue';
import OtherProjects from '@/components/molecules/OtherProjects.vue';
import ContactSection from '@/components/molecules/ContactSection.vue';
</script>

<style scoped>
.home {
  padding-top: 0;
}
</style>
