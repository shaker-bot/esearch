<template>
  <header class="header">
    <div class="logo">e<span>Search</span></div>

    <button class="theme-toggle" @click="toggle" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
      <Transition name="icon" mode="out-in">
        <!-- Moon icon (dark mode active) -->
        <svg v-if="isDark" key="moon" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- Sun icon (light mode active) -->
        <svg v-else key="sun" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </Transition>
    </button>
  </header>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'
const { isDark, toggle } = useTheme()
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px;
  border-bottom: 1px solid var(--border-subtle);
  background-color: var(--bg);
  backdrop-filter: blur(12px);
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

.logo span {
  color: var(--accent);
}

.theme-toggle {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  /* override global transition to keep button snappy */
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.2s ease, transform 0.1s ease !important;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--border-focus);
  background: var(--accent-dim);
}

.theme-toggle:active {
  transform: scale(0.88);
}

/* Icon swap transition */
.icon-enter-active,
.icon-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-enter-from {
  opacity: 0;
  transform: rotate(-30deg) scale(0.7);
}
.icon-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.7);
}
</style>
