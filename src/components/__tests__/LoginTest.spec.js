import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { mount } from '@vue/test-utils'
import { useAuthenticationStore } from '@/stores/Auth';
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

  it('updates password input on input change', async () => {
    const wrapper = mount(LoginView);

    const input = wrapper.find('[type="password"]');
    await input.setValue('Vitest');

    expect(input.element.value).toBe('Vitest');
  });

  it('updates username input updates submitData', async () => {
    const wrapper = mount(LoginView);

    const input = wrapper.find('[type="text"]');
    await input.setValue('Vitest');

    expect(wrapper.vm.loginData.username).toBe('Vitest');
  });

  it('updates password input updates submitData', async () => {
    const wrapper = mount(LoginView);

    const input = wrapper.find('[type="password"]');
    await input.setValue('Vitest');

    expect(wrapper.vm.loginData.password).toBe('Vitest');
  });
});