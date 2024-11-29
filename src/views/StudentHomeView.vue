<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Use `useRouter` for navigation
//import {validateAssignmentId} from '@/api/StudentHomeApi'
import { reactive } from 'vue';
import { useAuthenticationStore } from '@/stores/Auth';
import { logoutUser } from '@/api/AuthApi';
import { onMounted } from 'vue';
import { getAssignmentsStudentTaken, getAssignmentByProjectId } from '@/api/StudentHomeApi';
import moment from 'moment';

const store = useAuthenticationStore();

const logoutData = reactive(
  {
    username: "",
  }
);

async function logout()
{
  logoutData.username = store.userName;
  try {
    const response = await logoutUser(logoutData);
    console.log(response);

    if(response.flag == true) {
      store.logout();
      console.log(store.userName);
      router.push({ name: 'start' });
    }
  } catch (error){
    console.error(error);
  }
}

//This function is called when page opens, fetches all data needed for this page
const initialize = async () => {
  console.log(store.userId)
  try {
    const pageData = await getAssignmentsStudentTaken(store.userId);
    console.log(pageData);
    if(pageData.data.count != "") {
      for(let i = 0; i < pageData.data.count; ++i) {
        assignId = pageData.data.recordList[i].projectId
        const assignmentData = await getAssignmentByProjectId(assignId);

        assignmentList.value.push({
          id:assignId, 
          name: assignmentData.data.name, 
          instructor: assignmentData.data.userId, 
          isGraded: pageData.data.recordList[i].hasGraded,
          grade: pageData.data.recordList[i].scores,
        });
      }
    }
  }
  catch(error) {
    console.log(error);
  }
}
onMounted(() => initialize());

const router = useRouter(); // Create an instance of `useRouter`
// Data for the course list and semesters
const assignment = ref([
  {id:123, name: 'midterm preparation', instructor: 'Thomas Carr', isGraded: false,grade: 0},
  {id:456, name: 'quiz 1', instructor: 'Mark French', isGraded: false,grade: 0},
  {id:678, name: 'peer report questionnare', instructor: 'Charles Dickinson', isGraded: false,grade: 0},
  {id:789, name: 'quiz 2', instructor: 'Frank Lee', isGraded: false,grade: 0},
]);

const assignmentList = ref([]);
const semesters = ref(['Year of 2025']);

// Modal control and input data
const showModal = ref(false);
const newAssignmentId = ref('');
let error_message = ref('')

function addCourse() {
  showModal.value = true;
}

async function submitCourse() {
  console.log(newAssignmentId.value.trim())
  if (newAssignmentId.value.trim() !== ''  )  {
    const assignmentId = newAssignmentId.value.trim();

    // let isVerifyOK = validateAssignmentId(assignmentId);
    

    ///console.log(assignment.value)
    //let temp = false
    //for( const entry of assignment.value){
    //  if(entry.id == assignmentId){
    //   assignmentList.value.push(entry);
    //    showModal.value = false;
    //    temp = true
    //  }
    //}
    //if(!temp){
      //error_message.value = 'Course ID not found';
    //}

    // if (isVerifyOK) {
    //   // Add the course to the assignmentList
    //   assignmentList.value.push(not read yet);
    //   showModal.value = false;
    // } else {
    //   error_message.value = 'Course ID not found';
    // }

    //Seach assignmentData
    const assignmentData = await getAssignmentByProjectId(newAssignmentId.value);
    console.log(assignmentData)
    if(assignmentData.data.endTime != null) {
      let endT = moment(assignmentData.data.endTime).format('YYYY-MM-DD HH:mm:ss');
      let now = moment().format('YYYY-MM-DD HH:mm:ss');
      if(now > endT) {
        error_message.value = 'Assignment has ended';
      }
    }
    else if(assignmentData.data.startTime != null) {
      let startT = moment(assignmentData.data.startTime).format('YYYY-MM-DD HH:mm:ss');
      let now = moment().format('YYYY-MM-DD HH:mm:ss');
      if(now < startT) {
        error_message.value = 'Assignment has not started';
      }
    }
    else {
      error_message.value = '';
      assignmentList.value.push({
        id:assignmentData.data.projectId, 
        name: assignmentData.data.name, 
        instructor: assignmentData.data.userId, 
        isGraded: false,
        grade: 0,
      });
      //TODO:
      //route to take quiz using this quizdata
    }

    newAssignmentId.value = ''; // Clear the input field
    
  }
  
}
function viewAssignments(course){
  router.push({ name: 'assignmentpage', params:{course:JSON.stringify(course)}});
}

function closeModal() {
  showModal.value = false;
}
</script>

<template>
  <main>
    <h1 class="title">Your Assignment</h1>
    <button class="logout-btn" @click="logout()">Logout</button>

    <div class="semester" v-for="semester in semesters" :key="semester">
      <h2>{{ semester }}</h2>
      <div class="courses-grid">
          <div v-for="[index, assignment] in Object.entries(assignmentList)" :key="index" class="course-card">
            <h3>{{ assignment.name }}</h3>
            <p>{{ assignment.instructor }}</p>
            <div v-if="assignment.isGraded">
            {{ assignment.grade }}</div>
            <button @click="viewAssignments(course)" class="assignments">Take the Assignment</button>
          </div>
        <div class="course-card add-course">
          <button @click="addCourse">Add Assignment</button>
        </div>
      </div>
    </div>

    <!-- Modal for entering course ID -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Enter Assignment ID</h3>
        <h4 class="error_message" v-if="error_message">{{ error_message }}</h4>
        <input v-model="newAssignmentId" type="text" placeholder="Assignment ID" />
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

.logout-btn {
  margin-left: 50rem;
  margin-top: 1rem;
  font-weight: bold;
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
