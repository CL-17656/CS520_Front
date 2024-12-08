<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchAssignmentsForGrading, saveGrade } from '@/api/GradingApi';

const route = useRoute();
const quizId = ref(route.params.quizId);
const studentId = ref(route.params.studentId);
const assignment = ref(null); // Initialize with null
const loading = ref(false);
const error = ref(null);
let feedback = ref("");
let scores = ref([])
let correctArr = ref([])
let answersList = {}
let correctArrTemp = []
let scoresTemp = []
// Fetch assignments on component mount
onMounted(async () => {
  try {
    loading.value = true;
    console.log(quizId.value)
    const response = await fetchAssignmentsForGrading(parseInt(quizId.value),parseInt(studentId.value));
    console.log(response.data)
    assignment.value = response.data;
    assignment.value.forEach((x) =>{
      correctArr.value.push(false)
      correctArrTemp.push(x.answerDTO.isCorrect)
      answersList[x.id] = x.answerDTO.myAnswers
      scoresTemp.push(x.answerDTO.isCorrect ? 1 : 0)
    });
    
    // console.log(JSON.stringify(answers))

    console.log(correctArr.value)
    console.log(assignment.value)
  } catch (err) {
    error.value = 'Failed to load assignments.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});


// Function to handle grade submission
const handleSaveGrade = async () => {
  try {
    // Prepare data for the backend
    console.log(correctArr.value)
    // console.log(JSON.stringify( correctArr.value))
    console.log(scores.value.reduce((sum,x)=> sum += x,0))
    console.log(feedback.value)

    const postVO = {
      projectId: parseInt(quizId.value),
      studentId: parseInt(studentId.value),
      isDelete: false,
      answer:JSON.stringify(answersList),
      hasGraded: 1, // Mark as graded
      update_correctness: correctArr.value, // Collect correctness
      scores: scores.value.reduce((sum,x)=> sum += x,0), // Total score
      comments: feedback.value,
    };

    console.log(JSON.stringify(postVO))
    // Send to backend
    await saveGrade(postVO);
    alert('Grade saved successfully!');
  } catch (err) {
    alert('Failed to save grade.');
    console.error(err);
  }
};

// Auto-grade function
const autograde = async () => {
  for(let i = 0; i < correctArrTemp.length;i++){
    
    correctArr.value[i] = correctArrTemp[i]
    if(scoresTemp[i] > 0){
      scores.value[i] = scoresTemp[i]
    }

  }
  console.log(correctArr.value)
  console.log(scores.value)
};
</script>


<template>
  <div class="grading-page">
    <h1 class="title">Grading</h1>

    <div v-if="loading">Loading assignments...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="assignment-card">

        <!-- Questions as Box Layout -->
        <div class="questions">
          <div
            v-for="question,index in assignment"
            :key="index"
            class="question-box"
          >
            <p class="question-number">Question {{ index + 1 }}</p>
            <p class="question-text">{{ question.questionTitle }}</p>
            <p class="user-response">
              <strong>Student Answer:</strong> {{ question.answerDTO.myAnswers.join(', ') || 'No answer provided' }}
            </p>
             <p> <strong>Correct Answer:</strong> {{ question.answerDTO.correctAnswerList.join(', ') }}
            </p>

            <!-- Grade Input -->
            <div class="grade-controls">
              <label>
                Grade:
                <input
                  type="number"
                  v-model.number="scores[index]"
                  class="grade-input"
                  min="0"
                  max="1"
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  v-model="correctArr[index]"
                />
                Mark as Correct
              </label>
            </div>
          </div>
        </div>

        <!-- Feedback and Submit Controls -->
        <div class="grading-controls">
          <button @click="autograde()" class="btn-auto-grade">Auto Grade</button>

          <label>
            Feedback:
            <textarea
              v-model="feedback"
              class="feedback-textarea"
              placeholder="Provide feedback..."
            ></textarea>
          </label>

          <button @click="handleSaveGrade()" class="btn-save-grade">Save Grade</button>
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

.grading-page {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.assignment-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.questions {
  display: flex;
  flex-direction: column;
  gap: 16px; /* Spacing between question boxes */
}

.question-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.question-number {
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}

.question-text {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 8px;
}

.user-response {
  margin-bottom: 8px;
  font-style: italic;
}

.grade-controls {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.grade-input {
  width: 60px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.feedback-textarea {
  width: 100%;
  height: 80px;
  margin-top: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 1em;
}

.grading-controls {
  margin-top: 20px;
}

.btn-auto-grade,
.btn-save-grade {
  margin-top: 16px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-auto-grade:hover,
.btn-save-grade:hover {
  background-color: #0056b3;
}
</style>