import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// Lazyloading
const HomeView = () => import("@/pages/HomeView.vue");
const ProjectsView = () => import("@/pages/ProjectsView.vue");
const StoryView = () => import("@/pages/StoryView.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home | Aaron Serpilin",
      description: "Junior Software Engineer.",
    },
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsView,
    meta: {
      title: "Projects | Aaron Serpilin",
      description: "A collection of projects I've worked on.",
    },
  },
  {
    path: "/story",
    name: "Story",
    component: StoryView,
    meta: {
      title: "My Story | Aaron Serpilin",
      description: "My journey through code, entrepreneurial quests, and constant new challenges.",
    },
  },
  // Catch-all 404 redirect to home
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If user navigates back/forward, restore position
    if (savedPosition) {
      return savedPosition;
    }
    // Scroll to top on route change
    return { top: 0, behavior: "smooth" };
  },
});

// Update document title on route change
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string;
  if (title) {
    document.title = title;
  }
  next();
});

export default router;