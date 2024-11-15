<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Use `useRouter` for navigation

const router = useRouter(); // Create an instance of `useRouter`
// Data for the course list and semesters
const courses = ref([
  {id:123, name: 'COMPSCI 123', description: 'Algorithm', assignments: 5},
  {id:456, name: 'COMPSCI 456', description: 'Artifical Intelligence', assignments: 9},
  {id:678, name: 'COMPSCI 678', description: 'Operating System', assignments: 9},
  {id:789, name: 'COMPSCI 789', description: 'Distributed System', assignments: 8},
]);

const courseList = ref([]);
const semesters = ref(['Year of 2025']);

// Modal control and input data
const showModal = ref(false);
const newCourseId = ref('');
let error_message = ref('')

function addCourse() {
  showModal.value = true;
}

function submitCourse() {

  if (newCourseId.value.trim() !== ''  )  {
    const courseId = newCourseId.value.trim();

  
    let currentCourse
      for(const element of courses.value){
        if(element.id == courseId) {
          currentCourse = element;
        }
          
    };

    
    if (currentCourse) {
      // Add the course to the courseList
      courseList.value.push(currentCourse);
      showModal.value = false;
    } else {
      error_message.value = 'Course ID not found';
    }

    newCourseId.value = ''; // Clear the input field
    
  }
  
}
function viewAssignments(course){
  router.push({ name: 'coursepage', params:{course:JSON.stringify(course)}});
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <main>
    <h1 class="title">Your Courses</h1>

    <div class="semester" v-for="semester in semesters" :key="semester">
      <h2>{{ semester }}</h2>
      <div class="courses-grid">
          <div v-for="(course) in courseList" :key="index" class="course-card">
            <h3>{{ course.name }}</h3>
            <p>{{ course.description }}</p>
            <button @click="viewAssignments(course)" class="assignments">{{ course.assignments }} assignments</button>
          </div>
        <div class="course-card add-course">
          <button @click="addCourse">Add Course</button>
        </div>
      </div>
    </div>
    <a href="#" class="see-older-courses">See older courses</a>

    <!-- Modal for entering course ID -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Enter Course ID</h3>
        <h4 class="error_message" v-if="error_message">{{ error_message }}</h4>
        <input v-model="newCourseId" type="text" placeholder="Course ID" />
        <div class="modal-buttons">
          <button @click="submitCourse">Submit</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.semester {
  margin-bottom: 2rem;
}



.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.course-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.course-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.add-course {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  cursor: pointer;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;
  background-color: #004d4d;
  color: #fff;
  border-radius: 4px;
  font-size: 0.9rem;
}

button:hover {
  background-color: #006666;
}

.see-older-courses {
  display: inline-block;
  color: #004d4d;
  text-decoration: none;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.see-older-courses:hover {
  text-decoration: underline;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
}

.modal input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.modal h4 {
  color: red;
} 

.course-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}

.course-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.course-card h3 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.course-card p {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 1rem;
}

.assignments {
  font-weight: bold;
  background-color: #004d4d;
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  display: inline-block;
}

.modal-buttons button {
  margin: 0 0.5rem;
}
</style>
