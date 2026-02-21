<template>
  <div class="input-wrap" :class="{ focused }">
    <textarea
      ref="textareaEl"
      v-model="draft"
      rows="1"
      placeholder="Message eSearch…"
      @input="autoResize"
      @keydown.enter.exact.prevent="submit"
      @focus="focused = true"
      @blur="focused = false"
    />
    <button
      class="send-btn"
      :class="{ active: sending }"
      :disabled="!draft.trim() || disabled"
      aria-label="Send"
      @click="submit"
    >
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 13V3M3 8l5-5 5 5"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

defineProps({
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['send'])

const draft      = ref('')
const focused    = ref(false)
const sending    = ref(false)
const textareaEl = ref(null)

function autoResize() {
  const el = textareaEl.value
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 160) + 'px'
}

async function submit() {
  const text = draft.value.trim()
  if (!text) return

  sending.value = true
  setTimeout(() => { sending.value = false }, 200)

  emit('send', text)
  draft.value = ''

  await nextTick()
  textareaEl.value.style.height = 'auto'
  textareaEl.value.focus()
}
</script>

<style scoped>
.input-wrap {
  width: 100%;
  max-width: 720px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: 18px;
  display: flex;
  align-items: flex-end;
  padding: 12px 14px;
  gap: 10px;
  /* override global to add box-shadow */
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease !important;
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

.input-wrap.focused {
  border-color: var(--border-focus);
  box-shadow: var(--shadow-input);
}

textarea {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 0.94rem;
  line-height: 1.6;
  resize: none;
  max-height: 160px;
  overflow-y: auto;
  font-family: inherit;
  /* override global transition — color only */
  transition: color 0.25s ease !important;
}

textarea::placeholder {
  color: var(--text-placeholder);
}

.send-btn {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: none;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* override global — keep transform snappy */
  transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.12s ease !important;
}

.send-btn:disabled {
  background: var(--bg-elevated);
  color: var(--text-muted);
  opacity: 0.6;
  cursor: default;
}

.send-btn:not(:disabled):hover {
  background: var(--accent-hover);
}

.send-btn:not(:disabled):active,
.send-btn.active {
  transform: scale(0.84);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
