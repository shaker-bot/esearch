<template>
  <!-- Skip-to-main for keyboard / screen reader users -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="layout">
    <AppHeader />

    <main id="main-content" class="main" role="main">
      <Transition name="hero">
        <HeroSection v-if="messages.length === 0" />
      </Transition>

      <ChatThread
        v-show="messages.length > 0"
        :messages="messages"
        :busy="waiting"
        ref="threadRef"
      />

      <InputBar :disabled="waiting" @send="handleSend" />

      <p class="hint" aria-hidden="true">
        Press <kbd>Enter</kbd> to send &nbsp;·&nbsp;
        <kbd>Shift+Enter</kbd> for new line
      </p>
    </main>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import AppHeader   from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ChatThread  from './components/ChatThread.vue'
import InputBar    from './components/InputBar.vue'
import { useMessages } from './composables/useMessages.js'

const { messages } = useMessages()
const waiting   = ref(false)
const threadRef = ref(null)

async function handleSend(text) {
  messages.value.push({ role: 'user', text })
  await scrollToBottom()

  waiting.value = true
  messages.value.push({ role: 'echo', text: '' })
  await scrollToBottom()

  setTimeout(async () => {
    messages.value[messages.value.length - 1].text = text
    waiting.value = false
    await scrollToBottom()
  }, 500)
}

async function scrollToBottom() {
  await nextTick()
  threadRef.value?.scrollToBottom()
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 24px;
  overflow: hidden;
}

.hint {
  font-size: 0.76rem;
  color: var(--text-muted);
  text-align: center;
  animation: fadeIn 0.5s ease 0.2s both;
}

kbd {
  background: var(--kbd-bg);
  color: var(--text-secondary);
  padding: 1px 6px;
  border-radius: 5px;
  border: 1px solid var(--kbd-border);
  font-family: inherit;
  font-size: 0.75rem;
}

/* Hero enter/leave — slide up + fade */
.hero-enter-active {
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  position: absolute;
}
.hero-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.hero-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .main {
    padding: 16px 12px;
    gap: 16px;
    justify-content: flex-end;
    padding-bottom: 20px;
  }

  .hint {
    display: none;
  }
}
</style>
