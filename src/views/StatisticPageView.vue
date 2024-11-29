<script setup>

// import Chart from 'chart.js/auto';
// import 'chartjs-adapter-date-fns';

// // Use Vue Router to get route parameters
// const route = useRoute();
// const courseId = route.params.courseId; // modified // Access the passed course from the route params

// // Reactive data for charts
// const testEntryStatistics = ref([]);
// const gradeDistribution = ref([]);

// // If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
// const courseDetails = computed(() => {
//   return typeof courseId === 'string' ? JSON.parse(courseId) : courseId;
// });

// // Here, we fetch test scores and grade distribution data from the backend
// async function loadStatistics() {
//   try {
//     const scoresData = await fetchTestScores(courseId);
//     testEntryStatistics.value = scoresData;

//     const gradesData = await fetchGradeDistribution(courseId);
//     gradeDistribution.value = gradesData;

//     initializeCharts();
//   } catch (error) {
//     console.error('Failed to load statistics:', error);
//   }
// }

// // Example test statistics data
// // const testEntryStatistics = ref([
// //   { date: "2024-08-01", score: 95, timespent: 80 },
// //   { date: "2024-09-07", score: 88, timespent: 77 },
// //   { date: "2024-09-15", score: 76, timespent: 68 },
// //   { date: "2024-09-19", score: 84, timespent: 60 },
// //   { date: "2024-10-01", score: 92, timespent: 63 },
// //   { date: "2024-10-02", score: 78, timespent: 62 },
// //   { date: "2024-10-23", score: 85, timespent: 65 },
// //   { date: "2024-11-19", score: 90, timespent: 62 },
// //   { date: "2024-11-21", score: 73, timespent: 63 },
// //   { date: "2024-11-27", score: 81, timespent: 61 }
// // ]);

// // Function to initialize the charts
// function initializeCharts() 
// {
//   const dates = testEntryStatistics.value.map(entry => entry.date);
//   const scores = testEntryStatistics.value.map(entry => entry.score);
//   const timespent = testEntryStatistics.value.map(entry => entry.timespent);

//   // Initialize the score chart
//   const scoreCtx = document.getElementById("testScoresChart").getContext("2d");
//   new Chart(scoreCtx, {
//     type: 'line',
//     data: {
//       labels: dates,
//       datasets: [{
//         label: 'Test Scores',
//         data: scores,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day'
//           },
//           title: {
//             display: true,
//             text: 'Date'
//           }
//         },
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Score'
//           }
//         }
//       }
//     }
//   });

//   // Initialize the time spent chart
//   const timeCtx = document.getElementById("timeSpentChart").getContext("2d");
//   new Chart(timeCtx, {
//     type: 'line',
//     data: {
//       labels: dates,
//       datasets: [{
//         label: 'Time Spent on Each Test',
//         data: timespent,
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         x: {
//           type: 'time',
//           time: {
//             unit: 'day'
//           },
//           title: {
//             display: true,
//             text: 'Date'
//           }
//         },
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Duration (minutes)'
//           }
//         }
//       }
//     }
//   });

//   // Grade distribution bar chart
//   const grades = gradeDistribution.value.map(entry => entry.grade);
//   const gradeCounts = gradeDistribution.value.map(entry => entry.count);

//   const gradeCtx = document.getElementById('gradeDistributionChart').getContext('2d');
//   new Chart(gradeCtx, {
//     type: 'bar',
//     data: {
//       labels: grades,
//       datasets: [{
//         label: 'Number of Students per Grade',
//         data: gradeCounts,
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1,
//       }],
//     },
//     options: {
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: 'Grades',
//           },
//         },
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Number of Students',
//           },
//         },
//       },
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top',
//         },
//       },
//     },
//   });
// }

  
// // Loading the statistics when the component is mounted
// onMounted(() => {
//   loadStatistics();
// });


import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchStudentResults } from '@/api/StatisticsApi';
import Chart from 'chart.js/auto'; // run : npm install chart.js : in your terminals please before starting the frontend

const route = useRoute();
const router = useRouter();
const quizId = ref(route.params.quizId || '');

const grades = ref([]);
const questions = ref([]);
const quizTitle = ref('');
const loading = ref(true);
const error = ref(null);

// Computed statistics
const averageScore = ref(0);
const questionStats = ref([]); // Array of { correct: number, incorrect: number } for each question

// Chart references
let barChart = null;
let pieChart = null;

onMounted(async () => {
  try {
    // Fetch results from backend
    const response = await fetchStudentResults(quizId.value);
    grades.value = response.data;
    if (grades.value.length > 0) {
      quizTitle.value = grades.value[0].questionTitle || 'Quiz Statistics';

      // Compute average score
      const totalScores = grades.value.reduce((sum, grade) => sum + (grade.answerDTO.isCorrect ? 1 : 0), 0); // I am assuming that each question weighs 1 point
      averageScore.value = (totalScores / grades.value.length).toFixed(2);

      // Compute correct/incorrect counts per question
      questionStats.value = grades.value.reduce((stats, grade) => {
        const questionIndex = questions.value.findIndex((q) => q.id === grade.id);
        if (questionIndex === -1) {
          stats.push({
            question: grade.questionTitle,
            correct: grade.answerDTO.isCorrect ? 1 : 0,
            incorrect: grade.answerDTO.isCorrect ? 0 : 1,
          });
        } else {
          if (grade.answerDTO.isCorrect) {
            stats[questionIndex].correct += 1;
          } else {
            stats[questionIndex].incorrect += 1;
          }
        }
        return stats;
      }, []);

      // Rendering the charts
      renderBarChart();
      renderPieChart();
    }
  } catch (err) {
    error.value = err.message || 'Failed to load statistics.';
  } finally {
    loading.value = false;
  }
});

// Render bar chart
function renderBarChart() {
  const ctx = document.getElementById('barChart').getContext('2d');
  if (barChart) {
    barChart.destroy(); // Destroy the previous chart instance if it exists
  }
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: questionStats.value.map((stat) => stat.question),
      datasets: [
        {
          label: 'Correct',
          data: questionStats.value.map((stat) => stat.correct),
          backgroundColor: 'green',
        },
        {
          label: 'Incorrect',
          data: questionStats.value.map((stat) => stat.incorrect),
          backgroundColor: 'red',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Correct vs Incorrect Responses' },
      },
    },
  });
}

// Render pie chart
function renderPieChart() {
  const ctx = document.getElementById('pieChart').getContext('2d');
  if (pieChart) {
    pieChart.destroy(); // Destroy the previous chart instance if it exists
  }
  pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Correct', 'Incorrect'],
      datasets: [
        {
          data: [
            questionStats.value.reduce((sum, stat) => sum + stat.correct, 0),
            questionStats.value.reduce((sum, stat) => sum + stat.incorrect, 0),
          ],
          backgroundColor: ['green', 'red'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Overall Distribution' },
      },
    },
  });
}

// Navigate back to the homepage
function goHome() {
  router.push({ name: 'InstructorHomepage' });
}
</script>

<template>
  <div class="statistics-view">
    <div class="header">
      <h1>{{ quizTitle }}</h1>
      <button class="home-btn" @click="goHome">Home</button>
    </div>

    <div v-if="loading" class="loading">Loading statistics...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="grades.length" class="statistics-container">
      <!-- Average Score -->
      <div class="average-score">
        <h2>Average Score: {{ averageScore }}</h2>
      </div>

      <!-- Bar Chart: Correct vs Incorrect for Each Question -->
      <div class="chart-container">
        <canvas id="barChart"></canvas>
      </div>

      <!-- Pie Chart: Overall Correct vs Incorrect -->
      <div class="chart-container">
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistics-view {
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

.average-score {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.chart-container {
  margin-bottom: 3rem;
}
</style>

<!--
<template>
  <div class="statisticpage">
    <h1 class="title">Course Statistics</h1>

    <div class="chart-container">
      <h2>Test Scores Over Time</h2>
      <canvas id="testScoresChart"></canvas>
    </div>

    <div class="chart-container">
      <h2>Time Spent</h2>
      <canvas id="timeSpentChart"></canvas>
    </div>

    <div class="chart-container">
      <h2>Grade Distribution</h2>
      <canvas id="gradeDistributionChart"></canvas>
    </div>
    
    <div class="statistic-box">
      <div class="score-statistic">
        <canvas id="testScoresChart"></canvas>
      </div>
      
      <div class="time-statistic">
        <canvas id="timeSpentChart"></canvas>
      </div>

  </div>
</template>

<style scoped>
.statisticpage {
  padding: 2rem;
}

.chart-container {
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

/* .statistic-box {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.score-statistic,
.time-statistic {
  width: 100%;
  max-width: 800px;
  margin: auto;
} */
</style>
-->
