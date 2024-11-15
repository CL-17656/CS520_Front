<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const course = route.params.course; // Access the passed course from the route params

// If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
const courseDetails = computed(() => {
  return typeof course === 'string' ? JSON.parse(course) : course;
});

// Example assignments data
const assignments = ref([
  { type: "test", name: "midterm preparation", grade: "100", isGrade: true },
  { type: "test", name: "final preparation", grade: "", isGrade: false },
  { type: "quiz", name: "midterm preparation", grade: "61", isGrade: true },
]);
</script>

<template>
  <main class="course-page">
    <!-- Display Course Title -->
    <h1 class="title">{{ courseDetails?.name || 'Course Title' }}</h1>

    <!-- Section: Courses Overview -->
    <section class="courses-overview">
      <h2>{{ courseDetails?.description || 'Course Description' }}</h2>

      <!-- Section: Assignments List -->
      <div class="assignments-list">
        <h3>Assignments</h3>
        <ul>
          <li v-for="(assignment, index) in assignments" :key="index">
            <p>Type: {{ assignment.type }}</p>
            <p>Name: {{ assignment.name }}</p>
            <p>Grade: {{ assignment.isGrade ? assignment.grade : 'Not Graded' }}</p>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped>
.course-page {
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.courses-overview {
  margin-top: 1rem;
}

.assignments-list {
  margin-top: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 5px;
}
</style>
