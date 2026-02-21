import { ref, watch } from 'vue'

const STORAGE_KEY = 'esearch:messages'

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Module-level singleton — shared across all consumers
const messages = ref(loadFromStorage())

watch(messages, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })

export function useMessages() {
  function clear() {
    messages.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  return { messages, clear }
}
