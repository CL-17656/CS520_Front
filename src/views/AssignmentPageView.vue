<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const course = route.params.course; // Access the passed course from the route params

// If the course parameter is an object passed via `props`, you may need to convert it into a usable format.
const courseDetails = computed(() => {
  return typeof course === 'string' ? JSON.parse(course) : course;
});

// Example questions data
const assignmentDetail = ref(
  {
    type: "test",
    name: "Midterm Preparation",
    grade: "100",
    isGrade: true,
    questions:[{question: "Explain the concept of Big O notation and give an example.",
    sampleResponse:
      "Big O notation is used to describe the performance or complexity of an algorithm. It gives an upper bound on the time or space complexity in terms of the input size. For example, if an algorithm has a time complexity of O(n), it means the runtime grows linearly with the input size."
  },{question: "What is a data structure, and why is it important?",
    sampleResponse:
      "A data structure is a way of organizing and storing data so that it can be accessed and modified efficiently. They are important because they provide a means to manage large amounts of data effectively, which is crucial for creating efficient algorithms."
},
    {question: "How does a stack work, and what is a common use case?",
    sampleResponse:
      "A stack is a data structure that follows the Last In, First Out (LIFO) principle, where elements are added and removed from the top. A common use case is the call stack in programming, where function calls are stored and managed."
  },
  {
    question: "Explain the difference between a class and an object in object-oriented programming.",
    sampleResponse:
      "A class is a blueprint for creating objects, defining properties and methods. An object is an instance of a class, containing actual values and behaviors defined by the class. For example, 'Car' can be a class, while 'myCar' is an object of the Car class."
  },
  {

    question: "What is an algorithm, and how is it different from a program?",
    sampleResponse:
      "An algorithm is a step-by-step procedure for solving a problem, independent of any programming language. A program is a set of instructions written in a specific language to execute an algorithm on a computer."
  },
  {

    question: "What is a binary search algorithm, and when is it used?",
    sampleResponse:
      "A binary search algorithm is used to efficiently find an element in a sorted array. It repeatedly divides the search interval in half until the element is found or the interval is empty. It is faster than linear search for large, sorted datasets."
  },
  {

    question: "Describe what an abstract class is and how it is different from an interface.",
    sampleResponse:
      "An abstract class is a class that cannot be instantiated on its own and may contain both abstract methods (without implementation) and concrete methods (with implementation). An interface, however, only contains abstract methods. A class can implement multiple interfaces but can only inherit from one abstract class."
  },
  {

    question: "What is polymorphism in object-oriented programming?",
    sampleResponse:
      "Polymorphism is the ability of objects to take on multiple forms. It allows methods to perform different tasks based on the object that calls them, making code more flexible and reusable. A common example is method overloading or overriding."
  },
  {

    question: "How does a linked list differ from an array in terms of memory usage?",
    sampleResponse:
      "An array uses contiguous memory locations, which makes it easy to access elements by index but may lead to wasted memory if not fully utilized. A linked list uses scattered memory locations, where each node points to the next, allowing dynamic memory usage but requiring extra memory for storing pointers."
  },
  {

    question: "What is a deadlock in the context of multithreading, and how can it be prevented?",
    sampleResponse:
      "A deadlock occurs when two or more threads are waiting for each other to release resources, causing a cycle of dependency that prevents them from proceeding. Deadlock prevention techniques include acquiring locks in a specific order and using timeout mechanisms."
  }]}
);

function statisticpage(temp){
 console.log("hello!!")
}
</script>

<template>
    <div class="assignmentpage">
        <div class="title">{{assignmentDetail.name}}</div>
        <div class="display-bar">
            <div class="grade">Grade: {{ assignmentDetail.grade}}</div>
            <div class="statistic">
            <button class="statistic-btn" @click="statisticpage">statistic</button>
            </div>
        </div>

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

<style scoped>
.assignmentpage {
    padding: 2rem;
}

.title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
}
.display-bar{
    width: 100%;
    height:50px;
    background-color:yellow;
    flex-direction: row;
    display: flex;
    margin: auto;
}

.grade{
    font-size: 20px ;
    margin-bottom: 0.5rem;
}
.question-box {
    border-color: 100px black;
    padding: 20px;
    width: 1200px;
    height: 1000px;
    background-color: rgb(218, 211, 211);
    margin: auto;
    overflow: scroll;
    scrollbar-color: yellow;
    scrollbar-width: thin;
}

/* .assignment-scroll-bar{

} */

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
  height: 1000px;
  width: 100%; /* Ensures the input takes the full width of the container */
  box-sizing: border-box; /* Ensures padding and border are included in the total width */
}
</style>