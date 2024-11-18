<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { fetchTestScores, fetchGradeDistribution } from '@/api/StatisticsApi'; // added

// Use Vue Router to get route parameters
const route = useRoute();
const course = route.params.course; // Access the passed course from the route params

// If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
const courseDetails = computed(() => {
  return typeof course === 'string' ? JSON.parse(course) : course;
});

// Example test statistics data
const testEntryStatistics = ref([
  { date: "2024-08-01", score: 95, timespent: 80 },
  { date: "2024-09-07", score: 88, timespent: 77 },
  { date: "2024-09-15", score: 76, timespent: 68 },
  { date: "2024-09-19", score: 84, timespent: 60 },
  { date: "2024-10-01", score: 92, timespent: 63 },
  { date: "2024-10-02", score: 78, timespent: 62 },
  { date: "2024-10-23", score: 85, timespent: 65 },
  { date: "2024-11-19", score: 90, timespent: 62 },
  { date: "2024-11-21", score: 73, timespent: 63 },
  { date: "2024-11-27", score: 81, timespent: 61 }
]);

// Function to initialize the charts when the component is mounted
onMounted(() => {
  const dates = testEntryStatistics.value.map(entry => entry.date);
  const scores = testEntryStatistics.value.map(entry => entry.score);
  const timespent = testEntryStatistics.value.map(entry => entry.timespent);

  // Initialize the score chart
  const scoreCtx = document.getElementById("testScoresChart").getContext("2d");
  new Chart(scoreCtx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Test Scores',
        data: scores,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Score'
          }
        }
      }
    }
  });

  // Initialize the time spent chart
  const timeCtx = document.getElementById("timeSpentChart").getContext("2d");
  new Chart(timeCtx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Time Spent on Each Test',
        data: timespent,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Duration (minutes)'
          }
        }
      }
    }
  });
});
</script>

<template>
  <div class="statisticpage">
    <h1 class="title">Statistic</h1>
    <div class="statistic-box">
      <div class="score-statistic">
        <canvas id="testScoresChart"></canvas>
      </div>
      <div class="time-statistic">
        <canvas id="timeSpentChart"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statisticpage {
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.statistic-box {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.score-statistic,
.time-statistic {
  width: 100%;
  max-width: 800px;
  margin: auto;
}
</style>
