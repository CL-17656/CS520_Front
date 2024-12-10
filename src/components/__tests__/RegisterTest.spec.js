import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { mount } from '@vue/test-utils'
import { useAuthenticationStore } from '@/stores/Auth';
import LoginView from '@/views/Auth/LoginView.vue'; 
import RegisterView from '@/views/Auth/RegisterView.vue';

describe('RegisterView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useAuthenticationStore();
  });

  it('updates invitation code input on input change', async () => {
    const wrapper = mount(RegisterView);

    const input = wrapper.find('[placeholder="Enter invitationCode"]');
    await input.setValue('Vitest');

    expect(input.element.value).toBe('Vitest');
  });

  it('updates username input on input change', async () => {
    const wrapper = mount(RegisterView);

    const input = wrapper.find('[placeholder="Enter Username"]');
    await input.setValue('Vitest');

    expect(input.element.value).toBe('Vitest');
  });

  it('updates password input on input change', async () => {
    const wrapper = mount(RegisterView);

    const input = wrapper.find('[placeholder="Enter Password"]');
    await input.setValue('Vitest');

    expect(input.element.value).toBe('Vitest');
  });

  it('updates password confirmation input on input change', async () => {
    const wrapper = mount(RegisterView);

    const input = wrapper.find('[placeholder="Confirm Password"]');
    await input.setValue('Vitest');

    expect(input.element.value).toBe('Vitest');
  });

  it('updates submitData on username input change', async () => {
    const wrapper = mount(RegisterView);

    const input = wrapper.find('[placeholder="Enter Username"');
    await input.setValue('Vitest');

    expect(wrapper.vm.registerData.username).toBe('Vitest');
  });

  it('updates submitData on password input change', async () => {
    const wrapper = mount(LoginView);

    const input = wrapper.find('[type="password"]');
    await input.setValue('Vitest');

    expect(wrapper.vm.loginData.password).toBe('Vitest');
  });

  it('error correctly displayed for username on empty submit', async () => {
    const wrapper = mount(LoginView)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.errors.username.length).toBe(1)
    expect(wrapper.vm.errors.username[0]).toBe('Must enter an username')
  })

  it('error correctly displayed for password on empty submit', async () => {
    const wrapper = mount(LoginView)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.errors.password.length).toBe(1)
    expect(wrapper.vm.errors.password[0]).toBe('Must enter a password')
  })

  it('error correctly displayed for only empty username submit', async () => {
    const wrapper = mount(LoginView)

    const input = wrapper.find('[type="password"]');
    await input.setValue('Vitest');

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.errors.username.length).toBe(1)
    expect(wrapper.vm.errors.username[0]).toBe('Must enter an username')
    expect(wrapper.vm.errors.password.length).toBe(0)
  })

  it('error correctly displayed for only empty password submit', async () => {
    const wrapper = mount(LoginView)

    const input = wrapper.find('[type="text"]');
    await input.setValue('Vitest');

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.errors.username.length).toBe(0)
    expect(wrapper.vm.errors.password.length).toBe(1)
    expect(wrapper.vm.errors.password[0]).toBe('Must enter a password')
  })
});