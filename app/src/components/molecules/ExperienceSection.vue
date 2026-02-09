<template>
  <section class="experience section" ref="sectionRef">
    <SectionHeading :level="2" numbered :number="2">Where I've Worked</SectionHeading>

    <div class="experience__content">
      <!-- Tabs -->
      <div class="experience__tabs" role="tablist" aria-label="Job tabs" ref="tabsRef">
        <button
          v-for="(job, index) in jobs"
          :key="job.company"
          class="experience__tab"
          :class="{ 'experience__tab--active': activeIndex === index }"
          role="tab"
          :aria-selected="activeIndex === index"
          :aria-controls="`panel-${index}`"
          :id="`tab-${index}`"
          @click="setActiveTab(index)"
          ref="tabButtonsRef"
        >
          {{ job.company }}
        </button>
        <span class="experience__indicator" ref="indicatorRef"></span>
      </div>

      <!-- Panels -->
      <div class="experience__panels">
        <Transition name="fade" mode="out-in">
          <div
            :key="activeIndex"
            class="experience__panel"
            role="tabpanel"
            :id="`panel-${activeIndex}`"
            :aria-labelledby="`tab-${activeIndex}`"
          >
            <h3 class="experience__title">
              {{ activeJob.title }}
              <span class="experience__company">
                @ <AnimatedLink :href="activeJob.url" target="_blank">{{ activeJob.company }}</AnimatedLink>
              </span>
            </h3>
            <p class="experience__range">{{ activeJob.range }}</p>
            <ul class="experience__list">
              <li 
                v-for="(point, idx) in activeJob.points" 
                :key="idx" 
                class="experience__point"
              >
                {{ point }}
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import SectionHeading from '@/components/atoms/SectionHeading.vue';
import AnimatedLink from '@/components/atoms/AnimatedLink.vue';
import { 
  revealOnScroll, 
  animateNavIndicator, 
  killScrollTriggers, 
  ScrollTrigger,
  prefersReducedMotion 
} from '@/animations/gsap';

interface Job {
  company: string;
  title: string;
  url: string;
  range: string;
  points: string[];
}

const jobs: Job[] = [
  {
    company: 'Company A',
    title: 'Senior Software Engineer',
    url: 'https://company-a.com',
    range: 'January 2023 - Present',
    points: [
      'Deliver high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Ev):ergive, and Consumers International',
      'Work alongside creative directors to lead the research, development, and architecture of technical solutions to fulfill business requirements',
      'Collaborate with designers, project managers, and other engineers to transform creative concepts into production realities for clients and stakeholders',
      'Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship',
    ],
  },
  {
    company: 'Company B',
    title: 'Software Engineer',
    url: 'https://company-b.com',
    range: 'May 2021 - December 2022',
    points: [
      'Developed and maintained code for in-house and client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery',
      'Manually tested sites in various browsers and mobile devices to ensure cross-browser compatibility and responsiveness',
      'Clients included JetBlue, Lov):ell, US):AA, Liberty Mutual, and more',
    ],
  },
  {
    company: 'Startup',
    title: 'Full Stack Developer',
    url: 'https://startup.com',
    range: 'July 2019 - April 2021',
    points: [
      'Developed and shipped highly interactive web applications for Apple Music using Ember.js',
      'Built and shipped the Apple Music Extension for VS Code',
      "Architected and implemented the front-end of Apple Music's embeddable web player widget",
      "Contributed to Shazam's core web application modernization efforts",
    ],
  },
  {
    company: 'Agency',
    title: 'Junior Developer',
    url: 'https://agency.com',
    range: 'May 2018 - June 2019',
    points: [
      'Designed and developed responsive websites for small businesses and startups',
      'Worked directly with clients to understand requirements and deliver solutions',
      'Gained experience with version control, agile methodologies, and collaborative development',
    ],
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const tabsRef = ref<HTMLElement | null>(null);
const indicatorRef = ref<HTMLElement | null>(null);
const tabButtonsRef = ref<HTMLButtonElement[]>([]);
const activeIndex = ref(0);

const scrollTriggers: (ScrollTrigger | null)[] = [];

const activeJob = computed(() => jobs[activeIndex.value]);

const setActiveTab = (index: number) => {
  activeIndex.value = index;
};

const updateIndicator = () => {
  if (!indicatorRef.value || !tabButtonsRef.value[activeIndex.value]) return;
  animateNavIndicator(indicatorRef.value, tabButtonsRef.value[activeIndex.value]);
};

watch(activeIndex, async () => {
  await nextTick();
  updateIndicator();
});

onMounted(async () => {
  if (sectionRef.value) {
    scrollTriggers.push(revealOnScroll(sectionRef.value, { y: 30 }));
  }

  await nextTick();
  updateIndicator();

  // Handle resize
  window.addEventListener('resize', updateIndicator);
});

onUnmounted(() => {
  killScrollTriggers(scrollTriggers);
  window.removeEventListener('resize', updateIndicator);
});
</script>

<style scoped>
.experience__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  margin-top: var(--space-2xl);
}

@media (min-width: 700px) {
  .experience__content {
    flex-direction: row;
  }
}

/* Tabs */
.experience__tabs {
  position: relative;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 700px) {
  .experience__tabs {
    flex-direction: column;
    min-width: 140px;
    border-left: 2px solid var(--color-bg-lighter);
  }
}

.experience__tab {
  display: flex;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background: none;
  border: none;
  border-bottom: 2px solid var(--color-bg-lighter);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--color-text-secondary);
  white-space: nowrap;
  cursor: pointer;
  transition: 
    color var(--dur-2) var(--ease-out),
    background-color var(--dur-2) var(--ease-out);
}

@media (min-width: 700px) {
  .experience__tab {
    border-bottom: none;
    border-left: 2px solid transparent;
    margin-left: -2px;
  }
}

.experience__tab:hover,
.experience__tab--active {
  color: var(--color-accent);
  background-color: var(--color-accent-tint);
}

/* Indicator */
.experience__indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: left var(--dur-3) var(--ease-out-expo), width var(--dur-3) var(--ease-out-expo);
}

@media (min-width: 700px) {
  .experience__indicator {
    top: 0;
    bottom: auto;
    left: 0;
    width: 2px;
    height: auto;
    transition: top var(--dur-3) var(--ease-out-expo), height var(--dur-3) var(--ease-out-expo);
  }
}

/* Panels */
.experience__panels {
  flex: 1;
  min-height: 350px;
}

.experience__panel {
  padding-top: var(--space-sm);
}

.experience__title {
  font-size: var(--fs-xl);
  font-weight: var(--fw-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
}

.experience__company {
  color: var(--color-accent);
}

.experience__range {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-lg);
}

.experience__list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.experience__point {
  position: relative;
  padding-left: var(--space-xl);
  margin-bottom: var(--space-md);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
}

.experience__point::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-2) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
