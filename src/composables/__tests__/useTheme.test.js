import { describe, it, expect, beforeEach, vi } from 'vitest'

async function freshUseTheme() {
  vi.resetModules()
  const mod = await import('../useTheme.js')
  return mod.useTheme()
}

describe('useTheme', () => {
  beforeEach(() => {
    vi.resetModules()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to dark mode', async () => {
    const { isDark } = await freshUseTheme()
    expect(isDark.value).toBe(true)
  })

  it('sets data-theme="dark" on the document element by default', async () => {
    await freshUseTheme()
    // watchEffect runs synchronously in the test environment
    await new Promise(r => setTimeout(r, 10))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('toggle() switches to light mode', async () => {
    const { isDark, toggle } = await freshUseTheme()
    toggle()
    expect(isDark.value).toBe(false)
  })

  it('toggle() switches back to dark mode on second call', async () => {
    const { isDark, toggle } = await freshUseTheme()
    toggle()
    toggle()
    expect(isDark.value).toBe(true)
  })

  it('updates data-theme attribute when toggled', async () => {
    const { toggle } = await freshUseTheme()
    await new Promise(r => setTimeout(r, 10))

    toggle()
    await new Promise(r => setTimeout(r, 10))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')

    toggle()
    await new Promise(r => setTimeout(r, 10))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
