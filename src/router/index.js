import { createRouter, createWebHistory } from 'vue-router'
import StudentHomeView from '../views/StudentHomeView.vue'
import InstructorHomeView from '../views/InstructorHomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import CoursePageView from '../views/CoursePageView.vue'
import StartView from '@/views/Auth/StartView.vue'
import AssignmentPageView from '../views/AssignmentPageView.vue'
import StatisticPageView from '../views/StatisticPageView.vue'
import CreateAssignmentView from '@/views/CreateAssignmentView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component:StartView,
      props: true
    },
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
      path: '/statistic',
      name: 'statisticpage',
      component: StatisticPageView,
      props: true
      
    },
    {
      path: '/assignment',
      name: 'assignmentpage',
      component:AssignmentPageView,
      props: true
    },
    {
      path: '/createassignment',
      name: 'createassignment',
      component:CreateAssignmentView,
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

// added a navigation guard. This is to ensure that only authenticated users can access protected routes(e.g., /student, /instructor)
// if the user is not authenticated (i.e., there is no token in localStorage), we redirect them to the login page.
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  if ((to.name === 'studenthome' || to.name === 'instructorhome') && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router
