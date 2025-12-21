import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import router from '../router'
import App from './App.vue'

describe('App', (): void => {
  it('renders properly', async (): Promise<void> => {
    const wrapper = mount(App, { global: { plugins: [router] } })
    await router.isReady()
    expect(wrapper.text()).toBeTruthy()
  })
})
