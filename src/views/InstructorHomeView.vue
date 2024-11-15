<script setup>
import { ref } from 'vue';

// Sample data for courses and tasks
const courses = ref({
   123:{ name: 'COMPSCI 123', description: 'Algorithm', studentCount: 35 },
   456:{name: 'COMPSCI 456', description: 'Artificial Intelligence', studentCount: 42 },
   789:{ name: 'COMPSCI 789', description: 'Distributed Systems', studentCount: 28 },
});

const upcomingTasks = ref([
  { id: 1, task: 'Grade Assignment 1', dueDate: 'Nov 18, 2024' },
  { id: 2, task: 'Prepare Lecture on Sorting Algorithms', dueDate: 'Nov 20, 2024' },
  { id: 3, task: 'Review Project Proposals', dueDate: 'Nov 22, 2024' },
]);

// Function to navigate to course details
function viewCourseDetails(courseId) {
  alert(`Navigating to details for course ID: ${courseId}`);
}

// Function to manage courses
function manageCourses() {
  alert('Navigating to manage courses...');
}
</script>

<template>
  <main class="instructor-home">
    <h1 class="title">Instructor Home Page</h1>

    <!-- Section: Courses Overview -->
    <section class="courses-overview">
      <h2>Your Courses</h2>
      <div class="courses-list">
        <div v-for="[key, course] in Object.entries(courses)" :key="key" class="course-card">
            <h3>{{ course.name }}</h3>
            <p>{{ course.description }}</p>
            <p>Enrolled Students: {{ course.studentCount }}</p>
            <button @click="viewCourseDetails(key)">View Details</button>
        </div>
      </div>
      <button class="manage-courses-btn" @click="manageCourses">Manage Courses</button>
    </section>

    <!-- Section: Upcoming Tasks -->
    <section class="upcoming-tasks">
      <h2>Upcoming Tasks</h2>
      <ul>
        <li v-for="task in upcomingTasks" :key="task.id">
          <p>{{ task.task }} - <span class="due-date">{{ task.dueDate }}</span></p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.instructor-home {
  font-family: Arial, sans-serif;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.courses-overview, .upcoming-tasks {
  margin-bottom: 2rem;
}

.courses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.course-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.course-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.course-card h3 {
  margin: 0 0 0.5rem;
}

.course-card p {
  margin: 0.2rem 0;
}

button {
  background-color: #004d4d;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

button:hover {
  background-color: #006666;
}

.manage-courses-btn {
  margin-top: 1rem;
  font-weight: bold;
}

.upcoming-tasks ul {
  list-style-type: none;
  padding: 0;
}

.upcoming-tasks li {
  background-color: #e8f5f5;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

.due-date {
  color: #007777;
  font-weight: bold;
}
</style>
