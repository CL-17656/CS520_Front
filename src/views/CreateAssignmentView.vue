<script setup>
import { ref, computed, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from "axios";

const route = useRoute();
const router = useRouter();
const course = route.params.course; // Access the passed course from the route params

// If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
const courseDetails = computed(() => {
  return typeof course === 'string' ? JSON.parse(course) : course;
});

// Example questions data
const assignmentDetail = reactive(
  {
    status: "2", // Default to Quiz
    name: "New Quiz",
    grade: "100",
    isGrade: true,
    questions:[{questionType: "1", question: "Explain the concept of Big O notation and give an example.",
    sampleResponse:
      "Big O notation is used to describe the performance or complexity of an algorithm. It gives an upper bound on the time or space complexity in terms of the input size. For example, if an algorithm has a time complexity of O(n), it means the runtime grows linearly with the input size."
  , choices: [{choice: "", isCorrect: false}]},]}
);

//Add a new question
function addNewQueston()
{
    assignmentDetail.questions.push({questionType: "1", question: "", sampleResponse: "", choices: [{choice: "", isCorrect: false}]});
    console.log(assignmentDetail.questions);
}

//This button appears below each question, clicking it deletes the question
function removeQuestion(index)
{
    assignmentDetail.questions.splice(index, 1);
    console.log(assignmentDetail.questions[index])
}

//add a choice for multiple choice questions
function addChoice(index)
{
    assignmentDetail.questions[in].choices.push({choice: "", isCorrect: false});
}

//remove choice for multipke choice questions
function removeChoice(questionIndex, choiceIndex)
{
    assignmentDetail.questions[questionIndex].choices.splice(choiceIndex, 1);
}

//Save and submit the data using api, currently not implemented
//Also used to change datastructure to form acceptable by backend
  
// Format data to match backend requirements
function formatDataForBackend() {
  return {
    title: assignmentDetail.name,
    type: parseInt(assignmentDetail.status), // Quiz or Questionnaire
    isGrade: assignmentDetail.isGrade, // Whether this is graded
    grade: assignmentDetail.grade, // Total grade
    questions: assignmentDetail.questions.map((q) => ({
      questionTitle: q.question,
      type: parseInt(q.questionType),
      possibleAnswers:
        q.questionType === "1" || q.questionType === "2"
          ? JSON.stringify(q.choices.map((choice) => choice.choice))
          : null,
      correctAnswers:
        q.questionType === "1" || q.questionType === "2"
          ? JSON.stringify(
              q.choices.filter((choice) => choice.isCorrect).map((choice) => choice.choice)
            )
          : q.sampleResponse,
    })),
  };
}

// Submit data to the backend
async function submit() {
  const payload = formatDataForBackend();
  try {
    const response = await axios.post("/admin/questions", payload);
    alert("Quiz created successfully!");
    console.log("Response:", response.data);
    router.push("/instructor"); // Redirect to instructor home
  } catch (error) {
    console.error("Error creating quiz:", error);
    alert("Failed to create the quiz. Please try again.");
  }
}
  
</script>

<template>
    <div class="assignmentpage">
        <form @submit.prevent="submit" class="w-1/1 mx-auto space-y-6">
        <div class="assignmentbox">
            <div class="question">Enter Assignement Title: </div>
            <input type="title" placeholder="Enter Assignment Title:" v-model="assignmentDetail.name"/>
        <div class="display-bar">
        </div>

        <div class="question-box">
            <!-- Section: select assignment type -->
            <div class="question">Enter Assignement Type: </div>
            <select id="assignmentType" class="register" v-model="assignmentDetail.status">
                <option value="questionaire">Questionaire</option>
                <option value="quiz">Quiz</option>
            </select>
            <div class="assignment-scroll-bar">
                <li class="question-entry" v-for="(entry, index) in assignmentDetail.questions"
            :key="index">
                    <!-- Section: select question type, this controls diplay of future sections -->
                    <div class="question">Select Question Type:</div>
                    <select id="assignmentType" class="register" v-model="entry.questionType">
                        <option value="1">Single Choice</option>
                        <option value="2">Multiple Choice</option>
                        <option value="3">Fill in The Blank</option>
                    </select>

                    <!-- Section: Enter question -->
                    <div class="question">Enter Question:</div>
                    <input type="text" placeholder="Enter Question" v-model="entry.question"/>
                    
                    <!-- Section: multiple choice section -->
                    <div class="question" v-if="entry.questionType == 1 || entry.questionType == 2">Create Choices: </div>
                    <div class="question" v-if="entry.questionType == 1 || entry.questionType == 2" v-for="(choice, id) in entry.choices":key="id">
                        <input type="text" placeholder="Enter Choice" v-model="choice.choice"/>
                        <select id="isCorrect" class="register" v-model="choice.isCorrect">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        <button class="removeChoiceBtn" v-if="entry.questionType == 1 || entry.questionType == 2" @click="removeChoice(index, id)">Remove Choice</button>
                    </div>
                    <button class="questionBtn" v-if="entry.questionType == 1 || entry.questionType == 2" @click="addChoice(index)">Add Choice</button>

                    <!-- Section: Answer for Fill in the Blank -->
                    <div class="question" v-if="entry.questionType == 3">Enter Answer: </div>
                    <input type="text" placeholder="Enter Answer" v-if="entry.questionType == 3" v-model="entry.sampleResponse">

                    <!-- Section: delete question button -->
                    <button class="questionBtn" @click="removeQuestion(index)">Delete This Question</button>
                </li>
                <div>
                    <!-- Section: add question button -->
                    <button class="questionBtn" @click="addNewQueston">Add New Question</button>
                </div>    
            </div>
        </div>
        </div>   
        <button class="questionBtn">Save and Submit</button>
        </form>
    </div>
</template>

<style scoped>
.assignmentpage {
    padding: 2rem;
}

.title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
}
.assignmentbox{
    width:100%;
    background-color: pink;
    display: flex; 
    flex-direction: column;
    align-items: center; 
    justify-content: center;    
    
}
.display-bar{
    width: 100%;
    height: 50px;
    background-color: yellow;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; /* Ensure proper spacing between elements */
    padding: 0 1rem; /* Add some padding for better layout */
    box-sizing: border-box; /* Include padding in the element's width */
}
.question-box {
    border-color: 100px black;
    padding: 20px;
    width: 100%;
    height: 1000px;
    background-color: rgb(218, 211, 211);
    margin: auto;
    overflow: scroll;
    scrollbar-color: yellow;
    scrollbar-width: thin;
}

/* .assignment-scroll-bar{

} */

button {
  background-color: #004d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.questionBtn {
  margin-left: 2rem;
  padding: 1rem 2rem;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1rem;
}

.removeChoiceBtn {
  margin-left: 0.2rem;
  padding: 0.2rem 0.2rem;
  margin-top: 0.2rem;
  font-weight: bold;
  font-size: 1rem;
}

li {
  background-color: #99f0da;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 5px;
  list-style: none;
}

input textarea[type="text"] {
  padding: 0; /* Removes extra space inside the input */
  margin: 0;  /* Removes extra space outside the input */
  height: 80px;
  width: 100%; /* Ensures the input takes the full width of the container */
  box-sizing: border-box; /* Ensures padding and border are included in the total width */
}



</style>
