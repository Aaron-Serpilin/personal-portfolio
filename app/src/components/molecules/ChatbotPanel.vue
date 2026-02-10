<template>
  <Transition name="panel">
    <div v-if="isOpen" class="chatbot-panel" ref="panelRef">
      <!-- Header -->
      <header class="chatbot-panel__header">
        <div class="chatbot-panel__header-info">
          <div class="chatbot-panel__avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12,2 22,20 2,20"/>
              <line x1="7" y1="14" x2="17" y2="14"/>
            </svg>
          </div>
          <div>
            <h3 class="chatbot-panel__title">Ask about Aaron</h3>
            <p class="chatbot-panel__subtitle">Learn about my work & experience</p>
          </div>
        </div>
        <button 
          class="chatbot-panel__close" 
          @click="$emit('close')"
          aria-label="Close chat"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </header>

      <!-- Messages -->
      <div class="chatbot-panel__messages" ref="messagesRef">
        <!-- Welcome message if no messages -->
        <div v-if="messages.length === 0" class="chatbot-panel__welcome">
          <div class="chatbot-panel__welcome-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12,2 22,20 2,20"/>
              <line x1="7" y1="14" x2="17" y2="14"/>
            </svg>
          </div>
          <h4 class="chatbot-panel__welcome-title">Hi! I'm Marsik, Aaron's AI assistant</h4>
          <p class="chatbot-panel__welcome-text">
            Ask me anything about Aaron's experience, projects, skills, or background. 
            I only answer based on his portfolio documents.
          </p>
          <div class="chatbot-panel__suggestions">
            <button 
              v-for="suggestion in suggestions" 
              :key="suggestion"
              class="chatbot-panel__suggestion"
              @click="sendSuggestion(suggestion)"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>

        <!-- Message list -->
        <ChatMessage
          v-for="(message, index) in messages"
          :key="index"
          :role="message.role"
          :content="message.content"
          :isError="message.isError"
        />

        <!-- Typing indicator -->
        <div v-if="isTyping" class="chatbot-panel__typing">
          <div class="chatbot-panel__typing-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12,2 22,20 2,20"/>
              <line x1="7" y1="14" x2="17" y2="14"/>
            </svg>
          </div>
          <div class="chatbot-panel__typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <!-- Input -->
      <form class="chatbot-panel__input-area" @submit.prevent="handleSubmit">
        <input
          v-model="inputMessage"
          type="text"
          class="chatbot-panel__input"
          placeholder="Ask about Aaron's experience..."
          :disabled="isTyping"
          maxlength="500"
          ref="inputRef"
        />
        <button 
          type="submit" 
          class="chatbot-panel__send"
          :disabled="!inputMessage.trim() || isTyping"
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>

      <!-- Rate limit warning -->
      <Transition name="fade">
        <div v-if="rateLimitWarning" class="chatbot-panel__rate-limit">
          {{ rateLimitWarning }}
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import ChatMessage from './ChatMessage.vue';
import { API_BASE_URL } from '../../config.ts'; // Endpoint

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: []
}>();

const messages = ref<Message[]>([]);
const inputMessage = ref('');
const isTyping = ref(false);
const rateLimitWarning = ref('');
const sessionId = ref('');

const messagesRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

const suggestions = [
  "What projects has Aaron worked on?",
  "Tell me about Aaron's background",
  "What technologies does Aaron use?",
];

// Generate or retrieve session ID
onMounted(() => {
  let storedSessionId = localStorage.getItem('chatbot_session_id');
  if (!storedSessionId) {
    storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('chatbot_session_id', storedSessionId);
  }
  sessionId.value = storedSessionId;
});

// Auto-scroll to bottom when new messages arrive
watch(
  () => messages.value.length,
  async () => {
    await nextTick();
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
    }
  }
);

// Focus input when panel opens
watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      await nextTick();
      inputRef.value?.focus();
    }
  }
);

const sendSuggestion = (suggestion: string) => {
  inputMessage.value = suggestion;
  handleSubmit();
};

const handleSubmit = async () => {
  const message = inputMessage.value.trim();
  if (!message || isTyping.value) return;

  // Add user message
  messages.value.push({
    role: 'user',
    content: message,
  });

  inputMessage.value = '';
  isTyping.value = true;
  rateLimitWarning.value = '';

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId.value,
        user_message: message,
      }),
    });

    if (response.status === 429) {
      rateLimitWarning.value = 'Too many requests. Please wait a moment before trying again.';
      messages.value.push({
        role: 'assistant',
        content: "You're sending messages too quickly. Please wait a moment and try again.",
        isError: true,
      });
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    messages.value.push({
      role: 'assistant',
      content: data.assistant_message,
    });

    if (data.rate_limited) {
      rateLimitWarning.value = 'You are approaching the rate limit. Please slow down.';
      setTimeout(() => {
        rateLimitWarning.value = '';
      }, 5000);
    }
  } catch (error) {
    console.error('Chat error:', error);
    messages.value.push({
      role: 'assistant',
      content: "Sorry, I couldn't connect to the server. Please try again later.",
      isError: true,
    });
  } finally {
    isTyping.value = false;
  }
};
</script>

<style scoped>
.chatbot-panel {
  position: fixed;
  bottom: calc(70px + var(--space-lg));
  right: var(--space-lg);
  width: 380px;
  max-width: calc(100vw - var(--space-xl));
  max-height: 550px;
  background-color: var(--color-bg);
  border: 1px solid var(--color-bg-lighter);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  z-index: var(--z-modal);
  overflow: hidden;
}

/* Panel transitions */
.panel-enter-active,
.panel-leave-active {
  transition: 
    opacity var(--dur-3) var(--ease-out),
    transform var(--dur-3) var(--ease-out-back);
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Header */
.chatbot-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--color-bg-lighter);
  background-color: var(--color-bg-light);
}

.chatbot-panel__header-info {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.chatbot-panel__avatar {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent-tint);
  border-radius: var(--radius-md);
  color: var(--color-accent);
}

.chatbot-panel__avatar svg {
  width: 20px;
  height: 20px;
}

.chatbot-panel__title {
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
}

.chatbot-panel__subtitle {
  font-size: var(--fs-xs);
  color: var(--color-text-tertiary);
  margin: 0;
}

.chatbot-panel__close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: 
    color var(--dur-2) var(--ease-out),
    background-color var(--dur-2) var(--ease-out);
}

.chatbot-panel__close:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-lighter);
}

.chatbot-panel__close svg {
  width: 18px;
  height: 18px;
}

/* Messages area */
.chatbot-panel__messages {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  min-height: 300px;
}

/* Welcome state */
.chatbot-panel__welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-xl);
  height: 100%;
}

.chatbot-panel__welcome-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent-tint);
  border-radius: var(--radius-lg);
  color: var(--color-accent);
  margin-bottom: var(--space-md);
}

.chatbot-panel__welcome-icon svg {
  width: 28px;
  height: 28px;
}

.chatbot-panel__welcome-title {
  font-size: var(--fs-lg);
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm);
}

.chatbot-panel__welcome-text {
  font-size: var(--fs-sm);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  max-width: 280px;
  margin-bottom: var(--space-lg);
}

.chatbot-panel__suggestions {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  width: 100%;
}

.chatbot-panel__suggestion {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-bg-lighter);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--fs-xs);
  color: var(--color-text-secondary);
  cursor: pointer;
  text-align: left;
  transition: 
    border-color var(--dur-2) var(--ease-out),
    color var(--dur-2) var(--ease-out);
}

.chatbot-panel__suggestion:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Typing indicator */
.chatbot-panel__typing {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
}

.chatbot-panel__typing-avatar {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent-tint);
  border-radius: var(--radius-sm);
  color: var(--color-accent);
}

.chatbot-panel__typing-avatar svg {
  width: 16px;
  height: 16px;
}

.chatbot-panel__typing-dots {
  display: flex;
  gap: 4px;
}

.chatbot-panel__typing-dots span {
  width: 6px;
  height: 6px;
  background-color: var(--color-text-tertiary);
  border-radius: 50%;
  animation: typingBounce 1.4s ease-in-out infinite;
}

.chatbot-panel__typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.chatbot-panel__typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingBounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-4px);
  }
}

/* Input area */
.chatbot-panel__input-area {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-top: 1px solid var(--color-bg-lighter);
  background-color: var(--color-bg-light);
}

.chatbot-panel__input {
  flex: 1;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-bg);
  border: 1px solid var(--color-bg-lighter);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--fs-sm);
  color: var(--color-text-primary);
  transition: border-color var(--dur-2) var(--ease-out);
}

.chatbot-panel__input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.chatbot-panel__input::placeholder {
  color: var(--color-text-tertiary);
}

.chatbot-panel__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chatbot-panel__send {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent);
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-bg);
  cursor: pointer;
  transition: 
    background-color var(--dur-2) var(--ease-out),
    transform var(--dur-2) var(--ease-out);
}

.chatbot-panel__send:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
  transform: scale(1.05);
}

.chatbot-panel__send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chatbot-panel__send svg {
  width: 18px;
  height: 18px;
}

/* Rate limit warning */
.chatbot-panel__rate-limit {
  position: absolute;
  bottom: 70px;
  left: var(--space-md);
  right: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  background-color: rgba(50, 40, 30, 0.95);
  border: 1px solid rgba(255, 180, 80, 0.5);
  border-radius: var(--radius-sm);
  font-size: var(--fs-xs);
  color: #ffd699;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-2) var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .chatbot-panel {
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    max-height: 100vh;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
}
</style>
