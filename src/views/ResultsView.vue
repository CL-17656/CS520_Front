<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchResults } from '@/api/ResultsApi';

const route = useRoute();
const router = useRouter();
const quizId = ref(route.params.quizId || '');

const results = ref([]);
const quizTitle = ref('');
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Fetching the results from the backend
    const response = await fetchResults(quizId.value);
    results.value = response.data;
    quizTitle.value = 'Quiz Results'; // || response.data[0]?.questionTitle;
  } catch (err) {
    error.value = err.message || 'Failed to load results.';
  } finally {
    loading.value = false;
  }
});

// Sending the student back to the homepage
function goHome() {
  router.push({ name: 'StudentHomepage' });
}
</script>

<template>
  <div class="results-view">
    <div class="header">
      <h1>{{ quizTitle }}</h1>
      <button class="home-btn" @click="goHome">Home</button>
    </div>

    <div v-if="loading" class="loading">Loading results...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="results.length" class="results-container">
      <ul class="results-list">
        <li v-for="(result, index) in results" :key="index" class="result-item">
          <h2>Question {{ index + 1 }}: {{ result.questionTitle }}</h2>
          <p><strong>Your Answer:</strong> {{ result.answerDTO.myAnswers.join(', ') || 'No answer provided' }}</p>
          <p><strong>Correct Answer:</strong> {{ result.answerDTO.correctAnswerList.join(', ') || 'N/A' }}</p>
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
