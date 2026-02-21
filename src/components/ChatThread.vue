<template>
  <!--
    role="log" implies aria-live="polite" + aria-relevant="additions text"
    — screen readers will announce new messages automatically.
    tabindex="0" lets keyboard users scroll the thread.
  -->
  <div
    class="thread"
    ref="el"
    role="log"
    aria-label="Conversation"
    :aria-busy="busy"
    tabindex="0"
  >
    <MessageBubble
      v-for="(msg, i) in messages"
      :key="i"
      :role="msg.role"
      :text="msg.text"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageBubble from './MessageBubble.vue'

defineProps({
  messages: { type: Array, required: true },
  busy:     { type: Boolean, default: false },
})

const el = ref(null)

function scrollToBottom() {
  if (el.value) el.value.scrollTop = el.value.scrollHeight
}

defineExpose({ scrollToBottom })
</script>

<style scoped>
.thread {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  max-height: 60vh;
  padding: 4px 2px;
  outline: none;
}

/* Show a subtle focus ring when keyboard-navigating */
.thread:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 4px;
  border-radius: 8px;
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .thread {
    max-height: 65vh;
    gap: 12px;
  }
}
</style>
