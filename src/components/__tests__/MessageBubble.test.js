import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageBubble from '../MessageBubble.vue'

describe('MessageBubble', () => {
  describe('user role', () => {
    it('renders the user message text', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'user', text: 'Hello there' } })
      expect(wrapper.text()).toContain('Hello there')
    })

    it('applies the "user" class', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'user', text: 'hi' } })
      expect(wrapper.classes()).toContain('user')
    })

    it('shows "You" in the avatar', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'user', text: 'hi' } })
      expect(wrapper.find('.avatar').text()).toBe('You')
    })

    it('has a descriptive aria-label', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'user', text: 'hello' } })
      expect(wrapper.attributes('aria-label')).toContain('You')
      expect(wrapper.attributes('aria-label')).toContain('hello')
    })
  })

  describe('echo role', () => {
    it('applies the "echo" class', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'echo', text: 'reply' } })
      expect(wrapper.classes()).toContain('echo')
    })

    it('shows "eS" in the avatar', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'echo', text: 'reply' } })
      expect(wrapper.find('.avatar').text()).toBe('eS')
    })

    it('renders markdown — bold text becomes <strong>', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'echo', text: '**bold**' } })
      expect(wrapper.find('strong').exists()).toBe(true)
    })

    it('renders markdown — inline code becomes <code>', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'echo', text: '`code`' } })
      expect(wrapper.find('code').exists()).toBe(true)
    })

    it('has a descriptive aria-label', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'echo', text: 'reply text' } })
      expect(wrapper.attributes('aria-label')).toContain('eSearch')
    })
  })

  describe('typing indicator', () => {
    it('shows typing indicator when echo text is empty', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'echo', text: '' } })
      expect(wrapper.find('.typing-bubble').exists()).toBe(true)
      expect(wrapper.findAll('.dot')).toHaveLength(3)
    })

    it('does NOT show typing indicator for user role with empty text', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'user', text: '' } })
      expect(wrapper.find('.typing-bubble').exists()).toBe(false)
    })

    it('hides typing indicator once text is provided', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'echo', text: 'done' } })
      expect(wrapper.find('.typing-bubble').exists()).toBe(false)
    })

    it('typing indicator has role="status" for screen readers', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'echo', text: '' } })
      expect(wrapper.find('[role="status"]').exists()).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('has role="article"', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'user', text: 'hi' } })
      expect(wrapper.attributes('role')).toBe('article')
    })

    it('avatar is aria-hidden', () => {
      const wrapper = mount(MessageBubble, { props: { role: 'user', text: 'hi' } })
      expect(wrapper.find('.avatar').attributes('aria-hidden')).toBe('true')
    })
  })
})
