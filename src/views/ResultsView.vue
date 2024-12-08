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
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.results-view {
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.home-btn {
  padding: 0.5rem 1rem;
  background-color: #004d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
  margin-top: 2rem;
}

.results-list {
  list-style: none;
  padding: 0;
}

.result-item {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.result-item h2 {
  margin: 0 0 0.5rem 0;
}

.correct {
  color: green;
  font-weight: bold;
}

.incorrect {
  color: red;
  font-weight: bold;
}
</style>
