<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Chart from 'chart.js/auto'

const route = useRoute();
const course = route.params.course; // Access the passed course from the route params

// If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
const courseDetails = computed(() => {
  return typeof course === 'string' ? JSON.parse(course) : course;
});

// Example questions data
const test_entry_statistics = ref([
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




function assignmentPage(temp){
 console.log("hello!!")
}
</script>

<template>
    <div class="statisticpage">
        <div class="title">Midterm Prepartion</div>
        
        <div class="question-box">
            <div class="assignment-scroll-bar">
                <li class="question-entry" v-for="(entry, index) in assignmentDetail.questions"
            :key="index">
                    <div class="question">{{ entry.question }}</div>
                    <textarea type="text">{{ entry.sampleResponse }}</textarea>
                </li>
            </div>
        </div>
    </div>
</template>

.course-page {
    padding: 2rem;
}

.title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
}