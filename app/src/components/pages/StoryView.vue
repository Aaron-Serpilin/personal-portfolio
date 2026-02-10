<template>
  <main class="story-page">
    <div class="container">
      <article class="story" ref="storyRef">
        <header class="story__header" ref="headerRef">
          <h1 class="story__title">My Story</h1>
          <p class="story__subtitle">
            From the mountains of Ecuador to building software that matters
          </p>
        </header>

        <div class="story__content" ref="contentRef">
          <section class="story__section">
            <h2 class="story__section-title">Roots</h2>
            <p>
              I was born in Florida in 2004, but my story really begins in Ecuador. When I was 8, 
              my family relocated there, and those formative years in Latin America shaped who I am 
              today. Growing up alongside my mother and my dog, I was raised in a culture that 
              valued warmth, genuine connection, and community — values that still guide everything 
              I build.
            </p>
            <p>
              Two passions defined my teenage years: <strong>football</strong> and <strong>mountaineering</strong>. 
              My grandfather, himself a mountaineer, passed on his love for the mountains to me. 
              Those early experiences on the peaks taught me discipline, resilience, and the profound 
              satisfaction of pushing beyond perceived limits.
            </p>
          </section>

          <section class="story__section">
            <h2 class="story__section-title">The Beginning</h2>
            <p>
              My coding journey started in 2019 with Khan Academy's Introduction to JavaScript — a 
              simple drawing-based course that gave me my first taste of programming logic. That 
              initial spark ignited something. I dove into "Interneting is Hard" to master HTML, CSS, 
              and JavaScript, then completed FullStack Academy's bootcamp in 2020, learning recursion, 
              object-oriented programming, and the foundations that still serve me today.
            </p>
            <p>
              One of my earliest projects was <em>Oversimplified</em> — an attempt to explain complex 
              astrophysics topics to general audiences. It never shipped (the research was overwhelming), 
              but it taught me something important: I loved building things that made complex ideas 
              accessible.
            </p>
            <p>
              I also hosted my first JavaScript workshop for high school friends — one of my first 
              paid gigs. Teaching others solidified my own understanding and showed me the satisfaction 
              of helping people learn.
            </p>
            <blockquote class="story__quote">
              "The best way to learn is to build something you care about."
            </blockquote>
          </section>

          <section class="story__section">
            <h2 class="story__section-title">Education & Independence</h2>
            <p>
              I attended an international high school in Ecuador on scholarship. When COVID-19 hit, 
              rather than struggle with hastily-adapted online programs, I made a deliberate choice: 
              I transferred to a DC-based American online school with years of e-learning experience. 
              That decision ensured I kept learning while many peers struggled to adapt. I graduated 
              with 9 AP courses and a 4.0 GPA.
            </p>
            <p>
              After high school, I moved to Amsterdam to pursue Computer Science at university and 
              begin an independent chapter of my life. The program was heavily theoretical — covering 
              Python, C, C++, Scala, and Assembly — but I supplemented it by running my own business 
              and freelancing to cover rent and tuition since freshman year.
            </p>
          </section>

          <section class="story__section">
            <h2 class="story__section-title">Beyond the Code</h2>
            <p>
              Before fully committing to tech, I interned as a finance assistant at a construction 
              company in Ecuador. Learning taxes, accounting, and what it truly takes to run a 
              business unknowingly laid the foundation for my entrepreneurial mindset.
            </p>
            <p>
              My mountaineering journey continued to evolve. In 2021, I completed my first 5,000m+ 
              summit — a turning point. I went on to climb most of Ecuador's 5K and 6K peaks, 
              aiming to become the youngest person to summit all major Ecuadorian mountains. I 
              stopped short only due to active volcanoes and avalanche risks — learning when to 
              respect nature's limits.
            </p>

            <h3 class="story__subsection-title">Reto Cotopaxi</h3>
            <p>
              I noticed a problem: mountaineering programs in Ecuador were prohibitively expensive 
              in a country with low base salaries. So I created <strong>Reto Cotopaxi</strong> — an 
              affordable, structured training program to help everyday people reach the summit.
            </p>
            <p>
              The program progressed through four peaks: Rucu Pichincha (4,696m), Imbabura (4,640m), 
              Tungurahua (5,023m), and finally Cotopaxi (5,897m). Over 7 months, I guided 
              <strong>250+ participants</strong> and generated <strong>$75,000 in revenue</strong> 
              at just $325 per person.
            </p>
            <blockquote class="story__quote">
              "Helping others reach their dreams alongside you is more fulfilling than reaching them alone."
            </blockquote>

            <h3 class="story__subsection-title">Student Football League</h3>
            <p>
              When I arrived in Amsterdam, I noticed there was no organized 11v11 football for 
              students. So I created a WhatsApp group called "Weekend Football." From that simple 
              idea grew the <strong>Student Football League</strong> — Amsterdam's first organized 
              university football league.
            </p>
            <p>
              Today, SFL has grown to <strong>1,000+ players</strong>, runs months-long tournaments 
              every Sunday, and has generated approximately <strong>€180,000</strong> — all while 
              operating as a non-profit with affordability as a core priority. I handle everything 
              from board leadership and stakeholder relations to financial management and event 
              organization.
            </p>
            <p>
              This was my first true experience running a large-scale organization from the ground 
              up — and it taught me that managing people is the core of managing anything.
            </p>
          </section>

          <section class="story__section">
            <h2 class="story__section-title">Professional Growth</h2>
            <p>
              My professional journey has taken me through diverse roles, each teaching me something 
              essential:
            </p>
            <ul class="story__list">
              <li>
                <strong>Shellshock Inc (2021):</strong> My first corporate experience, learning 
                frontend development and professional workflows alongside senior engineers. I 
                learned that corporate work is a lifestyle, not just a 9-to-5.
              </li>
              <li>
                <strong>Ceilbit (2023):</strong> A web development startup where I worked with 
                Svelte and client acquisition. This role led to a crucial realization: I wanted 
                to build systems with real utility, not just visual appeal.
              </li>
              <li>
                <strong>Hospitality Freelancing (2023-2026):</strong> Across ~40 venues — hotels, 
                festivals, fine-dining restaurants — I developed adaptability, work ethic, and 
                entrepreneurial resilience while supporting my studies.
              </li>
              <li>
                <strong>Storks Robotics Lab (2025-Present):</strong> Started as an AI/ML intern 
                working on autonomous robotic systems for micro-litter collection rovers. My 
                internship evolved into my first Junior AI Software Engineer role, building 
                production-grade AI platforms for clients.
              </li>
            </ul>
            <p>
              In 2024, I entered machine learning through the Zero-To-Mastery PyTorch course. 
              My bachelor's thesis in Spring 2025 became my first major end-to-end ML project — 
              working through data sourcing, feature engineering, model development, and 
              optimization. After that, the floodgates opened, and I began producing multiple 
              technical projects.
            </p>
          </section>

          <section class="story__section">
            <h2 class="story__section-title">What I've Learned</h2>
            <p>
              Each experience has left its mark:
            </p>
            <ul class="story__list">
              <li>
                <strong>From Storks:</strong> Tech is an ever-learning career. Great mentors 
                guide you without doing the work for you.
              </li>
              <li>
                <strong>From Student Football League:</strong> Ideas mean nothing without users. 
                Managing people is the core of managing a company.
              </li>
              <li>
                <strong>From Hospitality:</strong> Consistent hard work earns trust and respect.
              </li>
              <li>
                <strong>From Reto Cotopaxi:</strong> The most meaningful achievements are shared. True leadership is lowering the barrier for others so they can reach their passions alongside you.
              </li>
              <li>
                <strong>From M2ecu:</strong> Running a business is a constant commitment, 
                even outside office hours.
              </li>
            </ul>
          </section>

          <section class="story__section">
            <h2 class="story__section-title">Philosophy</h2>
            <p>
              Over the years, I've developed principles that guide both my code and my life:
            </p>
            <ol class="story__numbered-list">
              <li>
                <strong>Simplicity over complexity.</strong> The best solutions are often the 
                simplest. If something feels complicated, there's usually a better way.
              </li>
              <li>
                <strong>User experience above all.</strong> Technology exists to serve people. 
                Beautiful code means nothing if the end user is frustrated.
              </li>
              <li>
                <strong>Never stop learning.</strong> The field evolves constantly — so must I.
              </li>
              <li>
                <strong>Lifestyle tradeoffs are inevitable.</strong> You can have anything, but 
                not everything. Work ethic and availability define success.
              </li>
            </ol>
          </section>

          <section class="story__section">
            <h2 class="story__section-title">Looking Forward</h2>
            <p>
              My vision is simple: continue intersecting my passions with technology to build 
              real-world value. Whether it's mountaineering data, community platforms, or applied 
              AI — the most meaningful work happens at the intersection of what I love and what 
              creates impact.
            </p>
            <p>
              I'm currently open to meaningful, purpose-driven opportunities where I can contribute 
              my full effort to projects that genuinely matter — not just technically interesting 
              work, but work that helps people.
            </p>
            <p>
              And one more thing: <strong>Mount Everest, 2032.</strong> 🏔️
            </p>
            <p class="story__cta">
              If you've made it this far, thank you for reading. Feel free to 
              <a href="mailto:serpilin.aaron@gmail.com">reach out</a> — I'd love to connect.
            </p>
          </section>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { revealOnScroll, staggerChildren, killScrollTriggers, ScrollTrigger } from '@/animations/gsap';

const storyRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const scrollTriggers: (ScrollTrigger | null)[] = [];

onMounted(() => {
  if (headerRef.value) {
    scrollTriggers.push(revealOnScroll(headerRef.value, { y: 20 }));
  }

  if (contentRef.value) {
    scrollTriggers.push(staggerChildren(contentRef.value, '.story__section', { 
      y: 30, 
      stagger: 0.15,
    }));
  }
});

onUnmounted(() => {
  killScrollTriggers(scrollTriggers);
});
</script>

<style scoped>
.story-page {
  padding-top: calc(var(--nav-height) + var(--space-3xl));
  padding-bottom: var(--space-5xl);
  min-height: 100vh;
}

.story {
  max-width: var(--content-width);
  margin: 0 auto;
}

.story__header {
  text-align: center;
  margin-bottom: var(--space-4xl);
}

.story__title {
  font-size: clamp(var(--fs-3xl), 5vw, var(--fs-5xl));
  color: var(--color-text-primary);
  margin-bottom: var(--space-md);
}

.story__subtitle {
  font-size: var(--fs-lg);
  color: var(--color-text-secondary);
  max-width: 500px;
  margin: 0 auto;
}

.story__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xl);
}

.story__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.story__section-title {
  font-size: var(--fs-2xl);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.story__subsection-title {
  font-size: var(--fs-xl);
  color: var(--color-accent);
  margin-top: var(--space-md);
  margin-bottom: var(--space-xs);
}

.story__section p {
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  font-size: var(--fs-lg);
}

.story__section a {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-color: var(--color-accent-tint);
  text-underline-offset: 3px;
  transition: text-decoration-color var(--dur-2) var(--ease-out);
}

.story__section a:hover {
  text-decoration-color: var(--color-accent);
}

.story__quote {
  position: relative;
  padding: var(--space-xl) var(--space-2xl);
  margin: var(--space-lg) 0;
  font-size: var(--fs-xl);
  font-style: italic;
  color: var(--color-text-primary);
  border-left: 3px solid var(--color-accent);
  background-color: var(--color-bg-light);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.story__list,
.story__numbered-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding-left: var(--space-xl);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
}

.story__list li,
.story__numbered-list li {
  font-size: var(--fs-lg);
}

.story__list li strong,
.story__numbered-list li strong {
  color: var(--color-text-primary);
}

.story__cta {
  padding: var(--space-xl);
  background-color: var(--color-bg-light);
  border-radius: var(--radius-md);
  text-align: center;
  margin-top: var(--space-lg);
}
</style>
