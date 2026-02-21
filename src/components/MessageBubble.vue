<template>
  <!-- role="article" + aria-label give each message a distinct identity for AT -->
  <div
    class="msg"
    :class="role"
    role="article"
    :aria-label="ariaLabel"
  >
    <div class="avatar" aria-hidden="true">
      {{ role === 'user' ? 'You' : 'eS' }}
    </div>

    <!-- Typing indicator -->
    <div
      v-if="isTyping"
      class="bubble typing-bubble"
      role="status"
      aria-label="eSearch is typing"
    >
      <span class="dot" aria-hidden="true" />
      <span class="dot" aria-hidden="true" />
      <span class="dot" aria-hidden="true" />
    </div>

    <!-- Echo bubble: render markdown via v-html (sanitized) -->
    <div
      v-else-if="role === 'echo'"
      class="bubble markdown-body"
      v-html="renderedMarkdown"
    />

    <!-- User bubble: plain text -->
    <div v-else class="bubble">{{ text }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.use({ breaks: true, gfm: true })

const props = defineProps({
  role: { type: String, required: true },
  text: { type: String, default: '' },
})

const isTyping = computed(() => props.role === 'echo' && !props.text)

const renderedMarkdown = computed(() => {
  if (!props.text) return ''
  const raw = marked.parse(props.text)
  return DOMPurify.sanitize(raw)
})

const ariaLabel = computed(() => {
  if (isTyping.value) return 'eSearch is typing'
  const author = props.role === 'user' ? 'You' : 'eSearch'
  return `${author}: ${props.text}`
})
</script>

<style scoped>
.msg {
  display: flex;
  gap: 10px;
}

.msg.user {
  flex-direction: row-reverse;
  animation: slideFromRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.msg.echo {
  animation: slideFromLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slideFromRight {
  from { opacity: 0; transform: translateX(20px) scale(0.97); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes slideFromLeft {
  from { opacity: 0; transform: translateX(-20px) scale(0.97); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}

/* Avatar */
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  letter-spacing: -0.3px;
}

.msg.user .avatar {
  background: var(--avatar-user-bg);
  color: var(--avatar-user-text);
}

.msg.echo .avatar {
  background: var(--avatar-echo-bg);
  color: var(--avatar-echo-text);
  border: 1px solid var(--avatar-echo-border);
}

/* Bubble base */
.bubble {
  max-width: 76%;
  padding: 11px 15px;
  border-radius: 18px;
  font-size: 0.94rem;
  line-height: 1.6;
  word-break: break-word;
  box-shadow: var(--shadow-bubble);
  transition: background-color 0.25s ease, border-color 0.25s ease,
              color 0.25s ease, box-shadow 0.25s ease !important;
}

.msg.user .bubble {
  background: var(--user-bubble-bg);
  color: var(--user-bubble-text);
  border-bottom-right-radius: 4px;
  white-space: pre-wrap;
}

.msg.echo .bubble {
  background: var(--echo-bubble-bg);
  color: var(--echo-bubble-text);
  border: 1px solid var(--echo-bubble-border);
  border-bottom-left-radius: 4px;
}

/* ── Markdown styles (inside echo bubbles) ── */
.markdown-body :deep(p) {
  margin-bottom: 0.6em;
}
.markdown-body :deep(p:last-child) {
  margin-bottom: 0;
}
.markdown-body :deep(strong) { font-weight: 650; }
.markdown-body :deep(em)     { font-style: italic; }

.markdown-body :deep(code) {
  background: var(--bg-elevated);
  color: var(--accent);
  padding: 1px 6px;
  border-radius: 5px;
  font-size: 0.875em;
  font-family: "SF Mono", "Fira Code", Consolas, monospace;
}

.markdown-body :deep(pre) {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  padding: 12px 14px;
  border-radius: 10px;
  overflow-x: auto;
  margin: 8px 0;
}

.markdown-body :deep(pre code) {
  background: transparent;
  color: var(--text);
  padding: 0;
  font-size: 0.875em;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.4em;
  margin: 6px 0;
}

.markdown-body :deep(li) { margin: 2px 0; }

.markdown-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.markdown-body :deep(blockquote) {
  border-left: 3px solid var(--border-focus);
  padding-left: 12px;
  color: var(--text-secondary);
  margin: 8px 0;
  font-style: italic;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  font-weight: 650;
  margin: 12px 0 4px;
  color: var(--text);
  line-height: 1.3;
}

.markdown-body :deep(h1) { font-size: 1.15em; }
.markdown-body :deep(h2) { font-size: 1.05em; }
.markdown-body :deep(h3) { font-size: 1em; }

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 10px 0;
}

/* Typing dots */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 14px 18px;
}

.dot {
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dot-color);
  animation: bounce 1s infinite ease-in-out;
  transition: background-color 0.25s ease !important;
}

.dot:nth-child(2) { animation-delay: 0.16s; }
.dot:nth-child(3) { animation-delay: 0.32s; }

@keyframes bounce {
  0%, 75%, 100% { transform: translateY(0);    opacity: 0.6; }
  35%            { transform: translateY(-7px); opacity: 1;   }
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .bubble { max-width: 88%; font-size: 0.9rem; }
}
</style>
