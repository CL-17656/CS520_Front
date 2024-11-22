<script setup>
import { ref, computed } from 'vue';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

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
    type: "test",
    name: "Midterm Preparation",
    grade: "100",
    isGrade: true,
    questions:[{question: "Explain the concept of Big O notation and give an example.",
    sampleResponse:
      "Big O notation is used to describe the performance or complexity of an algorithm. It gives an upper bound on the time or space complexity in terms of the input size. For example, if an algorithm has a time complexity of O(n), it means the runtime grows linearly with the input size."
  },]}
);

//Add a new question
function addNewQueston()
{
    assignmentDetail.questions.push({question: "", sampleResponse: "",});
    console.log(assignmentDetail.questions);
}

//This button appears below each question, clicking it deletes the question
function removeQuestion(key)
{
    assignmentDetail.questions.splice(key, 1);
    console.log(assignmentDetail.questions[key])
}

//Save and submit the data using api, currently not implemented
function submit()
{
    console.log(assignmentDetail)
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
            <div class="question">Enter Assignement Type: </div>
            <input type="title" placeholder="Enter Assignment Type" v-model="assignmentDetail.type"/>
            <div class="assignment-scroll-bar">
                <li class="question-entry" v-for="(entry, index) in assignmentDetail.questions"
            :key="index">
                    <div class="question">Enter Question:</div>
                    <input type="text" placeholder="Enter Question" v-model="entry.question"/>
                    <div class="question">Enter Answer: </div>
                    <input type="text" placeholder="Enter Answer" v-model="entry.sampleResponse"/>
                    <button class="questionBtn" @click="removeQuestion(index)">Delete This Question</button>
                </li>
                <div>
                    <button class="questionBtn" @click="addNewQueston">Add New Question</button>
                </div>    
            </div>
        </div>
        </div>   
        <button class="questionBtn">Save adn Submit</button>
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

li {
  background-color: #99f0da;
  padding: 1rem;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  border-radius: 5px;
  list-style: none;
}

input[type="text"] {
  padding: 0; /* Removes extra space inside the input */
  margin: 0;  /* Removes extra space outside the input */
  height: 80px;
  width: 100%; /* Ensures the input takes the full width of the container */
  box-sizing: border-box; /* Ensures padding and border are included in the total width */
}
</style>