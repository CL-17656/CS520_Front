import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { mount } from '@vue/test-utils'
import { useAuthenticationStore } from '@/stores/Auth';
//import LoginView from '@/views/Auth/LoginView.vue'
/*
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})*/
import LoginView from '@/views/Auth/LoginView.vue'; 

describe('LoginView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useAuthenticationStore();
  });

  it('updates username input on input change', async () => {
    const wrapper = mount(LoginView);

    const input = wrapper.find('[type="text"]');
    await input.setValue('Vitest');

    expect(input.element.value).toBe('Vitest');
  });
});