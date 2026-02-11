<template>
  <section class="about section" ref="sectionRef">
    <SectionHeading :level="2" numbered :number="1">About Me</SectionHeading>
    
    <div class="about__content">
      <div class="about__text" ref="textRef">
        <p>
          Hey! I’m <AccentText>Aaron Serpilin</AccentText>. I’m drawn to building things that fill real gaps —
          whether that’s software, communities, or systems that make life a little easier for people.
        </p>

        <p>
          Outside of tech, you’ll usually find me in the mountains, running, kickboxing or around a football pitch.
          Mountaineering and sports have shaped how I approach challenges:
          steady progress, teamwork, and enjoying the process.
        </p>

        <p>
          What drives me most is helping people reach their goals alongside me.
          The projects I’m proudest of started from zero —
          founding a mountaineering program in Ecuador and later building the Student Football League in Amsterdam,
          both created to solve problems I personally felt.
        </p>

        <p>
          I’m ambitious, I work hard, and as I keep growing,
          I try to let consistency and curiosity close any gaps in what I still need to learn.
          That mindset has let me step into unfamiliar territory again and again —
          building initiatives without a roadmap and embracing the steep learning curves in my studies and work.
          I’ve learned to treat uncertainty as an invitation to grow,
          not a barrier to entry.
        </p>

        <p>
          Today I focus on building software that’s useful in the real world,
          blending engineering with the same mindset that guided those initiatives:
          identify the need, learn what’s missing, and build something that works.
        </p>

        <p>Here are some of the technologies I work with:</p>

        <div class="about__skills-categories" ref="skillsRef">
          <div 
            v-for="category in skillCategories" 
            :key="category.title"
            class="about__skill-category"
          >
            <h4 class="about__category-title">{{ category.title }}</h4>
            <ul class="about__skills">
              <li 
                v-for="skill in category.skills" 
                :key="skill" 
                class="about__skill"
              >
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="about__image-wrapper" ref="imageRef">
        <div class="about__carousel">
          <div class="about__image-container">
            <img 
              :src="images[currentImageIndex].src" 
              :alt="images[currentImageIndex].alt" 
              class="about__image"
              loading="lazy"
            />
            <div class="about__image-overlay"></div>
          </div>

          <!-- Navigation Buttons -->
          <button 
            v-if="images.length > 1"
            class="about__carousel-btn about__carousel-btn--prev"
            @click="previousImage"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            v-if="images.length > 1"
            class="about__carousel-btn about__carousel-btn--next"
            @click="nextImage"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <!-- Indicators -->
          <div v-if="images.length > 1" class="about__carousel-indicators">
            <button
              v-for="(_, index) in images"
              :key="index"
              class="about__carousel-indicator"
              :class="{ 'about__carousel-indicator--active': index === currentImageIndex }"
              @click="goToImage(index)"
              :aria-label="`Go to image ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SectionHeading from '../atoms/SectionHeading.vue';
import AccentText from '../atoms/AccentText.vue';
import { revealOnScroll, staggerChildren, killScrollTriggers, ScrollTrigger } from '../../animations/gsap';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'JavaScript/TypeScript', 'C++', 'Shell/Bash']
  },
  {
    title: 'AI & ML',
    skills: ['PyTorch', 'LangChain/LangGraph', 'VLAs/VLMs', 'Foundation Models', 'Weights & Biases']
  },
  {
    title: 'Cloud & Infrastructure',
    skills: ['Google Cloud Platform', 'Docker', 'Cloud Run', 'Cloud Build', 'Pub/Sub', 'Artifact Registry']
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'PGVector', 'Cloud SQL', 'Firestore', 'Firebase']
  },
  {
    title: 'Frameworks & Tools',
    skills: ['FastAPI', 'Vue.js', 'Edge (Nvidia)', 'Raspberry Pi', 'Gaussian Splatting']
  }
];

// Carousel images
const images = [
  { src: '/images/personal/profile.jpg', alt: 'Aaron Serpilin' },
  { src: '/images/personal/hiking.jpg', alt: 'Hiking Antisana 2022' },
  { src: '/images/personal/football.jpg', alt: 'Student Football League match' },
  { src: '/images/personal/Marsik.png', alt: 'Marsik and I, Rucu Pichincha 2022' },
  { src: '/images/personal/running.JPEG', alt: 'Amsterdam Marathon 2024' },
];

const currentImageIndex = ref(0);

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

const previousImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + images.length) % images.length;
};

const goToImage = (index: number) => {
  currentImageIndex.value = index;
};

const sectionRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);
const skillsRef = ref<HTMLElement | null>(null);
const imageRef = ref<HTMLElement | null>(null);

const scrollTriggers: (ScrollTrigger | null)[] = [];

onMounted(() => {
  if (textRef.value) {
    scrollTriggers.push(revealOnScroll(textRef.value, { y: 30 }));
  }

  if (imageRef.value) {
    scrollTriggers.push(revealOnScroll(imageRef.value, { y: 30, delay: 0.2 }));
  }

  if (skillsRef.value) {
    scrollTriggers.push(staggerChildren(skillsRef.value, '.about__skill-category', { y: 10, stagger: 0.1 }));
  }
});

onUnmounted(() => {
  killScrollTriggers(scrollTriggers);
});
</script>

<style scoped>
.about__content {
  display: grid;
  gap: var(--space-3xl);
  margin-top: var(--space-2xl);
}

@media (min-width: 768px) {
  .about__content {
    grid-template-columns: 3fr 2fr;
    gap: var(--space-3xl);
  }
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.about__text p {
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
}

.about__skills-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-lg);
}

@media (max-width: 640px) {
  .about__skills-categories {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}

.about__skill-category {
  background-color: var(--color-bg-light);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-bg-lighter);
  transition: border-color var(--dur-2) var(--ease-out);
}

.about__skill-category:hover {
  border-color: var(--color-accent-tint);
}

.about__category-title {
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--color-accent);
  margin-bottom: var(--space-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.about__skills {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: 0;
  margin: 0;
  list-style: none;
}

.about__skill {
  position: relative;
  padding-left: var(--space-lg);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-text-secondary);
  line-height: var(--lh-normal);
}

.about__skill::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--color-accent);
}

.about__image-wrapper {
  position: relative;
  max-width: 300px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .about__image-wrapper {
    margin: 0;
  }
}

.about__carousel {
  position: relative;
  width: 100%;
}

.about__image-container {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.about__image-container::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-accent);
  border-radius: var(--radius-md);
  transform: translate(15px, 15px);
  z-index: -1;
  transition: transform var(--dur-3) var(--ease-out);
}

.about__image-wrapper:hover .about__image-container::before {
  transform: translate(10px, 10px);
}

.about__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: var(--radius-md);
  filter: grayscale(100%) contrast(1);
  mix-blend-mode: multiply;
  transition: 
    filter var(--dur-3) var(--ease-out),
    opacity var(--dur-3) var(--ease-out);
}

.about__image-wrapper:hover .about__image {
  filter: none;
  mix-blend-mode: normal;
}

.about__image-overlay {
  position: absolute;
  inset: 0;
  background-color: var(--color-accent-tint);
  mix-blend-mode: screen;
  border-radius: var(--radius-md);
  transition: background-color var(--dur-3) var(--ease-out);
}

.about__image-wrapper:hover .about__image-overlay {
  background-color: transparent;
}

/* Carousel Navigation */
.about__carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(17, 34, 64, 0.8);
  border: 1px solid var(--color-accent);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  cursor: pointer;
  z-index: 2;
  transition: 
    background-color var(--dur-2) var(--ease-out),
    transform var(--dur-2) var(--ease-out);
  opacity: 0;
}

.about__carousel:hover .about__carousel-btn {
  opacity: 1;
}

.about__carousel-btn:hover {
  background-color: var(--color-accent-tint);
  transform: translateY(-50%) scale(1.1);
}

.about__carousel-btn--prev {
  left: 10px;
}

.about__carousel-btn--next {
  right: 10px;
}

/* Carousel Indicators */
.about__carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-sm);
  z-index: 2;
}

.about__carousel-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(136, 146, 176, 0.5);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: 
    background-color var(--dur-2) var(--ease-out),
    transform var(--dur-2) var(--ease-out);
}

.about__carousel-indicator:hover {
  background-color: rgba(136, 146, 176, 0.8);
  transform: scale(1.2);
}

.about__carousel-indicator--active {
  background-color: var(--color-accent);
  transform: scale(1.2);
  border-radius: var(--radius-md);
  transition: background-color var(--dur-3) var(--ease-out);
}
</style>
