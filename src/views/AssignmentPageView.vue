<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchquestions, saveAnswers} from '@/api/AssignmentApi';

const route = useRoute();
const router = useRouter();
const quizId = ref(route.params.quizId || '');
const course = route.params.course;// Access the passed course from the route params

// If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
const courseDetails = computed(() => {
  return typeof course === 'string' ? JSON.parse(course) : course;
});


// Dynamically fetch questions from the backend
const assignmentDetail = ref({
  type: '',
  name: '',
  grade: '',
  isGrade: false,
  questions: []
});

onMounted(() => {
  fetchquestions();
});


function statisticpage(temp){
    router.push({name:'statisticpage'})
}
</script>

<template>
  <div class="assignmentpage">
    <div class="assignmentbox">
      <div class="title">Assignment Page{{ assignmentDetail.name }}</div>
      <div class="display-bar">
        <div class="grade">Grade: {{ assignmentDetail.grade }}</div>
        <div class="statistic">
          <button class="statistic-btn" @click="statisticPage">Statistic</button>
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
    background-color: pink;
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
  padding: 0; /* Removes extra space inside the input */
  margin: 0;  /* Removes extra space outside the input */
  height: 1000px;
  width: 100%; /* Ensures the input takes the full width of the container */
  box-sizing: border-box; /* Ensures padding and border are included in the total width */
}
</style>