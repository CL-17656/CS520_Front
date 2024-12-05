<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchAssignmentsForGrading, saveGrade } from '@/api/GradingApi';

const route = useRoute();
const quizId = ref(route.params.quizId || '');
const assignment = ref({
  name: "Midterm Exam - Computer Science",
  studentId: 98765432,
  studentName: "Jane Smith",
  submittedAt: "2024-12-01T15:00:00Z",
  questions: [
    {
      id: 1,
      type: "multiplechoice",
      text: "What is the time complexity of Quick Sort in the average case?",
      userResponse: "O(N^2)",
      expectedAnswer: "O(N log N)",
      grade: null,
      isCorrect: null
    },
    {
      id: 2,
      type: "truefalse",
      text: "Depth-first search uses a queue to traverse nodes.",
      userResponse: false,
      expectedAnswer: false,
      grade: null,
      isCorrect: null
    },
    {
      id: 3,
      type: "shortanswer",
      text: "Explain the concept of memoization in dynamic programming.",
      userResponse: "Memoization is about storing partial results to optimize recursive calls.",
      expectedAnswer: "Memoization involves storing previously computed results to avoid redundant calculations in recursive solutions.",
      grade: null,
      isCorrect: null
    },
    {
      id: 4,
      type: "fillblank",
      text: "The binary search algorithm works on __ arrays.",
      userResponse: "sorted",
      expectedAnswer: "sorted",
      grade: null,
      isCorrect: null
    }
  ],
  grade: null,
  feedback: ""
}
); // Initialize with null
const loading = ref(false);
const error = ref(null);

// Fetch assignments on component mount
onMounted(async () => {
  try {
    loading.value = true;
    // const response = await fetchAssignmentsForGrading(quizId.value);
    // assignment.value = response.data;
    // Initialize grade and correctness for each question
    assignment.value.questions = assignment.value.questions.map((q) => ({
      ...q,
      grade: null, // Default grade
      isCorrect: false, // Default correctness
    }));
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
    const postVO = {
      id: assignment.value.quizId, //  assignment ID
      projectId: quizId.value,
      answer: JSON.stringify(
        assignment.value.questions.reduce((acc, q) => {
          acc[q.id] = q.userResponse; // Collect question answers
          return acc;
        }, {})
      ),
      isDelete: false,
      hasGraded: 1, // Mark as graded
      update_correctness: assignment.value.questions.map((q) => q.isCorrect), // Collect correctness
      scores: assignment.value.questions.reduce((total, q) => total + (q.grade || 0), 0), // Total score
      comments: assignment.value.feedback,
    };

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
  const allMultipleChoice = assignment.value.questions.every(
    (q) => q.type === 'multiplechoice' || q.type === 'truefalse'
  );
  if (allMultipleChoice) {
    assignment.value.questions = assignment.value.questions.map((q) => ({
      ...q,
      grade: q.userResponse === 'Expected Answer' ? 100 : 0, // Simple auto-grade logic
      isCorrect: q.userResponse === 'Expected Answer',
    }));
  } else {
    alert('Auto Grade is only available for T/F and Multiple Choice questions.');
  }
};
</script>


<template>
  <div class="grading-page">
    <h1 class="title">Grading</h1>

    <div v-if="loading">Loading assignments...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="assignment-card">
        <h2>Student: {{ assignment.studentName }}</h2>
        <p>Submitted At: {{ new Date(assignment.submittedAt).toLocaleString() }}</p>

        <!-- Questions as Box Layout -->
        <div class="questions">
          <div
            v-for="(question, index) in assignment.questions"
            :key="index"
            class="question-box"
          >
            <p class="question-number">Question {{ index + 1 }}</p>
            <p class="question-text">{{ question.text }}</p>
            <p class="user-response">
              <strong>Your Answer:</strong> {{ question.userResponse || 'No answer provided' }}
            </p>
            <p v-if="question.expectedAnswer">
              <strong>Correct Answer:</strong> {{ question.expectedAnswer }}
            </p>

            <!-- Grade Input -->
            <div class="grade-controls">
              <label>
                Grade:
                <input
                  type="number"
                  v-model.number="question.grade"
                  class="grade-input"
                  min="0"
                  max="100"
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  v-model="question.isCorrect"
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
              v-model="assignment.feedback"
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