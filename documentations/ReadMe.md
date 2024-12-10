# Quiz Management System Documentation

---

## Table of Contents

- [Introduction](#introduction)
  - [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Datasets](#datasets)
- [AI Models](#ai-models)

---

## Introduction

The **Quiz Management System** is a simple and user-friendly platform designed to help instructors and students manage quizzes effectively. It allows instructors to create and grade quizzes, students to take them, and both to view the results. The results for students give them detailed insights on their performance. This project ensures a smooth experience for both instructors and students, making quiz management and performance tracking effortless.
### Features

1. **Account Management**:  
   - Students and instructors can create accounts, log in, and manage their profiles.  

2. **Quiz Creation**:  
   - Instructors can design quizzes with various question types such as multiple-choice, single-choice, or text-based answers.

3. **Taking Quizzes**:  
   - Students can easily access and complete quizzes. The system offers real-time validation for certain question types.

4. **Grading Quizzes**:
   The instructors can grade and provide feedback for the quizzes taken by students. This feature has 2 components :  
   - **Automatic Grading**:  
     - Questions like multiple-choice and single-choice are automatically graded based on predefined correct answers. This helps to make the grading more efficient.
   - **Manual Grading**:  
     - Text-based answers can be graded manually by instructors.  
   
   Furthermore, instructors can also provide feedback for the entire quiz along with the   

6. **Statistics**:  
   - Instructors and students can view detailed quiz performance analytics.  
   - Interactive charts display correct/incorrect responses, average scores, and more for better insights.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (v6 or later)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <repository-folder>
   ```
3. Install the required packages/dependencies:
   ```bash
   npm install
   ```
4. Install required charting libraries:
   ```bash
    npm install echarts
   ```
5. Start the development server:
   ```bash
   npm run serve
   ```
6. Access the application in your browser at `http://localhost:8090/`.

---

## Configuration

1. **Environment Variables**:  
   - Create a `.env` file in the project root directory. Add the following configuration:
     ```env
     VUE_APP_API_BASE_URL=http://localhost:5000/api
     ```

2. **State Management**:  
   - Use Pinia with persisted state:
     ```bash
     npm install pinia-plugin-persistedstate
     ```

3. **Styling**:  
   - TailwindCSS can be optionally installed for advanced styling:
     ```bash
     npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
     ```

---

## Datasets

The system does not use external datasets. All quizzes, questions, and answers are dynamically created and managed by instructors. Quiz data, student responses, and grading are stored in the system's database for real-time retrieval and analytics.

For testing purposes, mock datasets can be added to the backend to simulate quiz and grading data. This will help in understanding the flow of quiz creation, participation, and grading.

---

## AI Models

Currently, the system does not use any AI models. Grading is handled based on predefined answer keys or manual input by instructors. However, the system can be enhanced in the future by integrating:

1. **Natural Language Processing (NLP)**:  
   - For automated grading of text-based answers, evaluating the quality of responses, and providing meaningful feedback.

2. **Machine Learning Models**:  
   - For predicting student performance trends or identifying areas where students need improvement.  

These AI models can improve grading efficiency and provide actionable insights for instructors and students.  

--- 



















3) Taking the quizzes :
Our system allows the students to take quizzes in a simple and user-friendly interface.




 
in order to see statistic please install chart.js<br/>
***npm install chart.js***<br/>
and<br/>
***npm install chartjs-adapter-date-fns***<br/>
<br/>
recording some dependencies:<br/>
chart:<br/>
***npm install chart.js***<br/>
***npm install chartjs-adapter-date-fns***<br/>
<br/>
axios:<br/>
***npm install --save axios vue-axios***<br/>
<br/>
tailwind(possibly not needed):<br/>
***npm install -D tailwindcss@latest postcss@latest autoprefixer@latest***<br/>
<br/>
Pinia persisted local storage<br/>
***npm install pinia-plugin-persistedstate***<br/>
<br/>
Vue Moment<br/>
***npm install moment vue-moment***<br/>
<br/>
tough-cookie<br/>
**npm install tough-cookie**<br/>
<br/>
axios-cookiejar-support<br/>
**npm install axios tough-cookie axios-cookiejar-support**<br/>

echart<br/>
**npm install echarts**<br/>
