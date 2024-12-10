<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';
import { fetchScoreDistribution ,fetchAverageScore} from '@/api/StatisticsApi';

const route = useRoute();
const quizId = ref(route.params.quizId);
const quizName = ref(route.params.quizName);
const grades = ref([]);
const loading = ref(true);
const error = ref(null);
const avg = ref([])
// Chart DOM ref
const barChartRef = ref(null);
const averageScoreRef = ref(null)
function renderAverageScoreChart(){
  const chart = echarts.init(averageScoreRef.value);
  let option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }
  ]
};
}
// Initialize ECharts
function renderBarChart() {
  const chart = echarts.init(barChartRef.value);

  let option = {
      title: {
        text: `Score Distribution`,
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

    // const res = await fetchAverageScore()
    // avg.value = res.data
    console.log(grades.data)

    
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
    <h1 class="title">Assignment Statistics For {{ quizName }}</h1>
      <div ref="barChartRef" style="width: 100%; height: 400px;"></div>
      <div ref="averageScoreRef" style="width: 100%; height: 400px;"></div>
    </div>

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

