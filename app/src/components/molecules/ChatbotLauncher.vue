<template>
  <div class="chatbot-wrapper">
    <!-- Floating launcher button -->
    <button 
      class="chatbot-launcher" 
      :class="{ 'chatbot-launcher--open': isOpen }"
      @click="toggleChat"
      :aria-label="isOpen ? 'Close chat' : 'Open chat'"
      :aria-expanded="isOpen"
      ref="launcherRef"
    >
      <!-- Custom geometric icon: stylized "chat" with angular, techy aesthetic -->
      <div class="chatbot-launcher__icon">
        <!-- Chat icon when closed -->
        <svg 
          v-if="!isOpen" 
          class="chatbot-launcher__svg chatbot-launcher__svg--chat"
          viewBox="0 0 32 32" 
          fill="none"
        >
          <!-- Angular speech bubble shape -->
          <path 
            d="M4 6h24v16H12l-6 6v-6H4V6z" 
            stroke="currentColor" 
            stroke-width="1.5" 
            stroke-linejoin="round"
            fill="none"
          />
          <!-- Geometric dots/signal -->
          <circle cx="11" cy="14" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
          <circle cx="21" cy="14" r="1.5" fill="currentColor"/>
        </svg>
        <!-- Close X when open -->
        <svg 
          v-else 
          class="chatbot-launcher__svg chatbot-launcher__svg--close"
          viewBox="0 0 32 32" 
          fill="none"
        >
          <line x1="10" y1="10" x2="22" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="22" y1="10" x2="10" y2="22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      
      <!-- Pulse animation ring -->
      <span class="chatbot-launcher__pulse" v-if="!isOpen && !hasInteracted"></span>
    </button>

    <!-- Chat panel -->
    <ChatbotPanel :isOpen="isOpen" @close="isOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ChatbotPanel from './ChatbotPanel.vue';
import { gsap, DURATION, EASING, prefersReducedMotion } from '@/animations/gsap';

const isOpen = ref(false);
const hasInteracted = ref(false);
const launcherRef = ref<HTMLElement | null>(null);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  hasInteracted.value = true;
  
  // Store that user has interacted
  localStorage.setItem('chatbot_interacted', 'true');
};

onMounted(() => {
  // Check if user has interacted before
  hasInteracted.value = localStorage.getItem('chatbot_interacted') === 'true';

  // Animate launcher entrance only if motion is allowed
  if (!prefersReducedMotion() && launcherRef.value) {
    // Set initial state
    gsap.set(launcherRef.value, {
      scale: 0,
      opacity: 0,
    });
    
    // Animate to visible
    gsap.to(launcherRef.value, {
      scale: 1,
      opacity: 1,
      duration: DURATION.medium,
      delay: 2, 
      ease: EASING.outBack,
    });
  }
});
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: var(--space-lg);
  right: var(--space-lg);
  z-index: var(--z-modal);
  pointer-events: auto;
}

/* Adjust position on larger screens to avoid social sidebar */
@media (min-width: 1080px) {
  .chatbot-wrapper {
    right: 120px; /* Position left of the social sidebar which is at 40px + some spacing */
  }
}

.chatbot-launcher {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%);
  border: none;
  border-radius: var(--radius-lg);
  color: var(--color-bg);
  cursor: pointer;
  box-shadow: 
    var(--shadow-lg),
    0 0 20px rgba(100, 255, 218, 0.2);
  transition: 
    transform var(--dur-2) var(--ease-out),
    box-shadow var(--dur-2) var(--ease-out);
  /* Ensure visible by default */
  opacity: 1;
  transform: scale(1);
}

.chatbot-launcher:hover {
  transform: scale(1.05);
  box-shadow: 
    var(--shadow-xl),
    0 0 30px rgba(100, 255, 218, 0.3);
}

.chatbot-launcher:active {
  transform: scale(0.98);
}

.chatbot-launcher--open {
  background: var(--color-bg-lighter);
  box-shadow: var(--shadow-md);
}

.chatbot-launcher--open:hover {
  box-shadow: var(--shadow-lg);
}

.chatbot-launcher__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-launcher__svg {
  width: 26px;
  height: 26px;
  transition: transform var(--dur-3) var(--ease-out-back);
}

.chatbot-launcher__svg--chat {
  color: var(--color-bg);
}

.chatbot-launcher--open .chatbot-launcher__svg--close {
  color: var(--color-text-primary);
}

/* Pulse animation for attention */
.chatbot-launcher__pulse {
  position: absolute;
  inset: -4px;
  border-radius: var(--radius-lg);
  background-color: var(--color-accent);
  opacity: 0;
  animation: pulse 2s ease-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0% {
    opacity: 0.4;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}

/* Mobile adjustments */
@media (max-width: 480px) {
  .chatbot-wrapper {
    bottom: var(--space-md);
    right: var(--space-md);
  }

  .chatbot-launcher {
    width: 52px;
    height: 52px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .chatbot-launcher__pulse {
    animation: none;
    display: none;
  }
}
</style>
