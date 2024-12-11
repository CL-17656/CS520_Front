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
    const wrapper = mount(RegisterView);

    const input = wrapper.find('[placeholder="Enter Password"]');
    await input.setValue('Vitest');

    expect(wrapper.vm.registerData.password).toBe('Vitest');
  });

  it('updates submitData on confirm password input change', async () => {
    const wrapper = mount(RegisterView);

    const input = wrapper.find('[placeholder="Confirm Password"]');
    await input.setValue('Vitest');

    expect(wrapper.vm.registerData.passwordCon).toBe('Vitest');
  });

  it('error correctly displayed for username on empty submit', async () => {
    const wrapper = mount(RegisterView)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.errors.username.length).toBe(1)
    expect(wrapper.vm.errors.username[0]).toBe('Must enter an username')
  })

  it('error correctly displayed for password on empty submit', async () => {
    const wrapper = mount(RegisterView)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.errors.password.length).toBe(1)
    expect(wrapper.vm.errors.password[0]).toBe('Must enter a password')
  })

  it('error correctly displayed for confirm password on empty submit', async () => {
    const wrapper = mount(RegisterView)
    await wrapper.find('form').trigger('submit.prevent')
    //no error displayed for confirmation when empty submit as the confirmation and password are the same
    expect(wrapper.vm.errors.passwordCon.length).toBe(0)
  })

  it('error correctly displayed for account type on empty submit', async () => {
    const wrapper = mount(RegisterView)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.errors.accountType.length).toBe(1)
    expect(wrapper.vm.errors.accountType[0]).toBe('Must select an account type')
  })

  it('error correctly displayed for invitation code on empty submit', async () => {
    const wrapper = mount(RegisterView)
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.errors.invitationCode.length).toBe(1)
    expect(wrapper.vm.errors.invitationCode[0]).toBe('Must Enter an invitation code')
  })


  it('error correctly displayed for password and confirmation not matching', async () => {
    const wrapper = mount(RegisterView)
    const inputPassword = wrapper.find('[placeholder="Enter Password"]');
    await inputPassword.setValue('A');
    const inputCon = wrapper.find('[placeholder="Confirm Password"]');
    await inputCon.setValue('B');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.vm.errors.passwordCon.length).toBe(1);
    expect(wrapper.vm.errors.passwordCon[0]).toBe('Passwords do not match');
  })
});