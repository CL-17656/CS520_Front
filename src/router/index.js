import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'studenthome',
      component: StudentHomeView,
    },
    {
      path: '/',
      name: 'instructorhome',
      component: InstructorHomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginView,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})

export default router
