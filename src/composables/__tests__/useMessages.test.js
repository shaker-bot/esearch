import { describe, it, expect, beforeEach, vi } from 'vitest'

// Reset the module between tests so the singleton re-initialises from a clean localStorage
async function freshUseMessages() {
  vi.resetModules()
  const mod = await import('../useMessages.js')
  return mod.useMessages()
}

describe('useMessages', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.resetModules()
  })

  it('starts with an empty messages array when localStorage is empty', async () => {
    const { messages } = await freshUseMessages()
    expect(messages.value).toEqual([])
  })

  it('restores messages from localStorage on init', async () => {
    const saved = [{ role: 'user', text: 'hello' }]
    localStorage.setItem('esearch:messages', JSON.stringify(saved))

    const { messages } = await freshUseMessages()
    expect(messages.value).toEqual(saved)
  })

  it('handles corrupted localStorage gracefully', async () => {
    localStorage.setItem('esearch:messages', '{invalid json}}}')
    const { messages } = await freshUseMessages()
    expect(messages.value).toEqual([])
  })

  it('persists new messages to localStorage', async () => {
    const { messages } = await freshUseMessages()
    messages.value.push({ role: 'user', text: 'hi' })

    // Wait for the watcher (nextTick)
    await new Promise(r => setTimeout(r, 10))

    const stored = JSON.parse(localStorage.getItem('esearch:messages'))
    expect(stored).toEqual([{ role: 'user', text: 'hi' }])
  })

  it('clear() empties messages and removes localStorage key', async () => {
    localStorage.setItem('esearch:messages', JSON.stringify([{ role: 'user', text: 'x' }]))

    const { messages, clear } = await freshUseMessages()
    expect(messages.value).toHaveLength(1)

    clear()
    expect(messages.value).toEqual([])
    expect(localStorage.getItem('esearch:messages')).toBeNull()
  })
})
