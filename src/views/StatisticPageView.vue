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
          name: 'scores',
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

        const res = await fetchAssignmentDataAnalysis(quizId.value);
        assignmentdata.value = res.data;

        for (const entry of assignmentdata.value){
          
          if(entry.type == 1 || entry.type == 2){
            let tempdata = []
            for (const a of entry.analysisDTO.possibleAnswerList){
              const [key, value] = Object.entries(a)[0];
              tempdata.push({ name: key, value: value });

            }
            console.log(tempdata)
            


            chartsData.value.push({title: entry.questionTitle, name:"answer distribution", data:tempdata  })
          }
        }
        // const res = await fetchAverageScore()
        // avg.value = res.data
        console.log(chartsData.value)
        renderBarChart();

        // Wait for the DOM to update before initializing dynamic charts
        // console.log(`sssss ${chartsData.value}`)
        
        await nextTick(); // Wait for the DOM update
        chartsData.value.forEach((chartData, index) => {
          console.log(`dddd ${chartData}`); // Check if this logs
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
    <div v-for="(chartData, index) in chartsData" :key="index" :ref="el => chartRefs[index] = el" style="width: 100%; height: 200px;"></div>
</template>

<style scoped>
.statistics-view {
  padding: 1rem;
}
.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.subtitle {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;

}
.loading {
  font-size: 1.2rem;
  color: #555;
}

.error {
  font-size: 1.2rem;
  color: red;
}

.chart-container {
  margin-bottom: 2rem;
}
</style>

