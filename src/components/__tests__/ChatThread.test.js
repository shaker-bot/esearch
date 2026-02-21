import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatThread from '../ChatThread.vue'

const sampleMessages = [
  { role: 'user', text: 'Hello' },
  { role: 'echo', text: 'Hello back' },
]

function mountChatThread(props = {}) {
  return mount(ChatThread, {
    props: { messages: [], ...props },
  })
}

describe('ChatThread', () => {
  it('renders without errors when messages array is empty', () => {
    const wrapper = mountChatThread()
    expect(wrapper.find('.thread').exists()).toBe(true)
  })

  it('renders the correct number of MessageBubble components', () => {
    const wrapper = mountChatThread({ messages: sampleMessages })
    // Each MessageBubble renders as an article
    const articles = wrapper.findAll('[role="article"]')
    expect(articles).toHaveLength(sampleMessages.length)
  })

  it('renders user and echo messages in order', () => {
    const wrapper = mountChatThread({ messages: sampleMessages })
    const articles = wrapper.findAll('[role="article"]')
    expect(articles[0].classes()).toContain('user')
    expect(articles[1].classes()).toContain('echo')
  })

  it('has role="log" for screen reader live region', () => {
    const wrapper = mountChatThread()
    expect(wrapper.find('[role="log"]').exists()).toBe(true)
  })

  it('has aria-label on the thread', () => {
    const wrapper = mountChatThread()
    expect(wrapper.find('[role="log"]').attributes('aria-label')).toBeTruthy()
  })

  it('sets aria-busy="true" when busy prop is true', () => {
    const wrapper = mountChatThread({ busy: true })
    expect(wrapper.find('[role="log"]').attributes('aria-busy')).toBe('true')
  })

  it('sets aria-busy="false" when busy prop is false', () => {
    const wrapper = mountChatThread({ busy: false })
    expect(wrapper.find('[role="log"]').attributes('aria-busy')).toBe('false')
  })

  it('exposes scrollToBottom method', () => {
    const wrapper = mountChatThread()
    expect(typeof wrapper.vm.scrollToBottom).toBe('function')
  })

  it('thread is keyboard-focusable (has tabindex)', () => {
    const wrapper = mountChatThread()
    const thread = wrapper.find('[role="log"]')
    expect(thread.attributes('tabindex')).toBe('0')
  })
})
