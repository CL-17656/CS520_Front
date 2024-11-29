<script setup>
// import { ref, computed, onMounted } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
// //import { fetchquestions, saveAnswers } from '@/api/AssignmentApi';

// const route = useRoute();
// const router = useRouter();
// const quizId = ref(route.params.quizId || '');
// const course = route.params.course;

// // Timer setup for countdown
// const totalSeconds = ref(2 * 60 * 60); // 2 hours in seconds
// const timer = computed(() => {
//   const hours = Math.floor(totalSeconds.value / 3600);
//   const minutes = Math.floor((totalSeconds.value % 3600) / 60);
//   const seconds = totalSeconds.value % 60;
//   return `${hours}h ${minutes}m ${seconds}s`;
// });

// const startCountdown = () => {
//   const countdownInterval = setInterval(() => {
//     if (totalSeconds.value > 0) {
//       totalSeconds.value--;
//     } else {
//       clearInterval(countdownInterval);
//       alert('Time is up! Submitting your answers...');
//       saveAnswers();
//     }
//   }, 1000);
// };

// // Dynamically fetch questions from the backend
// const assignmentDetail = ref({
//   type: '',
//   name: '',
//   grade: '',
//   isGrade: false,
//   questions: []
// });
// // Fetch questions and start countdown when component is mounted
// onMounted(() => {
//   //fetchquestions();
//   startCountdown();
// });

// // If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
// const courseDetails = computed(() => {
//   return typeof course === 'string' ? JSON.parse(course) : course;
// });

// function statisticpage(temp) {
//   router.push({ name: 'statisticpage' });
// }

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchQuizDetails, submitQuizAnswers } from '@/api/AssignmentApi';

const route = useRoute();
const router = useRouter();

const quizId = route.params.quizId;
const quizDetails = ref(null);
const userAnswers = ref({});
const isLoading = ref(true); // added this to prevent user from interacting with the UI when the quiz is being fetched

// Fetch quiz details
const loadQuizDetails = async () => {
  try {
    const response = await fetchQuizDetails(quizId);
    quizDetails.value = response.data;

    // Initialize userAnswers with empty arrays/strings based on question type
    quizDetails.value.questionDTOs.forEach((question) => { // quizDetails.value.questionDTOs contains an array of question objects fetched from the backend ( id and type)
      userAnswers.value[question.id] = question.type === 1 || question.type === 2 ? [] : '';
    });
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    alert('Failed to load quiz. Please try again.');
    isLoading.value = false;
  }
};

// Submit answers
const submitAnswers = async () => {
  try {
    const postVO = {
      projectId: quizId,
      answer: JSON.stringify(userAnswers.value),
      isDelete: false,
    };
    await submitQuizAnswers(postVO);
    alert('Quiz submitted successfully!');
    router.push('/home'); // Redirect to home or results page
  } catch (error) {
    console.error('Error submitting quiz:', error);
    alert('Failed to submit quiz. Please try again.');
  }
};

onMounted(() => {
  loadQuizDetails();
});
  
</script>


<template>
  <div v-if="isLoading" class="loading">Loading quiz...</div>
  <div v-else class="take-quiz">
    <h1>{{ quizDetails.name }}</h1>
    <p>{{ quizDetails.description }}</p>

    <div v-for="(question, index) in quizDetails.questionDTOs" :key="index" class="question">
      <h3>{{ question.questionTitle }}</h3>
      <p>{{ question.questionDescription }}</p>

      <!-- Single/Multiple Choice -->
      <div v-if="question.type === 1 || question.type === 2">
        <div
          v-for="(option, optIndex) in question.possibleAnswerList"
          :key="optIndex"
        >
          <input
            type="checkbox"
            v-if="question.type === 2"
            :id="'q' + question.id + 'opt' + optIndex"
            :value="option"
            v-model="userAnswers[question.id]"
          />
          <input
            type="radio"
            v-else
            :id="'q' + question.id + 'opt' + optIndex"
            :value="option"
            v-model="userAnswers[question.id]"
          />
          <label :for="'q' + question.id + 'opt' + optIndex">{{ option }}</label>
        </div>
      </div>

      <!-- Fill-in-the-Blank or Essay -->
      <textarea
        v-else
        v-model="userAnswers[question.id]"
        :placeholder="'Enter your answer here...'"
      ></textarea>
    </div>

    <button @click="submitAnswers">Submit</button>
  </div>
</template>

<style scoped>
.take-quiz {
  padding: 20px;
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
}

.question {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>














<template>
  <div class="assignmentpage">
    <div class="assignmentbox">
      <div class="title">Assignment Page {{ assignmentDetail.name }}</div>

      <div class="display-bar">
        <div class="grade">Grade: {{ assignmentDetail.grade }}</div>
        <div class="timer">
        Time Remaining: <span>{{ timer }}</span>
      </div>
        <div class="statistic">
          <button class="statistic-btn" @click="statisticpage">Statistic</button>
        </div>
      </div>

      <div class="question-box">
        <div class="assignment-scroll-bar">
          <li
            class="question-entry"
            v-for="(entry, index) in assignmentDetail.questions"
            :key="index"
          >
            <div class="question">{{ entry.question }}</div>
            <textarea
              v-model="entry.userResponse"
              :placeholder="entry.sampleResponse"
            ></textarea>
          </li>
        </div>
      </div>

      <button class="save-btn" @click="saveAnswers">Save</button>
    </div>
  </div>
</template>



<style scoped>
.assignmentpage {
    padding: 2rem;
}

.title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
}
.assignmentbox{
    width:100%;
    background-color: rgb(42, 148, 39);
    display: flex; 
    flex-direction: column;
    align-items: center; 
    justify-content: center;    
    
}
.display-bar{
    width: 100%;
    height: 50px;
    background-color: yellow;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; /* Ensure proper spacing between elements */
    padding: 0 1rem; /* Add some padding for better layout */
    box-sizing: border-box; /* Include padding in the element's width */
}

.grade{
    font-size: 20px ;
    margin-bottom: 0.5rem;
}
.question-box {
    border-color: 100px black;
    padding: 20px;
    width: 100%;
    height: 1000px;
    background-color: rgb(218, 211, 211);
    margin: auto;
    overflow: scroll;
    scrollbar-color: yellow;
    scrollbar-width: thin;
}

/* .assignment-scroll-bar{

} */

li {
  background-color: #99f0da;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 5px;
  list-style: none;
}

input[type="text"] {
  padding: 0;
  margin: 0;  
  height: 1000px;
  width: 100%; 
  box-sizing: border-box; 
}
.timer {
  position: fixed;
  top: 1rem; 
  right: 1rem; 
  background-color: #f0ad4e; 
  color: white; 
  padding: 0.5rem 1rem; 
  border-radius: 5px; 
  font-size: 1.2rem; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  z-index: 1000; 
}

</style>




