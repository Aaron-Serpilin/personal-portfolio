<template>
  <div 
    class="chat-message" 
    :class="[
      `chat-message--${role}`,
      { 'chat-message--error': isError }
    ]"
  >
    <div class="chat-message__avatar">
      <!-- User Avatar: Simple geometric person -->
      <svg v-if="role === 'user'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
      </svg>
      <!-- Assistant Avatar: Custom geometric "A" logo -->
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12,2 22,20 2,20"/>
        <line x1="7" y1="14" x2="17" y2="14"/>
      </svg>
    </div>
    <div class="chat-message__content">
      <span class="chat-message__label">{{ role === 'user' ? 'You' : 'Marsik' }}</span>
      <p class="chat-message__text">{{ content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
}

withDefaults(defineProps<Props>(), {
  isError: false,
});
</script>

<style scoped>
.chat-message {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  animation: messageSlideIn var(--dur-3) var(--ease-out);
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-message--user {
  background-color: var(--color-bg-light);
  margin-left: var(--space-lg);
}

.chat-message--assistant {
  background-color: transparent;
  margin-right: var(--space-lg);
}

.chat-message--error {
  background-color: rgba(255, 100, 100, 0.1);
  border: 1px solid rgba(255, 100, 100, 0.3);
}

.chat-message--error .chat-message__text {
  color: #ff6b6b;
}

.chat-message__avatar {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background-color: var(--color-bg-lighter);
}

.chat-message--user .chat-message__avatar {
  color: var(--color-text-secondary);
}

.chat-message--assistant .chat-message__avatar {
  background-color: var(--color-accent-tint);
  color: var(--color-accent);
}

.chat-message__avatar svg {
  width: 16px;
  height: 16px;
}

.chat-message__content {
  flex: 1;
  min-width: 0;
}

.chat-message__label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chat-message--assistant .chat-message__label {
  color: var(--color-accent);
}

.chat-message__text {
  font-size: var(--fs-sm);
  color: var(--color-text-secondary);
  line-height: var(--lh-relaxed);
  white-space: pre-wrap;
  word-break: break-word;
}

.chat-message--user .chat-message__text {
  color: var(--color-text-primary);
}
</style>
