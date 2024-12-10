import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthenticationStore } from '@/stores/Auth';
import App from '@/App.vue';

// Import all views
import StartView from '@/views/Auth/StartView.vue';
import LoginView from '@/views/Auth/LoginView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import StudentHomeView from '@/views/StudentHomeView.vue';
import InstructorHomeView from '@/views/InstructorHomeView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
import routes from '@/router';

describe('Routing Tests', () => {
  let router;
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAuthenticationStore();

    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });

  it('navigates to StartView by default', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(StartView).exists()).toBe(true);
  });

  it('navigates to RegisterView when "Register" button is clicked', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(StartView, {
      global: { plugins: [router] },
    });

    await wrapper.find('button.registerBtn').trigger('click');
    expect(router.currentRoute.value.name).toBe('register');
  });

  it('navigates to LoginView when "Login" button is clicked', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(StartView, {
      global: { plugins: [router] },
    });

    await wrapper.find('button.loginBtn').trigger('click');
    expect(router.currentRoute.value.name).toBe('login');
  });

  it('redirects unauthenticated users to LoginView when accessing protected routes', async () => {
    router.push('/student');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(router.currentRoute.value.name).toBe('login');
  });

  it('navigates to StudentHomeView for authenticated students', async () => {
    store.login(1, 'student_user', 'stu'); // Mock login for student
    router.push('/student');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(StudentHomeView).exists()).toBe(true);
  });

  it('navigates to InstructorHomeView for authenticated instructors', async () => {
    store.login(2, 'instructor_user', 'prof'); // Mock login for instructor
    router.push('/instructor');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(InstructorHomeView).exists()).toBe(true);
  });

  it('navigates to UserProfileView for authenticated users', async () => {
    store.login(3, 'test_user', 'stu'); // Mock login for student
    router.push('/userProfile');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(UserProfileView).exists()).toBe(true);
  });

  it('redirects to the correct home page after logout', async () => {
    store.login(1, 'student_user', 'stu'); // Mock login for student
    router.push('/student');
    await router.isReady();

    const wrapper = shallowMount(StudentHomeView, {
      global: { plugins: [router] },
    });

    await wrapper.find('button.logout-btn').trigger('click');
    expect(router.currentRoute.value.name).toBe('start');
  });

  it('redirects instructor to the correct home page after logout', async () => {
    store.login(2, 'instructor_user', 'prof'); // Mock login for instructor
    router.push('/instructor');
    await router.isReady();

    const wrapper = shallowMount(InstructorHomeView, {
      global: { plugins: [router] },
    });

    await wrapper.find('button.logout-btn').trigger('click');
    expect(router.currentRoute.value.name).toBe('start');
  });


  // Results View
  it('navigates to ResultsView for an authenticated student', async () => {
    store.login(1, 'student_user', 'stu'); // Mock login for student
    router.push({ name: 'result', params: { id: 123 } });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(ResultsView).exists()).toBe(true);
  });

  it('prevents an instructor from accessing ResultsView', async () => {
    store.login(2, 'instructor_user', 'prof'); // Mock login for instructor
    router.push({ name: 'result', params: { id: 123 } });
    await router.isReady();

    expect(router.currentRoute.value.name).not.toBe('result');
  });

  // Grading Page View
  it('navigates to GradingPageView for an authenticated instructor', async () => {
    store.login(2, 'instructor_user', 'prof'); // Mock login for instructor
    router.push({ name: 'grading', params: { quizId: 123, studentId: 456 } });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(GradingPageView).exists()).toBe(true);
  });

  it('prevents a student from accessing GradingPageView', async () => {
    store.login(1, 'student_user', 'stu'); // Mock login for student
    router.push({ name: 'grading', params: { quizId: 123, studentId: 456 } });
    await router.isReady();

    expect(router.currentRoute.value.name).not.toBe('grading');
  });

  // Statistics Page View
  it('navigates to StatisticPageView for an authenticated instructor', async () => {
    store.login(2, 'instructor_user', 'prof'); // Mock login for instructor
    router.push({ name: 'statisticpage', params: { quizId: 123, quizName: 'Sample Quiz' } });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(StatisticPageView).exists()).toBe(true);
  });

  it('prevents a student from accessing StatisticPageView', async () => {
    store.login(1, 'student_user', 'stu'); // Mock login for student
    router.push({ name: 'statisticpage', params: { quizId: 123, quizName: 'Sample Quiz' } });
    await router.isReady();

    expect(router.currentRoute.value.name).not.toBe('statisticpage');
  });

  // Assignment Page View
  it('navigates to AssignmentPageView for an authenticated student', async () => {
    store.login(1, 'student_user', 'stu'); // Mock login for student
    router.push({ name: 'assignmentpage', params: { quizId: 123 } });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(AssignmentPageView).exists()).toBe(true);
  });

  it('prevents an instructor from accessing AssignmentPageView', async () => {
    store.login(2, 'instructor_user', 'prof'); // Mock login for instructor
    router.push({ name: 'assignmentpage', params: { quizId: 123 } });
    await router.isReady();

    expect(router.currentRoute.value.name).not.toBe('assignmentpage');
  });

  // Create Assignment View
  it('navigates to CreateAssignmentView for an authenticated instructor', async () => {
    store.login(2, 'instructor_user', 'prof'); // Mock login for instructor
    router.push({ name: 'createassignment' });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(CreateAssignmentView).exists()).toBe(true);
  });

  it('prevents a student from accessing CreateAssignmentView', async () => {
    store.login(1, 'student_user', 'stu'); // Mock login for student
    router.push({ name: 'createassignment' });
    await router.isReady();

    expect(router.currentRoute.value.name).not.toBe('createassignment');
  });

  // Logout Tests
  it('logs out a student and redirects to StartView', async () => {
    store.login(1, 'student_user', 'stu'); // Mock login for student
    router.push('/student');
    await router.isReady();

    const wrapper = shallowMount(StudentHomeView, {
      global: { plugins: [router] },
    });

    await wrapper.find('button.logout-btn').trigger('click');
    expect(router.currentRoute.value.name).toBe('start');
  });

  it('logs out an instructor and redirects to StartView', async () => {
    store.login(2, 'instructor_user', 'prof'); // Mock login for instructor
    router.push('/instructor');
    await router.isReady();

    const wrapper = shallowMount(InstructorHomeView, {
      global: { plugins: [router] },
    });

    await wrapper.find('button.logout-btn').trigger('click');
    expect(router.currentRoute.value.name).toBe('start');
  });
});

