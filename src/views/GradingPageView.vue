<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Import API functions to fetch assignments and save grades
import { fetchAssignmentsForGrading, saveGrade } from '@/api/GradingApi';

const route = useRoute();
const router = useRouter();
const quizId = ref(route.params.quizId || '');

// State to hold assignments and grading data
const assignment = ref(
  {
    name: "Midterm preparation",
    studentId: 12345678,
    studentName: "John Doe",
    submittedAt: "2024-04-27T10:00:00Z",
    questions: [
      {
        type: "multiplechoice",
        text: "What is the big O for mergesort?",
        userResponse: "O(N^2)"
      },
      {
        type: "truefalse",
        text: "is it possible to convert any context-free grammar G into an nfa nsuch that L(G) = L(N)",
        userResponse: false
      },
      {
        type: "shortanswer",
        text: "Explain the concept of minimal cut theory.",
        userResponse: "It's about how to find minimum cut in the graph."
      },
      {
        type: "fillblank",
        text: "The permutation of {1,2,3,4} ___.",
        userResponse: "4"
      }
    ],
    grade: null,
    feedback: ""
  },
  
);
const loading = ref(false);
const error = ref(null);

// Fetch assignments on component mount
onMounted(async () => {
//   try {
//     assignments.value = await fetchAssignmentsForGrading(quizId.value);
//   } catch (err) {
//     error.value = 'Failed to load assignments.';
//     console.error(err);
//   } finally {
//     loading.value = false;
//   }
});

// Function to handle grade submission
const handleSaveGrade = async (assignmentId, grade, feedback) => {
  try {
    await saveGrade(assignmentId, { grade, feedback });
    alert('Grade saved successfully!');
  } catch (err) {
    alert('Failed to save grade.');
    console.error(err);
  }
};

const autograde = async() => {
    let checkQuestionType = true;
    let assigment_temp = assignment.value;
    for (const quest of assigment_temp.questions){
        if(quest.type !== "multiplechoice"){
            checkQuestionType = false;
        }
    }

    if(checkQuestionType){
        // TODO connect with backend to auto grade
    }else{
        alert('Auto Grade is not availble! it only supports T/F and Multiple Choice questions')
    }
}
</script>

<template>
  <div class="grading-page">
    <h1 class="title">Grading</h1>
    
    <div v-if="loading">Loading assignments...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div  class="assignment-card">
        <h2>Student: {{ assignment.studentName }}</h2>
        <p>Submitted At: {{ new Date(assignment.submittedAt).toLocaleString() }}</p>
        
        <div class="questions">
          <div v-for="(question, index) in assignment.questions" :key="index" class="question">
            <p><strong>Q{{ index + 1 }}: {{ question.text }}</strong></p>
            
            <!-- Display different question types -->
            <div v-if="question.type === 'truefalse'">
              <p>Answer: {{ question.userResponse ? 'True' : 'False' }}</p>
            </div>
            
            <div v-else-if="question.type === 'multiplechoice'">
              <p>Answer: {{ question.userResponse }}</p>
            </div>
            
            <div v-else-if="question.type === 'shortanswer'">
              <p>Answer: {{ question.userResponse }}</p>
            </div>
            
            <div v-else-if="question.type === 'fillblank'">
              <p>Answer: {{ question.userResponse }}</p>
            </div>
            
            <!-- Add more types as needed -->
          </div>
        </div>
        
        <div class="grading-controls">
          <button @click="autograde()">
            Auto Grade
          </button>
          <label>
            Grade:
            <input type="number" class="grade-input" v-model.number="assignment.grade" min="0" max="100" />
          </label>
          
          <label>
            Feedback:
            <textarea v-model="assignment.feedback" placeholder="Provide feedback..."></textarea>
          </label>
          
          <button @click="handleSaveGrade(assignment.id, assignment.grade, assignment.feedback)">
            Save Grade
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grading-page {
  padding: 2rem;
  background-color: #f9f9f9;
}
.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
.assignment-card {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.questions {
  margin-top: 1rem;
}

.question {
  margin-bottom: 1rem;
}

.grading-controls {
  margin-top: 1rem;
}

.grading-controls label {
  display: block;
  margin-bottom: 0.5rem;

}

.grading-controls input,
.grading-controls textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  box-sizing: border-box;
  background-color: rgb(216, 227, 157);
}

.grading-controls button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.grading-controls button:hover {
  background-color: #369870;
}
</style>

