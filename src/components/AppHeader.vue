<template>
  <header class="header" role="banner">
    <div class="logo" aria-label="eSearch home">e<span>Search</span></div>

    <div class="actions">
      <!-- Clear conversation -->
      <Transition name="fade-btn">
        <button
          v-if="messages.length > 0"
          class="action-btn"
          aria-label="Clear conversation"
          title="Clear conversation"
          @click="clear"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </Transition>

      <!-- Theme toggle -->
      <button
        class="action-btn"
        @click="toggle"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <Transition name="icon" mode="out-in">
          <svg v-if="isDark" key="moon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                  stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else key="sun" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </Transition>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useTheme }    from '../composables/useTheme.js'
import { useMessages } from '../composables/useMessages.js'

const { isDark, toggle }  = useTheme()
const { messages, clear } = useMessages()
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-subtle);
  background-color: var(--bg);
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo {
  font-size: 1.15rem;
  font-weight: 750;
  letter-spacing: -0.5px;
  color: var(--text);
}

.logo span { color: var(--accent); }

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.1s ease !important;
}

.action-btn:hover {
  color: var(--accent);
  border-color: var(--border-focus);
  background: var(--accent-dim);
}

.action-btn:active { transform: scale(0.88); }

/* Icon swap */
.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-enter-from { opacity: 0; transform: rotate(-30deg) scale(0.7); }
.icon-leave-to   { opacity: 0; transform: rotate(30deg) scale(0.7); }

/* Clear button appear/disappear */
.fade-btn-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.fade-btn-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.fade-btn-enter-from   { opacity: 0; transform: scale(0.75); }
.fade-btn-leave-to     { opacity: 0; transform: scale(0.75); }

/* ── Mobile ── */
@media (max-width: 640px) {
  .header { padding: 10px 14px; }
}
</style>
