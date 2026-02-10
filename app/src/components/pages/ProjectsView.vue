<template>
  <main class="projects-page">
    <div class="container">
      <header class="projects-page__header" ref="headerRef">
        <h1 class="projects-page__title">All Projects</h1>
        <p class="projects-page__description">
          A big list of things I've worked on
        </p>
      </header>

      <!-- Filter/Search -->
      <div class="projects-page__filters" ref="filtersRef">
        <div class="projects-page__search">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search projects..."
            class="projects-page__search-input"
          />
        </div>
        <div class="projects-page__tech-filter">
          <button 
            v-for="tech in availableTechs" 
            :key="tech"
            class="projects-page__tech-btn"
            :class="{ 'projects-page__tech-btn--active': selectedTech === tech }"
            @click="toggleTech(tech)"
          >
            {{ tech }}
          </button>
        </div>
      </div>

      <!-- Projects Table -->
      <div class="projects-page__table-wrapper" ref="tableRef">
        <table class="projects-page__table">
          <thead>
            <tr>
              <th class="projects-page__th">Year</th>
              <th class="projects-page__th">Title</th>
              <th class="projects-page__th projects-page__th--hide-mobile">Built with</th>
              <th class="projects-page__th">Link</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="project in filteredProjects" 
              :key="project.title"
              class="projects-page__row"
            >
              <td class="projects-page__td projects-page__year">
                <AccentText mono>{{ project.year }}</AccentText>
              </td>
              <td class="projects-page__td projects-page__title-cell">
                {{ project.title }}
              </td>
              <td class="projects-page__td projects-page__tech projects-page__th--hide-mobile">
                <div class="projects-page__tech-list">
                  <TechTag v-for="tech in project.tech.slice(0, 4)" :key="tech" variant="muted">
                    {{ tech }}
                  </TechTag>
                </div>
              </td>
              <td class="projects-page__td projects-page__links">
                <div class="projects-page__links-wrapper">
                  <a 
                    v-if="project.github" 
                    :href="project.github" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="projects-page__link"
                    aria-label="GitHub repository"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a 
                    v-if="project.external" 
                    :href="project.external" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="projects-page__link"
                    aria-label="External link"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="projects-page__empty">
        <p>No projects found matching your criteria.</p>
        <BaseButton @click="clearFilters">Clear Filters</BaseButton>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import TechTag from '@/components/atoms/TechTag.vue';
import AccentText from '@/components/atoms/AccentText.vue';
import BaseButton from '@/components/atoms/BaseButton.vue';
import { projects } from '@/data/projects';
import { revealOnScroll, staggerChildren, killScrollTriggers, ScrollTrigger } from '@/animations/gsap';

const headerRef = ref<HTMLElement | null>(null);
const filtersRef = ref<HTMLElement | null>(null);
const tableRef = ref<HTMLElement | null>(null);

const searchQuery = ref('');
const selectedTech = ref<string | null>(null);

const scrollTriggers: (ScrollTrigger | null)[] = [];

// Get unique technologies
const availableTechs = computed(() => {
  const techs = new Set<string>();
  projects.forEach(p => p.tech.forEach(t => techs.add(t)));
  return Array.from(techs).slice(0, 10); // Limit to 10 for UI
});

// Filter projects
const filteredProjects = computed(() => {
  return projects.filter(project => {
    const matchesSearch = searchQuery.value === '' || 
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesTech = selectedTech.value === null || 
      project.tech.includes(selectedTech.value);
    
    return matchesSearch && matchesTech;
  });
});

const toggleTech = (tech: string) => {
  selectedTech.value = selectedTech.value === tech ? null : tech;
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedTech.value = null;
};

onMounted(() => {
  if (headerRef.value) {
    scrollTriggers.push(revealOnScroll(headerRef.value, { y: 20 }));
  }

  if (filtersRef.value) {
    scrollTriggers.push(revealOnScroll(filtersRef.value, { y: 20, delay: 0.1 }));
  }

  if (tableRef.value) {
    scrollTriggers.push(staggerChildren(tableRef.value, '.projects-page__row', { 
      y: 15, 
      stagger: 0.05,
    }));
  }
});

onUnmounted(() => {
  killScrollTriggers(scrollTriggers);
});
</script>

<style scoped>
.projects-page {
  padding-top: calc(var(--nav-height) + var(--space-3xl));
  min-height: 100vh;
}

.projects-page__header {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.projects-page__title {
  font-size: clamp(var(--fs-3xl), 5vw, var(--fs-5xl));
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.projects-page__description {
  font-size: var(--fs-lg);
  color: var(--color-text-secondary);
}

/* Filters */
.projects-page__filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-bottom: var(--space-2xl);
}

@media (min-width: 768px) {
  .projects-page__filters {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.projects-page__search-input {
  width: 100%;
  max-width: 300px;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-bg-lighter);
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  transition: border-color var(--dur-2) var(--ease-out);
}

.projects-page__search-input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.projects-page__search-input::placeholder {
  color: var(--color-text-tertiary);
}

.projects-page__tech-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.projects-page__tech-btn {
  padding: var(--space-xs) var(--space-sm);
  background: none;
  border: 1px solid var(--color-bg-lighter);
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: 
    border-color var(--dur-2) var(--ease-out),
    color var(--dur-2) var(--ease-out),
    background-color var(--dur-2) var(--ease-out);
}

.projects-page__tech-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.projects-page__tech-btn--active {
  background-color: var(--color-accent-tint);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Table */
.projects-page__table-wrapper {
  overflow-x: auto;
}

.projects-page__table {
  width: 100%;
  border-collapse: collapse;
}

.projects-page__th {
  padding: var(--space-md);
  text-align: left;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--color-bg-lighter);
}

.projects-page__th--hide-mobile {
  display: none;
}

@media (min-width: 768px) {
  .projects-page__th--hide-mobile {
    display: table-cell;
  }
}

.projects-page__row {
  transition: background-color var(--dur-2) var(--ease-out);
}

.projects-page__row:hover {
  background-color: var(--color-bg-light);
}

.projects-page__td {
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-bg-lighter);
  vertical-align: middle;
}

.projects-page__year {
  font-size: var(--fs-sm);
}

.projects-page__title-cell {
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
}

.projects-page__tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.projects-page__links-wrapper {
  display: flex;
  gap: var(--space-md);
}

.projects-page__link {
  color: var(--color-text-secondary);
  transition: color var(--dur-2) var(--ease-out);
}

.projects-page__link:hover {
  color: var(--color-accent);
}

/* Empty State */
.projects-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-4xl);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
