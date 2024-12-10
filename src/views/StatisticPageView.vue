<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';
import { fetchScoreDistribution ,fetchAssignmentDataAnalysis} from '@/api/StatisticsApi';
import { nextTick } from 'vue';

const route = useRoute();
const quizId = ref(route.params.quizId);
const quizName = ref(route.params.quizName);
const grades = ref([]);
const loading = ref(true);
const error = ref(null);
const avg = ref([])
const chartsData = ref([])
// Chart DOM ref
const barChartRef = ref(null);
const averageScoreRef = ref(null)
const assignmentdata = ref(null)
const chartRefs = ref([]);
// function renderAverageScoreChart(){
//   const chart = echarts.init(averageScoreRef.value);
//   let option = {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: [820, 932, 901, 934, 1290, 1330, 1320],
//       type: 'line',
//       smooth: true
//     }
//   ]
// };
// }
// Initialize ECharts
function renderBarChart() {
  const chart = echarts.init(barChartRef.value);

  let option = {
    title: {
    text: 'Score Distribution',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: grades.value
    }
  ]
};
  chart.setOption(option);
  console.log("hello")
}

function renderQuestionChart(container, chartData) {
  console.log('About to initialize chart', container, chartData);
  const chart = echarts.init(container);
  console.log(`render ${JSON.stringify(chartData.data)}`)
  const option = {
    title: {
      text: chartData.title,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: chartData.name,
        type: 'pie',
        radius: '50%',
        data: chartData.data, // Ensure data is in the format [{ value, name }]
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  chart.setOption(option);
}


onMounted(async () => {
      try {
        const response = await fetchScoreDistribution(quizId.value);
        grades.value = response.data; 

        console.log(grades.value)
        for (const dataEntry of grades.value) {
          dataEntry.name = `Total Score: ${dataEntry.name}`
        }

        const res = await fetchAssignmentDataAnalysis(quizId.value);
        assignmentdata.value = res.data;

        for (const entry of assignmentdata.value){
          
          if(entry.type == 1 || entry.type == 2){
            let tempdata = []
            for (const a of entry.analysisDTO.possibleAnswerList){
              const [key, value] = Object.entries(a)[0];
              tempdata.push({ name: `choice: ${key}`, value: value });

            }
            console.log(tempdata)
            


            chartsData.value.push({title: entry.questionTitle, name:"answer distribution", data:tempdata  })
          }
        }
        // const res = await fetchAverageScore()
        // avg.value = res.data
        console.log(chartsData.value)
        renderBarChart();
        
        await nextTick(); // Wait for the DOM update
        chartsData.value.forEach((chartData, index) => {
          const container = chartRefs.value[index];
          renderQuestionChart(container, chartData);
        });
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
      <!-- <div ref="averageScoreRef" style="width: 100%; height: 400px;"></div> -->
      <h2 class="subtitle">Question Statistics</h2>
    </div>
    <div class="question-chart-container">    <div v-for="(chartData, index) in chartsData" :key="index" :ref="el => chartRefs[index] = el" style="width: 100%; height: 200px;"></div>
</div>
</template>

<style scoped>
.statistics-view {
  padding: 1rem;
  max-width: 1200px; 
  margin: 0 auto; 
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333; 
}

.subtitle {
  font-size: 1.8rem;
  margin: 2rem 0 1.5rem;
  text-align: center;
  color: #555; 
}

.question-chart-container {
  display: flex;
  flex-direction: column; 
  gap: 2rem; 
  align-items: center; 
}

.question-chart-container > div {
  width: 100%;
  max-width: 1000px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  border: 1px solid #ddd; 
  border-radius: 8px; 
  padding: 1rem;
  background-color: #fff;
  text-align: center; 
}

.question-chart-container > div:hover {
  transform: scale(1.02); 
}

.loading {
  font-size: 1.2rem;
  color: #555;
  text-align: center; 
}

.error {
  font-size: 1.2rem;
  color: red;
  text-align: center; 
}

.chart-container {
  margin-bottom: 2rem;
}
</style>
