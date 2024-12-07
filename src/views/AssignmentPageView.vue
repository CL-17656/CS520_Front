<script setup>

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

import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchQuizDetails, submitQuizAnswers } from '@/api/AssignmentApi';

const route = useRoute();
const router = useRouter();

// const quizId = route.params.quizId;
const quizId = ref(route.params.quizId);
const quizDetails = ref(null);
const userAnswers = ref({});
const isLoading = ref(true); // added this to prevent user from interacting with the UI when the quiz is being fetched

// Fetch quiz details
const loadQuizDetails = async () => {
  try {
    console.log(quizId.value)
    const response = await fetchQuizDetails(quizId.value);
    quizDetails.value = response.data.data;
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    console.log("ttt" + quizDetails.value)
    console.log(quizDetails.value.questionDTOs)
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
// const submitAnswers = async () => {
//   try {
//     // const postVO = {
//     //   projectId: quizId.value,
//     //   answer: JSON.stringify(userAnswers.value),
//     //   isDelete: false,
//     // };
//     console.log(userAnswers.value)
//     const postVO = {
//       projectId: parseInt(quizId.value), // projectId from the schema
//       answer: JSON.stringify(userAnswers.value), // answer in string format
//       isDelete: false, // isDelete field from the schema
//       id: 0, // answer ID
//       comments: "", // optional: comments, empty by default
//       hasGraded: 0, // optional: hasGraded, set to 0 by default
//       scores: "", // optional: scores, empty by default
//       update_correctness: [], // optional: update_correctness, empty array by default
//     };
//     console.log(JSON.stringify(postVO))
//     await submitQuizAnswers(postVO);
//     alert('Quiz submitted successfully!');
//     router.push('/home'); // Redirect to home or results page
//   } catch (error) {
//     console.error('Error submitting quiz:', error);
//     alert('Failed to submit quiz. Please try again.');
//   }
// };

// Submit answers
const submitAnswers = async () => {
  try {
    const postVO = {
      projectId: quizId,
      answer: JSON.stringify(userAnswers.value), // answers from the user
      isDelete: false,
      hasGraded: 0, // Default to 0 as it hasn't been graded yet
      scores: null, // No scores at submission
      update_correctness: null,
      comments: null, // No comments on submission
    };

    await submitQuizAnswers(postVO);

    alert('Quiz submitted successfully!');
    router.push('/home'); // Redirect to homepage or maybe results view as well
  } catch (err) {
    console.error('Error submitting quiz:', err);
    alert('Failed to submit quiz. Please try again.');
  }
};
  
onMounted(() => {
  loadQuizDetails();
});
  
</script>
<template>
  <div v-if="isLoading" class="loading">Loading quiz...</div>
  <div v-else class="quiz-container">
    <div class="quiz-header">
      <h1>{{ quizDetails.name }}</h1>
      <p>{{ quizDetails.description }}</p>
    </div>

    <div
      v-for="(question, index) in quizDetails.questionDTOs"
      :key="index"
      class="quiz-question"
    >
      <div class="question-card">
        <h3 class="question-title">{{ question.questionTitle }}</h3>
        <p class="question-description">{{ question.questionDescription }}</p>

        <!-- Single/Multiple Choice -->
        <div v-if="question.type === 1 || question.type === 2" class="options">
          <div
            v-for="(option, optIndex) in question.possibleAnswerList"
            :key="optIndex"
            class="option"
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
            <label
              class="option-label"
              :for="'q' + question.id + 'opt' + optIndex"
            >
              {{ option }}
            </label>
          </div>
        </div>

        <!-- Fill-in-the-Blank or Essay -->
        <textarea
          v-else
          v-model="userAnswers[question.id]"
          class="text-area"
          :placeholder="'Enter your answer here...'"
        ></textarea>
      </div>
    </div>

    <div class="quiz-footer">
      <button @click="submitAnswers" class="submit-button">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

.quiz-header {
  text-align: center;
  margin-bottom: 30px;
}

.quiz-header h1 {
  font-size: 2rem;
  color: #333;
}

.quiz-header p {
  font-size: 1rem;
  color: #666;
}

.quiz-question {
  margin-bottom: 20px;
}

.question-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.question-title {
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.question-description {
  font-size: 1rem;
  margin-bottom: 15px;
  color: #555;
}

.options {
  margin-top: 10px;
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.option-label {
  margin-left: 10px;
  font-size: 1rem;
  color: #333;
}

.text-area {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.text-area:focus {
  outline: none;
  border-color: #007bff;
}

.quiz-footer {
  text-align: center;
  margin-top: 20px;
}

.submit-button {
  padding: 10px 20px;
  font-size: 1.25rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>


