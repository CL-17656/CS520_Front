import { createRouter, createWebHistory } from 'vue-router'
import StudentHomeView from '../views/StudentHomeView.vue'
import InstructorHomeView from '../views/InstructorHomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import CoursePageView from '../views/CoursePageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/student',
      name: 'studenthome',
      component: StudentHomeView,
      props: true
    },
    {
      path: '/course',
      name: 'coursepage',
      component: CoursePageView,
      props: true
      
    },
    {
      path: '/instructor',
      name: 'instructorhome',
      component: InstructorHomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }
  ],
})

export default router
