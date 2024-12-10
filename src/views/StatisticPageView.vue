<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';
import { fetchScoreDistribution } from '@/api/StatisticsApi';

const route = useRoute();
const quizId = ref(route.params.quizId);
const quizName = ref(route.params.quizName);
const grades = ref([]);
const loading = ref(true);
const error = ref(null);

// Chart DOM ref
const barChartRef = ref(null);

// Initialize ECharts
function renderBarChart() {
  const chart = echarts.init(barChartRef.value);

  let option = {
      title: {
        text: `${quizName.value}`,
        subtext: `Score Distribution`,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: grades.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  chart.setOption(option);
  console.log("hello")
}

onMounted(async () => {
  try {
    const response = await fetchScoreDistribution(quizId.value);
    grades.value = response.data;
    console.log(response.data)
    console.log(grades.value[0])
    
    renderBarChart();
  } catch (err) {
    error.value = err.message || 'Failed to load data.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="statistics-view">
    <h1>Score Distribution</h1>
    <!-- <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error"> -->
      <div ref="barChartRef" style="width: 100%; height: 400px;"></div>
    </div>
  <!-- </div> -->
</template>

<style scoped>
.statistics-view {
  padding: 1rem;
}

.loading {
  font-size: 1.2rem;
  color: #555;
}

.error {
  font-size: 1.2rem;
  color: red;
}
</style>

