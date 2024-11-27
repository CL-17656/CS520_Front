<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
//import { fetchquestions, saveAnswers } from '@/api/AssignmentApi';

const route = useRoute();
const router = useRouter();
const quizId = ref(route.params.quizId || '');
const course = route.params.course;

// Timer setup for countdown
const totalSeconds = ref(2 * 60 * 60); // 2 hours in seconds
const timer = computed(() => {
  const hours = Math.floor(totalSeconds.value / 3600);
  const minutes = Math.floor((totalSeconds.value % 3600) / 60);
  const seconds = totalSeconds.value % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
});

const startCountdown = () => {
  const countdownInterval = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
    } else {
      clearInterval(countdownInterval);
      alert('Time is up! Submitting your answers...');
      saveAnswers();
    }
  }, 1000);
};

// Dynamically fetch questions from the backend
const assignmentDetail = ref({
  type: '',
  name: '',
  grade: '',
  isGrade: false,
  questions: []
});
// Fetch questions and start countdown when component is mounted
onMounted(() => {
  //fetchquestions();
  startCountdown();
});

// If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
const courseDetails = computed(() => {
  return typeof course === 'string' ? JSON.parse(course) : course;
});

function statisticpage(temp) {
  router.push({ name: 'statisticpage' });
}
</script>


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