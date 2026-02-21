import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InputBar from '../InputBar.vue'

function mountInputBar(props = {}) {
  return mount(InputBar, { props })
}

describe('InputBar', () => {
  it('renders a textarea and send button', () => {
    const wrapper = mountInputBar()
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('send button is disabled when textarea is empty', () => {
    const wrapper = mountInputBar()
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('send button becomes enabled after typing', async () => {
    const wrapper = mountInputBar()
    await wrapper.find('textarea').setValue('hello')
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })

  it('send button is disabled when the disabled prop is true', async () => {
    const wrapper = mountInputBar({ disabled: true })
    await wrapper.find('textarea').setValue('hello')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('emits "send" with the trimmed text on button click', async () => {
    const wrapper = mountInputBar()
    await wrapper.find('textarea').setValue('  hello world  ')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('send')).toBeTruthy()
    expect(wrapper.emitted('send')[0]).toEqual(['hello world'])
  })

  it('clears the textarea after sending', async () => {
    const wrapper = mountInputBar()
    const textarea = wrapper.find('textarea')
    await textarea.setValue('test message')
    await wrapper.find('button').trigger('click')
    expect(textarea.element.value).toBe('')
  })

  it('emits "send" on Enter key (not Shift+Enter)', async () => {
    const wrapper = mountInputBar()
    await wrapper.find('textarea').setValue('enter test')
    await wrapper.find('textarea').trigger('keydown.enter')
    expect(wrapper.emitted('send')).toBeTruthy()
  })

  it('does NOT emit "send" on Shift+Enter', async () => {
    const wrapper = mountInputBar()
    await wrapper.find('textarea').setValue('shift enter test')
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: true })
    expect(wrapper.emitted('send')).toBeFalsy()
  })

  it('textarea has an accessible label', () => {
    const wrapper = mountInputBar()
    const textarea = wrapper.find('textarea')
    // Either aria-label or a linked <label> must be present
    const hasAriaLabel = textarea.attributes('aria-label')
    const hasId = textarea.attributes('id')
    expect(hasAriaLabel || hasId).toBeTruthy()
  })

  it('send button has an aria-label', () => {
    const wrapper = mountInputBar()
    expect(wrapper.find('button').attributes('aria-label')).toBeTruthy()
  })
})
