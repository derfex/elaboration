import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import App from './App.vue'

describe('App', (): void => {
  it('renders properly', async (): Promise<void> => {
    const wrapper = mount(App, {})
    expect(wrapper.text()).toContain('Welcome vehicles-registry-front-end 👋')
  })
})
