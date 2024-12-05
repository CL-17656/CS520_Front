<script setup>
import { ref } from 'vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthenticationStore } from '@/stores/Auth';
import { logoutUser } from '@/api/AuthApi';
import { onMounted } from 'vue';
import {getAssignmentsByInstructorId, getStudentByAssignmentId} from '@/api/InstructorHomeApi'

const store = useAuthenticationStore();
const router = useRouter();

const logoutData = reactive(
  {
    username: "",
  }
);

//Front end data structure with sample data
/*
const quizeData = reactive(
    {
        allQuizIds: [1, 200, 500],
        quizes: [
          { quizId: 1, 
            studentId: 3,
            status: "2",
            name: "New Quiz 1",
            grade: "100",
            isGrade: false,
          },
          { quizId: 1, 
            studentId: 5,
            status: "2",
            name: "New Quiz 2",
            grade: "100",
            isGrade: true,
          },
          { quizId: 200, 
            studentId: 7,
            status: "2",
            name: "New Quiz 3",
            grade: "100",
            isGrade: false,
          },
          { quizId: 500, 
            studentId: 9,
            status: "1",
            name: "New Quiz 4",
            grade: "100",
            isGrade: true,
          },
        ]
    }
);*/
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
    const pageData = await getAssignmentsByInstructorId(store.userId);
    console.log(pageData);
    if(pageData.data.count != null) {
      for(let i = 0; i < pageData.data.recordList.length; ++i) {
        quizeData.allQuizInform.push({quizId: pageData.data.recordList[i].id, quizName: pageData.data.recordList[i].name});
        const studentTakenQuiz = await getStudentByAssignmentId(pageData.data.recordList[i].id);
        console.log(studentTakenQuiz)
        if(studentTakenQuiz.data.count != null) {
          for(let j = 0; j < studentTakenQuiz.data.count; ++j) {
            //console.log(studentTakenQuiz.data.recordList[j].hasGraded)
            quizeData.quizes.push(
            {
              quizId: studentTakenQuiz.data.recordList[j].projectId,
              studentId: studentTakenQuiz.data.recordList[j].userId,
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
  alert("grading quiz " + quizId + " for student " + studentId);
}

// Function navigating to statistic page for given quiz id
function viewQuizStats(quizId)
{
  alert("view stats for quiz " + quizId);
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
            <p v-if="quiz.status == 2" >Quiz</p>
            <p v-if="quiz.status == 1" >Questionaire</p>
            <p v-if="quiz.isGrade == 1">Quiz Grade: {{ quiz.grade }}</p>
            <button v-if="quiz.isGrade == 0" @click="gradeQuiz(quiz.quizId, quiz.studentId)">Grade Quiz</button>
        </div>
      </div>
      <button class="view-stat-btn" @click="viewQuizStats(quizInform.quizId)">View Quiz Statistics</button>
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
</style>
