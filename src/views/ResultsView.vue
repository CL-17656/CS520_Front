<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchResults } from '@/api/ResultsApi';

const route = useRoute();
const router = useRouter();

// Store the quiz ID from the route parameters
const quizId = ref(route.params.id);

// Variables to hold quiz results, title, loading status, and error messages
const results = ref([]);
const quizTitle = ref('');
const loading = ref(true);
const error = ref(null);

// Runs when the component is mounted  
onMounted(async () => {
  try {
    // Fetch the results for the quiz from the backend using the quiz ID
    console.log(route.params);
    const response = await fetchResults(quizId.value); // Call API to fetch results
    results.value = response.data;
    quizTitle.value = 'Quiz Results'; // || response.data[0]?.questionTitle;  // Setting the title for the results page
  } catch (err) {
    error.value = err.message || 'Failed to load results.';
  } finally {
    // Mark loading as complete regardless of success or failure
    loading.value = false;
  }
});
</script>

<template>
  <div class="results-view">
    <!-- Header of the results page -->
    <div class="header">
      <!-- Show the title of the quiz -->
      <h1>{{ quizTitle }}</h1>
    </div>

    <!-- Display a loading message while results are being fetched -->
    <div v-if="loading" class="loading">Loading results...</div>
    
    <!-- Display an error message if something goes wrong -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Show results if there is data to display -->
    <div v-if="results.length" class="results-container">
      <ul class="results-list">
        <!-- Loop through each result and show the question details -->
        <li v-for="(result, index) in results" :key="index" class="result-item">
          <!-- Display the question number and title -->
          <h2>Question {{ index + 1 }}: {{ result.questionTitle }}</h2>

          <!-- Show the answer provided by the user -->
          <p><strong>Your Answer:</strong> {{ result.answerDTO.myAnswers.join(', ') || 'No answer provided' }}</p>

          <!-- Show the correct answer -->
          <p><strong>Correct Answer:</strong> {{ result.answerDTO.correctAnswerList.join(', ') || 'N/A' }}</p>

          <!-- Display whether the user's answer was correct or incorrect -->
          <p>
            <strong>Result:</strong>
            <span :class="{ correct: result.answerDTO.isCorrect, incorrect: !result.answerDTO.isCorrect }">
              {{ result.answerDTO.isCorrect ? 'Correct' : 'Incorrect' }}
            </span>
          </p>

          <!-- Display instructor comments if they exist -->
          <p v-if="result.answerDTO.comment">
            <strong>Comments:</strong> {{ result.answerDTO.comment || 'No comments provided' }}
          </p>
          
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.results-view {
  padding: 1rem; /* Add spacing around the entire results view */
}

.header {
  display: flex; /* Arrange header items in a row */
  justify-content: space-between; /* Space out the items evenly */
  align-items: center; /* Align items vertically */
  margin-bottom: 1.5rem; /* Add spacing below the header */
}

.home-btn {
  padding: 0.5rem 1rem; /* Add padding to the button for better size */
  background-color: #004d4d; /* Dark green background for the button */
  color: white;
  border: none;
  border-radius: 4px; /* Slightly round the button corners */
  cursor: pointer; /* Change cursor to pointer on hover */
}

.loading {
  font-size: 1.2rem;
  color: #555;
}

.error {
  font-size: 1.2rem;
  color: red;
}

.results-container {
  margin-top: 2rem; /* Add spacing above the results section */
}

.results-list {
  list-style: none; /* Remove bullets from the result items */
  padding: 0; /* Remove padding around the list */
}

.result-item {
  margin-bottom: 2rem; /* Space between each result */
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px; /* Smoothen the corners of the result box */
}

.result-item h2 {
  margin: 0 0 0.5rem 0;
}

.correct {
  color: green; /* Show correct answers in green */
  font-weight: bold;
}

.incorrect {
  color: red; /* Show incorrect answers in red */
  font-weight: bold;
}
</style>
