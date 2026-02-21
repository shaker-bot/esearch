import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

// Mock both composables so tests are isolated from module-level singletons
vi.mock('../../composables/useTheme.js', () => ({
  useTheme: vi.fn(() => ({
    isDark: { value: true },
    toggle: vi.fn(),
  })),
}))

vi.mock('../../composables/useMessages.js', () => ({
  useMessages: vi.fn(() => ({
    messages: { value: [] },
    clear: vi.fn(),
  })),
}))

import AppHeader from '../AppHeader.vue'
import { useTheme }    from '../../composables/useTheme.js'
import { useMessages } from '../../composables/useMessages.js'

describe('AppHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the logo text', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('.logo').text()).toContain('eSearch')
  })

  it('renders the theme toggle button', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('[aria-label*="mode"]').exists()).toBe(true)
  })

  it('does NOT show the clear button when there are no messages', () => {
    useMessages.mockReturnValue({ messages: { value: [] }, clear: vi.fn() })
    const wrapper = mount(AppHeader)
    expect(wrapper.find('[aria-label="Clear conversation"]').exists()).toBe(false)
  })

  it('shows the clear button when there are messages', async () => {
    useMessages.mockReturnValue({
      messages: ref([{ role: 'user', text: 'hi' }]),
      clear: vi.fn(),
    })
    const wrapper = mount(AppHeader)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[aria-label="Clear conversation"]').exists()).toBe(true)
  })

  it('calls toggle() when theme button is clicked', async () => {
    const toggle = vi.fn()
    useTheme.mockReturnValue({ isDark: { value: true }, toggle })
    const wrapper = mount(AppHeader)
    await wrapper.find('[aria-label*="mode"]').trigger('click')
    expect(toggle).toHaveBeenCalledOnce()
  })

  it('calls clear() when the clear button is clicked', async () => {
    const clear = vi.fn()
    useMessages.mockReturnValue({
      messages: ref([{ role: 'user', text: 'hi' }]),
      clear,
    })
    const wrapper = mount(AppHeader)
    await wrapper.vm.$nextTick()
    await wrapper.find('[aria-label="Clear conversation"]').trigger('click')
    expect(clear).toHaveBeenCalledOnce()
  })

  it('has role="banner" on the header element', () => {
    const wrapper = mount(AppHeader)
    expect(wrapper.find('[role="banner"]').exists()).toBe(true)
  })
})
