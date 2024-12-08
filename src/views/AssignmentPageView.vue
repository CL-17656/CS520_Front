<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchQuizDetails, submitQuizAnswers } from '@/api/AssignmentApi';

const route = useRoute();
const router = useRouter();

const quizId = ref(route.params.quizId); // Stores the ID of the quiz fetched from the route parameter
const quizDetails = ref(null); // Thus holds the quiz details fetched from the backend
const userAnswers = ref({}); // Keeps track of the answers provided by the user
const isLoading = ref(true); // Indicates whether the quiz data is still being loaded. Added this to prevent user from interacting with the UI when the quiz is being fetched

/**
 * Fetches the details of the quiz from the backend.
 * - Calls the API to get quiz information.
 * - Initializes the userAnswers object based on the questions fetched.
 * - Handles loading state and errors during the API call.
 */
const loadQuizDetails = async () => {
  try {
    console.log(quizId.value)
    const response = await fetchQuizDetails(quizId.value);
    quizDetails.value = response.data.data;
    if (response.status !== 200) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    console.log("ttt" + quizDetails.value) // Debugging: Logs fetched quiz details
    console.log(quizDetails.value.questionDTOs) // Again debugging: Logs the list of questions
    
    // Initialize userAnswers with empty arrays/strings based on question type
    quizDetails.value.questionDTOs.forEach((question) => { // quizDetails.value.questionDTOs contains an array of question objects fetched from the backend ( id and type)
      userAnswers.value[question.id] = []; // Sets empty array for multiple-choice and text-based answers
    });
    isLoading.value = false; // Quiz details have been successfully loaded
  } catch (error) {
    console.error('Error fetching quiz details:', error);
    alert('Failed to load quiz. Please try again.');
    isLoading.value = false; // Ends loading state even in case of an error
  }
};


/**
 * Submits the user's answers to the backend.
 * - Constructs a `postVO` object with the quiz ID, answers, and default values for grading and comments.
 * - Sends the data to the backend using the `submitQuizAnswers` API call.
 * - Redirects to the student homepage upon successful submission or alerts the user on failure.
 */
const submitAnswers = async () => {
  try {
    console.log(JSON.stringify(userAnswers.value)) // Debugging: Logs the user's answers as a JSON string
    
    const postVO = {
      projectId: parseInt(quizId.value), // The ID of the quiz being submitted
      answer: JSON.stringify(userAnswers.value), // User's answers in JSON format
      isDelete: false, // Marks the quiz submission as not deleted
      hasGraded: 0, // Default to 0 as it hasn't been graded yet
      scores: null, // No scores at submission
      update_correctness: null, // No updates to correctness at submission
      comments: null, // No comments on submission
    };

    await submitQuizAnswers(postVO); // Sends the quiz submission to the backend

    alert('Quiz submitted successfully!');
    router.push('/student'); // Redirect to homepage
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
              v-model="userAnswers[question.id][0]"
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
          v-model="userAnswers[question.id][0]"
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


