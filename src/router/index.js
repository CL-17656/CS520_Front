import { createRouter, createWebHistory } from 'vue-router'
import StudentHomeView from '../views/StudentHomeView.vue'
import InstructorHomeView from '../views/InstructorHomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import StartView from '@/views/Auth/StartView.vue'
import AssignmentPageView from '../views/AssignmentPageView.vue'
import StatisticPageView from '../views/StatisticPageView.vue'
import CreateAssignmentView from '@/views/CreateAssignmentView.vue'
import GradingPageView from '@/views/GradingPageView.vue'
import { useAuthenticationStore } from '@/stores/Auth';
import ResultsView from '@/views/ResultsView.vue'
import UserProfileView from '@/views/UserProfileView.vue'

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
      path: '/grading/:quizId/:studentId',
      name: 'grading',
      component: GradingPageView,
      props: true
    },   
    {
      path: '/statistic/:quizId/:quizName',
      name: 'statisticpage',
      component: StatisticPageView,
      props: true
      
    },
    {
      path: '/assignment/:quizId',
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
    },
    {
      path: '/result/:id',
      name: 'result',
      props: true,
      component: ResultsView,
    },
    {
      path: '/userProfile',
      name: 'userProfile',
      component: UserProfileView,
    }
  ],
})

// added a navigation guard. This is to ensure that only authenticated users can access protected routes(e.g., /student, /instructor)
// if the user is not authenticated (i.e., there is no token in localStorage), we redirect them to the login page.
router.beforeEach((to, from, next) => {

  const store = useAuthenticationStore();
  if ((to.name === 'studenthome' || to.name === 'instructorhome' || to.name === 'createassignment' || to.name === 'result' || to.name === 'assignmentpage' || to.name === 'statisticpage' || to.name === 'grading' || to.name === 'userProfile') && !store.isAuthenticated) {
    next({ name: 'login' }); // Redirect to login if not authenticated
  }
  else if(to.name === 'start' && store.isAuthenticated) {
    if(store.userType == 'prof') {
      next({name: 'instructorhome'});
    }
    else {
      next({name: 'studenthome'});
    }
  }
  else if((to.name === 'studenthome' && store.userType == 'prof') || (to.name === 'result' && store.userType == 'prof') || (to.name ==='assignmentpage' && store.userType == 'prof') || (to.name == 'instructorhome' && store.userType == 'stu') || (to.name == 'grading' && store.userType == 'stu') || (to.name == 'createassignment' && store.userType == 'stu')) {
    //should not visit so do nothing
  }
  else {
    next();
  }
});


export default router
