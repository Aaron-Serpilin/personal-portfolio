import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

// Animation Tokens 

export const EASING = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  outExpo: 'expo.out',
  outBack: 'back.out(1.7)',
  spring: 'elastic.out(1, 0.5)',
  smooth: 'power4.out',
} as const;

export const DURATION = {
  fast: 0.15,
  short: 0.2,
  normal: 0.3,
  medium: 0.4,
  long: 0.5,
  slow: 0.6,
  slower: 0.8,
  slowest: 1,
} as const;

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  slower: 0.2,
} as const;

// Reduced motion

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Scroll reveal

interface RevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  end?: string;
  markers?: boolean;
  scrub?: boolean | number;
  toggleActions?: string;
  once?: boolean;
}

export const revealOnScroll = (
  element: Element | Element[] | string,
  options: RevealOptions = {}
): ScrollTrigger | null => {
  if (prefersReducedMotion()) {
    // Immediately show elements if reduced motion is preferred
    gsap.set(element, { opacity: 1, y: 0, x: 0 });
    return null;
  }

  const {
    y = 30,
    x = 0,
    duration = DURATION.medium,
    delay = 0,
    ease = EASING.out,
    start = 'top 85%',
    end = 'bottom 15%',
    markers = false,
    toggleActions = 'play none none none',
    once = true,
  } = options;

  // Initial state
  gsap.set(element, { opacity: 0, y, x });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element as Element,
      start,
      end,
      markers,
      toggleActions,
      once,
    },
  });

  tl.to(element, {
    opacity: 1,
    y: 0,
    x: 0,
    duration,
    delay,
    ease,
  });

  return ScrollTrigger.getAll().pop() || null;
};

// Stagger children animation

interface StaggerOptions {
  y?: number;
  x?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  start?: string;
  once?: boolean;
}

export const staggerChildren = (
  parent: Element | string,
  selector: string,
  options: StaggerOptions = {}
): ScrollTrigger | null => {
  if (prefersReducedMotion()) {
    const children = typeof parent === 'string' 
      ? document.querySelectorAll(`${parent} ${selector}`)
      : parent.querySelectorAll(selector);
    gsap.set(children, { opacity: 1, y: 0, x: 0 });
    return null;
  }

  const {
    y = 20,
    x = 0,
    duration = DURATION.normal,
    stagger = STAGGER.normal,
    delay = 0,
    ease = EASING.out,
    start = 'top 85%',
    once = true,
  } = options;

  const parentEl = typeof parent === 'string' ? document.querySelector(parent) : parent;
  if (!parentEl) return null;

  const children = parentEl.querySelectorAll(selector);
  if (children.length === 0) return null;

  // Set initial state
  gsap.set(children, { opacity: 0, y, x });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: parentEl,
      start,
      once,
    },
  });

  tl.to(children, {
    opacity: 1,
    y: 0,
    x: 0,
    duration,
    stagger,
    delay,
    ease,
  });

  return ScrollTrigger.getAll().pop() || null;
};

// Fade in

export const fadeIn = (
  element: Element | Element[] | string,
  options: { duration?: number; delay?: number; ease?: string } = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 });
    return null;
  }

  const { duration = DURATION.normal, delay = 0, ease = EASING.out } = options;

  gsap.set(element, { opacity: 0 });

  return gsap.to(element, {
    opacity: 1,
    duration,
    delay,
    ease,
  });
};

// Slide in

type SlideDirection = 'up' | 'down' | 'left' | 'right';

export const slideIn = (
  element: Element | Element[] | string,
  direction: SlideDirection = 'up',
  options: { distance?: number; duration?: number; delay?: number; ease?: string } = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, x: 0, y: 0 });
    return null;
  }

  const { distance = 30, duration = DURATION.medium, delay = 0, ease = EASING.out } = options;

  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const { x, y } = directions[direction];

  gsap.set(element, { opacity: 0, x, y });

  return gsap.to(element, {
    opacity: 1,
    x: 0,
    y: 0,
    duration,
    delay,
    ease,
  });
};

// Hover

export const createHoverEffect = (
  element: Element,
  options: {
    scale?: number;
    y?: number;
    duration?: number;
  } = {}
): { enter: () => void; leave: () => void } => {
  const { scale = 1.02, y = -2, duration = DURATION.short } = options;

  const enter = () => {
    if (prefersReducedMotion()) return;
    gsap.to(element, {
      scale,
      y,
      duration,
      ease: EASING.out,
    });
  };

  const leave = () => {
    if (prefersReducedMotion()) return;
    gsap.to(element, {
      scale: 1,
      y: 0,
      duration,
      ease: EASING.out,
    });
  };

  return { enter, leave };
};

// Underline sweep

export const createUnderlineSweep = (
  element: Element,
  underlineEl: Element,
  options: { duration?: number; ease?: string } = {}
): { enter: () => void; leave: () => void } => {
  const { duration = DURATION.normal, ease = EASING.outExpo } = options;

  gsap.set(underlineEl, { scaleX: 0, transformOrigin: 'left center' });

  const enter = () => {
    if (prefersReducedMotion()) {
      gsap.set(underlineEl, { scaleX: 1 });
      return;
    }
    gsap.to(underlineEl, { scaleX: 1, duration, ease });
  };

  const leave = () => {
    if (prefersReducedMotion()) {
      gsap.set(underlineEl, { scaleX: 0 });
      return;
    }
    gsap.set(underlineEl, { transformOrigin: 'right center' });
    gsap.to(underlineEl, {
      scaleX: 0,
      duration,
      ease,
      onComplete: () => {
        gsap.set(underlineEl, { transformOrigin: 'left center' });
      },
    });
  };

  return { enter, leave };
};

// Page transition

export const pageEnter = (
  element: Element,
  done?: () => void
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    done?.();
    return null;
  }

  gsap.set(element, { opacity: 0, y: 20 });

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: DURATION.medium,
    ease: EASING.out,
    onComplete: done,
  });
};

export const pageLeave = (
  element: Element,
  done?: () => void
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 0 });
    done?.();
    return null;
  }

  return gsap.to(element, {
    opacity: 0,
    y: -10,
    duration: DURATION.short,
    ease: EASING.inOut,
    onComplete: done,
  });
};

// Header animations

export const createHeaderScrollAnimation = (
  headerEl: Element,
  options: { hideOffset?: number; showOffset?: number } = {}
): (() => void) => {
  const { hideOffset = 5, showOffset = 5 } = options;
  
  let lastScrollY = 0;
  let ticking = false;

  const updateHeader = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    if (prefersReducedMotion()) {
      // Just handle background change without animation
      if (currentScrollY > 50) {
        (headerEl as HTMLElement).style.backgroundColor = 'var(--color-bg)';
        (headerEl as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
      } else {
        (headerEl as HTMLElement).style.backgroundColor = 'transparent';
        (headerEl as HTMLElement).style.boxShadow = 'none';
      }
    } else {
      if (delta > hideOffset && currentScrollY > 100) {
        // Scrolling down - hide header
        gsap.to(headerEl, {
          y: '-100%',
          duration: DURATION.normal,
          ease: EASING.out,
        });
      } else if (delta < -showOffset || currentScrollY < 100) {
        // Scrolling up - show header
        gsap.to(headerEl, {
          y: '0%',
          duration: DURATION.normal,
          ease: EASING.out,
        });
      }

      // Background on scroll
      if (currentScrollY > 50) {
        gsap.to(headerEl, {
          backgroundColor: 'rgba(10, 25, 47, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px -10px rgba(2, 12, 27, 0.7)',
          duration: DURATION.normal,
        });
      } else {
        gsap.to(headerEl, {
          backgroundColor: 'transparent',
          backdropFilter: 'blur(0px)',
          boxShadow: 'none',
          duration: DURATION.normal,
        });
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
};

// Nav indicator animation

export const animateNavIndicator = (
  indicator: Element,
  target: Element,
  options: { duration?: number; ease?: string } = {}
): void => {
  const { duration = DURATION.normal, ease = EASING.outExpo } = options;
  
  const targetRect = target.getBoundingClientRect();
  const parentRect = target.parentElement?.getBoundingClientRect();

  if (!parentRect) return;

  const left = targetRect.left - parentRect.left;
  const width = targetRect.width;

  if (prefersReducedMotion()) {
    gsap.set(indicator, { left, width });
    return;
  }

  gsap.to(indicator, {
    left,
    width,
    duration,
    ease,
  });
};

// Cleanup 

export const killScrollTriggers = (triggers: (ScrollTrigger | null)[]): void => {
  triggers.forEach((trigger) => {
    if (trigger) {
      trigger.kill();
    }
  });
};

export const refreshScrollTrigger = (): void => {
  ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger };