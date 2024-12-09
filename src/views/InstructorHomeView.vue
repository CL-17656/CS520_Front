<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/Auth';
import { logoutUser } from '@/api/AuthApi';
import { onMounted } from 'vue';
import {getAssignmentsByInstructorId, getStudentByAssignmentId, getStudentInfo} from '@/api/InstructorHomeApi'
import { useInstructorHomeStore } from '@/stores/InstructorHomeStore';


const store = useAuthenticationStore();
const instructoreHomeStore = useInstructorHomeStore();
const router = useRouter();

const logoutData = reactive(
  {
    username: "",
  }
);

const quizeData = reactive(
    {
        allQuizInform: [],
        quizes: [

        ]
    }
);

//fetch data when page opens
const initialize = async () => {
  console.log(store.userId);
  try {
    //currently use 1 only for debugging purpose
    const pageData = await getAssignmentsByInstructorId(store.userId, instructoreHomeStore.pageNumber);
    instructoreHomeStore.totalPages = 0;
    console.log(pageData);
    if(pageData.data.count != null) {
      //calculate page number
      instructoreHomeStore.totalPages = Math.ceil(pageData.data.count / 10);
      if(instructoreHomeStore.totalPages == 0) {
        instructoreHomeStore.totalPages = 1;
      }
      //fecth data and make into format for frontend
      for(let i = 0; i < pageData.data.recordList.length; ++i) {
        quizeData.allQuizInform.push({quizId: pageData.data.recordList[i].id, quizName: pageData.data.recordList[i].name});
        const studentTakenQuiz = await getStudentByAssignmentId(pageData.data.recordList[i].id);
        if(studentTakenQuiz.data.count != null) {
          for(let j = 0; j < studentTakenQuiz.data.count; ++j) {
            const additionalStudentData = await getStudentInfo(studentTakenQuiz.data.recordList[j].userId);
            console.log(additionalStudentData)
            quizeData.quizes.push(
            {
              quizId: studentTakenQuiz.data.recordList[j].projectId,
              studentId: studentTakenQuiz.data.recordList[j].userId,
              studentName: additionalStudentData.data.recordList[0].nickname,
              status: studentTakenQuiz.data.recordList[j].status,
              grade: studentTakenQuiz.data.recordList[j].scores,
              isGrade: studentTakenQuiz.data.recordList[j].hasGraded,
            }
          )
          }
        }
      }
    }
    console.log(quizeData);
  }
  catch(error) {
    console.log(error);
  }
};
onMounted(() => initialize());

// Function to grade given quiz id for given student id
function gradeQuiz(quizId, studentId) {
  router.push({ name: 'grading', params:{quizId,studentId} });
}

// Function navigating to statistic page for given quiz id
function viewQuizStats(quizId)
{
  router.push({ name: 'statisticpage', params:{quizId} });
}

//function for creating quiz
function createAssignment()
{
  router.push({name: "createassignment"})
}

//function for logging out
async function logout()
{
  logoutData.username = store.userName;
  try {
    const response = await logoutUser(logoutData);
    console.log(response);

    if(response.flag == true) {
      store.logout();
      console.log(store.isAuthenticated);
      router.push({ name: 'start' });
    }
  } catch (error){
    console.error(error);
  }
}

function nextPage()
{
  if(instructoreHomeStore.pageNumber < instructoreHomeStore.totalPages) {
    instructoreHomeStore.pageNumber += 1;
    location.reload();
  }
}

function previousPage()
{
  if(instructoreHomeStore.pageNumber > 1) {
    instructoreHomeStore.pageNumber -= 1;
    location.reload();
  }
}
</script>

<template>
  <main class="instructor-home">
    <h1 class="title">Instructor Home Page</h1>
    <div>
      <button class="logout-btn" @click="logout()">Logout</button>
      <button class="create-quiz-btn" @click="createAssignment()">Create Assignment</button> 
    </div>
    <!-- For each quiz display following -->
    <section v-for="[arrIndex, quizInform] in Object.entries(quizeData.allQuizInform)" :key="arrIndex" class="quiz-overview">
      <h2>Quiz ID: {{ quizInform.quizId }}</h2>
      <h2>Quiz Name: {{ quizInform.quizName }}</h2>
      <div class="quiz-list">
        <!-- For each submission display following -->
        <div v-for="[key, quiz] in Object.entries(quizeData.quizes.filter(val => val.quizId == quizInform.quizId))" :key="key" class="quiz-card">
            <p>Student ID: {{ quiz.studentId }} </p>
            <p>Student Name: {{ quiz.studentName }} </p>
            <p v-if="quiz.status == 2" >Quiz</p>
            <p v-if="quiz.status == 1" >Questionaire</p>
            <p v-if="quiz.isGrade == 1">Quiz Grade: {{ JSON.parse(quiz.grade)["total"] }}</p>
            <button v-if="quiz.isGrade == 0" @click="gradeQuiz(quiz.quizId, quiz.studentId)">Grade Quiz</button>
        </div>
      </div>
      <button class="view-stat-btn" @click="viewQuizStats(quizInform.quizId)">View Quiz Statistics</button>
    </section>
    <!-- For page number -->
    <section>
      <div class="flex">
        <button class="prev-page-btn" @click="previousPage()">Previous Page</button>
        <h2>Page: {{ instructoreHomeStore.pageNumber }} / {{ instructoreHomeStore.totalPages }}</h2>
        <button class="next-page-btn" @click="nextPage()">Next Page</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.instructor-home {
  font-family: Arial, sans-serif;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.quiz-overview{
  margin-bottom: 2rem;
}

.quiz-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.quiz-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.quiz-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.quiz-card h3 {
  margin: 0 0 0.5rem;
}

.quiz-card p {
  margin: 0.2rem 0;
}

button {
  background-color: #004d4d;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

button:hover {
  background-color: #006666;
}
.next-page-btn {
  margin-left: 1rem;
  font-weight: bold;
}

.prev-page-btn {
  margin-right: 1rem;
  font-weight: bold;
}

.view-stat-btn {
  margin-top: 1rem;
  font-weight: bold;
}

.logout-btn {
  margin-left: 50rem;
  margin-top: 0rem;
  font-weight: bold;
}

.create-quiz-btn {
  margin-left: 45rem;
  margin-top: 1rem;
  font-weight: bold;
}

.flex{
    display:flex;
    justify-content:center;
    align-items:center;
}

input textarea[type="text"] {
  padding: 0; /* Removes extra space inside the input */
  margin: 0;  /* Removes extra space outside the input */
  height: 80px;
  width: 100%; /* Ensures the input takes the full width of the container */
  box-sizing: border-box; /* Ensures padding and border are included in the total width */
}
</style>
