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
            <div 
              v-for="(position, posIdx) in activeJob.positions" 
              :key="posIdx"
              class="experience__position"
              :class="{ 'experience__position--multiple': activeJob.positions.length > 1 }"
            >
              <h3 class="experience__title">
                {{ position.title }}
                <span class="experience__company">
                  @ <AnimatedLink :href="activeJob.url" target="_blank">{{ activeJob.company }}</AnimatedLink>
                </span>
              </h3>
              <p class="experience__range">{{ position.range }} • {{ position.location }}</p>
              <ul class="experience__list">
                <li 
                  v-for="(point, idx) in position.points" 
                  :key="idx" 
                  class="experience__point"
                >
                  {{ point }}
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import SectionHeading from '../atoms/SectionHeading.vue';
import AnimatedLink from '../atoms/AnimatedLink.vue';
import { 
  revealOnScroll, 
  animateNavIndicator, 
  killScrollTriggers, 
  ScrollTrigger
} from '../../animations/gsap';

interface Position {
  title: string;
  range: string;
  location: string;
  points: string[];
}

interface Job {
  company: string;
  url: string;
  positions: Position[];
}

const jobs: Job[] = [
  {
    company: 'Storks Robotics Lab',
    url: 'https://www.linkedin.com/company/storks-ai/posts/?feedView=all',
    positions: [
      {
        title: 'Junior AI Software Engineer',
        range: 'December 2025 - Present',
        location: 'Amsterdam, Netherlands',
        points: [
          'Architected and deployed a production RAG platform for niche research groups, processing thousands of documents through automated Pub/Sub pipelines with Google Search Engine API integration',
          'Built full-stack platform for Student Football League using FastAPI, PostgreSQL, and Firestore to automate scheduling, player management, and statistics for 1000+ players',
          'Designed scalable cloud architectures on GCP using Cloud Run, Cloud Build, Artifact Registry, and Cloud SQL with Docker containerization',
          'Developed Gemini-powered agent pipelines for document triage and semantic extraction stored in PostgreSQL with PGVector for semantic retrieval',
          'Managed production vs development environments and delivered client-facing AI systems while maintaining code quality and system reliability'
        ]
      },
      {
        title: 'AI/ML Intern',
        range: 'July 2025 - December 2025',
        location: 'Amsterdam, Netherlands',
        points: [
          'Developed autonomous robotic systems for micro-litter collection rovers in Amsterdam, training SO101 robotic arms using Hugging Face Lerobot library and reinforcement learning',
          'Fine-tuned ACT and SmolVLA foundation models for autonomous object manipulation, creating custom datasets hosted on Hugging Face',
          'Deployed and trained models on edge devices (Nvidia Jetson, Raspberry Pi) via SSH, optimizing for constrained hardware environments',
          'Researched VLA and VLM architectures through academic papers, applying theoretical knowledge to practical robotics applications',
          'Completed coursework in agentic AI and AI system design, transitioning from theoretical knowledge to hands-on embodied AI deployment'
        ]
      }
    ]
  },
  {
    company: 'Student Football League',
    url: 'https://sfleague.nl/',
    positions: [
      {
        title: 'Founder & President',
        range: 'September 2022 - Present',
        location: 'Amsterdam, Netherlands',
        points: [
          'Founded and scaled Amsterdam\'s first organized university football league from zero to 1000+ players, generating ≈€180,000 in revenue',
          'Negotiated access to municipal and club-owned football pitches, building partnerships with stakeholders and securing sustainable funding',
          'Built custom software platform to automate league operations including scheduling, player management, statistics tracking, and standings calculation',
          'Led multi-member board and coordinated large-scale tournaments with hundreds of participants, managing finances, legal registration, and governance',
          'Demonstrated entrepreneurial leadership by identifying a gap in student sports infrastructure and building a sustainable community-driven organization'
        ],
      }
    ]
  },
  {
    company: 'Hospitality Freelancing',
    url: '#',
    positions: [
      {
        title: 'Freelance Hospitality Professional',
        range: 'December 2023 - January 2026',
        location: 'Amsterdam, Netherlands',
        points: [
          'Built freelance business working across ~40 diverse hospitality venues (hotels, festivals, fine dining, bars, cafes) in roles including chef, bartender, waiter, and event staff',
          'Demonstrated rapid adaptability and reliability in high-pressure environments, consistently securing new clients through professional communication and work ethic',
          'Developed entrepreneurial resilience and self-marketing skills while managing independent client acquisition',
          'Maintained consistent work quality across vastly different team structures and operational demands while supporting studies'
        ],
      }
    ]
  },
  {
    company: 'Ceilbit',
    url: 'https://www.linkedin.com/company/ceilbit/',
    positions: [
      {
        title: 'Web Development Intern',
        range: 'May 2023 - July 2023',
        location: 'Quito, Ecuador',
        points: [
          'Contributed to startup platform development using Svelte, developing frontend components and collaborating in larger codebases',
          'Assisted with customer outreach and deal acquisition, balancing technical work with business development',
          'Gained exposure to startup development workflows and client-facing communication in fast-paced environment'
        ],
      }
    ]
  },
  {
    company: 'Reto Cotopaxi',
    url: '#',
    positions: [
      {
        title: 'Founder & Program Lead',
        range: 'December 2021 - August 2022',
        location: 'Quito, Ecuador',
        points: [
          'Founded and led mountaineering training program preparing 250+ beginners to summit Cotopaxi (5,897m), generating ≈$75,000 revenue in 7 months',
          'Designed multi-stage training curriculum and provided technical climbing instruction, managing all logistics, travel coordination, and safety protocols',
          'Identified accessibility gap in Ecuador\'s hiking community and built mission-driven solution from ground up',
          'Developed pricing strategy, marketing campaigns, and community management while leading participants through extreme environments',
          'First major entrepreneurial venture demonstrating ability to build organizations around shared goals and manage risk in high-stakes situations'
        ],
      },
      {
        title: 'Program Collaborator',
        range: 'November 2021 - April 2022',
        location: 'Ecuador',
        points: [
          'Collaborated with Juventud Latam youth development nonprofit to promote mountaineering among young people',
          'Expanded nonprofit revenue streams through mountaineering initiatives, aligning entrepreneurial projects with impact goals',
          'Participated in interviews and awareness campaigns to increase youth engagement in outdoor activities',
          'Helped design and execute outreach programs, learning to balance mission-driven work with sustainable business models'
        ],
      }
    ]
  },
  {
    company: 'Shellshock Inc',
    url: 'https://www.linkedin.com/company/shellshock-inc-/',
    positions: [
      {
        title: 'Frontend Development Intern',
        range: 'July 2021 - November 2021',
        location: 'Miami, USA',
        points: [
          'Built multiple production websites using React, JavaScript, CSS, Firebase, and Firestore at American web agency',
          'Completed structured web development coursework, establishing frontend engineering fundamentals',
          'Collaborated with professional developers in corporate workflows, learning professional teamwork and development practices',
          'Foundational role that established technical skills leading to later software engineering positions'
        ],
      }
    ]
  },
  {
    company: 'M2ecu',
    url: 'https://www.linkedin.com/company/m2ecu/',
    positions: [
      {
        title: 'Finance Intern',
        range: 'April 2019 - April 2020',
        location: 'Quito, Ecuador',
        points: [
          'Supported accounting and purchasing operations at construction company, managing tax and accounting data entry',
          'Structured and interlinked complex financial spreadsheets, developing foundational organizational and spreadsheet systems',
          'Assisted with procurement, logistics, and on-site operations alongside CEO, gaining early people management exposure',
          'Built business fundamentals and financial skills that later supported entrepreneurial ventures and operational leadership'
        ],
      }
    ]
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

.experience__position {
  margin-bottom: var(--space-2xl);
}

.experience__position:last-child {
  margin-bottom: 0;
}

.experience__position--multiple {
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-bg-lighter);
}

.experience__position--multiple:last-child {
  border-bottom: none;
  padding-bottom: 0;
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
