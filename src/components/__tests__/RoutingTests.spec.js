import App from '@/App.vue';

import StartView from '@/views/Auth/StartView.vue';
import LoginView from '@/views/Auth/LoginView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import StudentHomeView from '@/views/StudentHomeView.vue';
import InstructorHomeView from '@/views/InstructorHomeView.vue';
import UserProfileView from '@/views/UserProfileView.vue';
import ResultsView from '@/views/ResultsView.vue';
import GradingPageView from '@/views/GradingPageView.vue';
import StatisticPageView from '@/views/StatisticPageView.vue';
import AssignmentPageView from '@/views/AssignmentPageView.vue';
import CreateAssignmentView from '@/views/CreateAssignmentView.vue';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthenticationStore } from '@/stores/Auth';
import flushPromises from 'flush-promises';
import { nextTick } from 'vue';


// Here, we maintain a mutable state for the mock store so that login/logout can update it.
let storeState = {
  isAuthenticated: false,
  userType: 'stu',
};

vi.mock('@/stores/Auth', () => ({
  useAuthenticationStore: vi.fn(() => ({
    get isAuthenticated() {
      return storeState.isAuthenticated;
    },
    get userType() {
      return storeState.userType;
    },
    login: vi.fn((id, username, role) => {
      storeState.isAuthenticated = true;
      storeState.userType = role;
    }),
    logout: vi.fn(() => {
      storeState.isAuthenticated = false;
      storeState.userType = 'stu';
    }),
  })),
}));


const routes = [
  { path: '/', name: 'start', component: StartView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/student', name: 'studenthome', component: StudentHomeView },
  { path: '/instructor', name: 'instructorhome', component: InstructorHomeView },
  { path: '/result/:id', name: 'result', component: ResultsView, props: true },
  { path: '/grading/:quizId/:studentId', name: 'grading', component: GradingPageView, props: true },
  { path: '/statistic/:quizId/:quizName', name: 'statisticpage', component: StatisticPageView, props: true },
  { path: '/assignment/:quizId', name: 'assignmentpage', component: AssignmentPageView, props: true },
  { path: '/createassignment', name: 'createassignment', component: CreateAssignmentView, props: true },
  { path: '/userProfile', name: 'userProfile', component: UserProfileView },
];

describe('Routing Tests', () => {
  let router;
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useAuthenticationStore();

    // Resetting the store state before each test
    storeState.isAuthenticated = false;
    storeState.userType = 'stu';

    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });

    // Navigation guard simulating what we have in router/index.js
    router.beforeEach((to, from, next) => {
      const store = useAuthenticationStore();
    
      if (
        (to.name === 'studenthome' ||
         to.name === 'instructorhome' ||
         to.name === 'createassignment' ||
         to.name === 'result' ||
         to.name === 'assignmentpage' ||
         to.name === 'statisticpage' ||
         to.name === 'grading' ||
         to.name === 'userProfile') &&
        !store.isAuthenticated
      ) {
        next({ name: 'login' });
      } else if (to.name === 'start' && store.isAuthenticated) {
        if (store.userType === 'prof') {
          next({ name: 'instructorhome' });
        } else {
          next({ name: 'studenthome' });
        }
      } else if (
        (to.name === 'studenthome' && store.userType === 'prof') ||
        (to.name === 'result' && store.userType === 'prof') ||
        (to.name === 'assignmentpage' && store.userType === 'prof') ||
        (to.name === 'instructorhome' && store.userType === 'stu') ||
        (to.name === 'grading' && store.userType === 'stu') ||
        (to.name === 'createassignment' && store.userType === 'stu')
      ) {
        // Explicitly prevent navigation or redirect to a known route (in this case 'start')
        next({ name: 'start' });
      } else {
        next();
      }
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
    await flushPromises(); // waits enough for navigation to complete
    expect(router.currentRoute.value.name).toBe('register');
  });

  it('navigates to LoginView when "Login" button is clicked', async () => {
    router.push('/');
    await router.isReady();

    const wrapper = mount(StartView, {
      global: { plugins: [router] },
    });

    await wrapper.find('button.loginBtn').trigger('click');
    await flushPromises(); 
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
    store.login(1, 'student_user', 'stu');
    router.push('/student');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(StudentHomeView).exists()).toBe(true);
  });

  it('navigates to InstructorHomeView for authenticated instructors', async () => {
    store.login(2, 'instructor_user', 'prof');
    router.push('/instructor');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(InstructorHomeView).exists()).toBe(true);
  });

  it('navigates to UserProfileView for authenticated users', async () => {
    store.login(3, 'test_user', 'stu');
    router.push('/userProfile');
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(UserProfileView).exists()).toBe(true);
  });

  it('navigates to ResultsView for an authenticated student', async () => {
    store.login(1, 'student_user', 'stu');
    router.push({ name: 'result', params: { id: 123 } });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(ResultsView).exists()).toBe(true);
  });

  it('prevents an instructor from accessing ResultsView', async () => {
    store.login(2, 'instructor_user', 'prof');
    router.push({ name: 'result', params: { id: 123 } });
    await router.isReady();

    // The route should not be 'result' due to the guard blocking instructors.
    expect(router.currentRoute.value.name).not.toBe('result');
  });

  it('navigates to GradingPageView for an authenticated instructor', async () => {
    store.login(2, 'instructor_user', 'prof');
    router.push({ name: 'grading', params: { quizId: 123, studentId: 456 } });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(GradingPageView).exists()).toBe(true);
  });

  it('prevents a student from accessing GradingPageView', async () => {
    store.login(1, 'student_user', 'stu');
    router.push({ name: 'grading', params: { quizId: 123, studentId: 456 } });
    await router.isReady();

    expect(router.currentRoute.value.name).not.toBe('grading');
  });

  it('navigates to StatisticPageView for an authenticated instructor', async () => {
    store.login(2, 'instructor_user', 'prof');
    router.push({ name: 'statisticpage', params: { quizId: 123, quizName: 'Sample Quiz' } });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(StatisticPageView).exists()).toBe(true);
  });

  it('navigates to AssignmentPageView for an authenticated student', async () => {
    store.login(1, 'student_user', 'stu');
    router.push({ name: 'assignmentpage', params: { quizId: 123 } });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(AssignmentPageView).exists()).toBe(true);
  });

  it('prevents an instructor from accessing AssignmentPageView', async () => {
    store.login(2, 'instructor_user', 'prof');
    router.push({ name: 'assignmentpage', params: { quizId: 123 } });
    await router.isReady();

    expect(router.currentRoute.value.name).not.toBe('assignmentpage');
  });

  it('navigates to CreateAssignmentView for an authenticated instructor', async () => {
    store.login(2, 'instructor_user', 'prof');
    router.push({ name: 'createassignment' });
    await router.isReady();

    const wrapper = mount(App, {
      global: { plugins: [router] },
    });

    expect(wrapper.findComponent(CreateAssignmentView).exists()).toBe(true);
  });

  it('prevents a student from accessing CreateAssignmentView', async () => {
    store.login(1, 'student_user', 'stu');
    router.push({ name: 'createassignment' });
    await router.isReady();

    expect(router.currentRoute.value.name).not.toBe('createassignment');
  });

});

