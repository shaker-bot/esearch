import { ref, watchEffect } from 'vue'

// Module-level singleton so all components share one theme state
const isDark = ref(true)

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
})

export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value
  }
  return { isDark, toggle }
}
