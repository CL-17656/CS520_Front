# Quiz Management System Documentation

## IMPORTANT: LINK TO SEPARATE BACKEND REPO. PLEASE CLONE THIS REPO AS WELL: https://github.com/bertiesh/CS520

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

The **Quiz Management System** is a robust platform designed to make the learning and teaching experience seamless and efficient. Our system is built for students and instructors, offering an easy-to-use interface for creating, taking, and managing quizzes.

With this system, instructors can effortlessly design quizzes, grade submissions (both automatically and manually), and analyze student performance through detailed statistics. Students, on the other hand, can take quizzes, view their results, and track their progress over time.
### Features

1. **Account Management**:  
   - Students and instructors can create accounts, log in, and manage their profiles.  

2. **Quiz Creation**:  
   - Instructors can design quizzes with various question types such as multiple-choice, single-choice, or text-based answers.

3. **Taking Quizzes**:  
   - Students can easily access and complete quizzes. The questions are displayed in card format to provide better readability for the users. The multichoices are well spaced and horizontally arranged to display each choice clearly.

4. **Grading Quizzes**:
   The instructors can grade and provide feedback for the quizzes taken by students. This feature has 2 components :  
   - **Automatic Grading**:  
     - Questions like multiple-choice and single-choice are automatically graded based on predefined correct answers. This helps to make the grading more efficient.
   - **Manual Grading**:  
     - Text-based answers can be graded manually by instructors. The instructor can further manual grade the autograded questions in case there're some discrepancies in the predefined answers.
   
   Furthermore, instructors can also provide feedback for the entire quiz along with the   

5. **Statistics**:  
   Instructors and students can view detailed quiz performance analytics. These statistics are very crucial for both to learn about the areas of improvement.
   - **Student stats**:
       - View the total score for the quiz
       - View both -- your answer and the correct answer
       - View the feedback provided by the instructor for the quiz
   - **Instructor stats**:
       - View the overall distribution of the unique quiz scores through the interactive charts.
       - Get better insights into the performance of the students by analysing single and multiple choice questions though interactive pie charts. The instructor can interact with the pie charts to get detailed distribution about the choices of the students.

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
3. Install redis:
   ```bash
   brew install redis
   ```
4. Install Java:
   ```bash
   brew install oracle-jdk --cask
   ```
5. Install mysql:
   ```bash
   brew install mysql
   ```
6. Install the required packages/dependencies:
   ```bash
   npm install
   ```
   #### Install Additional Dependencies
      - **Chart.js** (For rendering charts on the statistics page):
         ```bash
         npm install chart.js
         npm install chartjs-adapter-date-fns
         ```
      - **Axios** (For API calls):
         ```bash
         npm install --save axios vue-axios
         ```
      - **Pinia Plugin for Persisted Local Storage**:
         ```bash
         npm install pinia-plugin-persistedstate
         ```
      - **Moment.js** (For date formatting):
         ```bash
         npm install moment vue-moment
         ```
      - **ECharts** (Optional alternative for visualization):
         ```bash
         npm install echarts
         ```
      - **tough-cookie**:
         ```bash
         npm install tough-cookie
         ```
      - **axios-cookiejar-support**:
         ```bash
         npm install axios tough-cookie axios-cookiejar-support
         ```

---

## Configuration

1. **State Management**:  
   - Use Pinia with persisted state:
     ```bash
     npm install pinia-plugin-persistedstate
     ```

2. **Styling**:  
   - TailwindCSS can be optionally installed for advanced styling:
     ```bash
     npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
     ```

3. **Backend**:
   - Change database setup in CS520/src/main/resources/application.yml where spring.datasource.url should be the latter one(details in dataset information) created in database and password should be changed to your own root password.
   - After running the backend, see swagger api file in http://localhost:8898/doc.html.

p.s. the current front end hasn't implemented captcha functionality. If you want to use this, make sure you have redis installed. You could change your redis set up in CS520/src/main/resources/application.yml as well. Use `brew services start redis` to start redis in the backend.

4. **Datasets**:
   - Use `sqlcmd -s localhost -d cs520_project -i CS520/cs520.sql`  to create database for the project.

   - The default admin username and password are "admin" and "123456".

   - The default instructor username and password are "XXX" and "123456".

   - The default student username and password are "XXX" and "123456"

5. **Frontend**:
   - Start the development server:
     ```bash
     npm run dev
     ```
   - Access the application in your browser at `http://localhost:8090/`.



---

## Setting Up the Testing Environment (frontend)

### Testing Framework & Utilities
- **Vitest** (testing framework):
  ```bash
  npm install --save-dev vitest
  ```
  
- **Vue Test Utils** (for mounting and testing Vue components):
  ```bash
  npm install --save-dev @vue/test-utils
  ```

- **flush-promises** (to wait for asynchronous updates in tests):
  ```bash
  npm install --save-dev flush-promises
  ```
- **Pinia** (For managing the global state in tests):
  ```bash
  npm install --save pinia
  ```

### Running the Tests 
To run the unit tests:
```bash
npx vitest
```

If you need to run tests in watch mode:
```bash
npx vitest --watch
```

---

## Datasets

- The system does not use external datasets.
- All quizzes, questions, and answers are dynamically created and managed by instructors.
- Quiz data, student responses, and grading are stored in the system's database for real-time retrieval and analytics.
- For testing purposes, mock datasets can be added to the backend to simulate quiz and grading data. This will help in understanding the flow of quiz creation, participation, and grading.


---

## AI Models

Currently, the system does not use any AI models. Grading is handled based on predefined answer keys or manual input by instructors. However, the system can be enhanced in the future by integrating:

1. **Natural Language Processing (NLP)**:  
   - For automated grading of text-based answers, evaluating the quality of responses, and providing meaningful feedback.

2. **Machine Learning Models**:  
   - For predicting student performance trends or identifying areas where students need improvement.  

These AI models can improve grading efficiency and provide actionable insights for instructors and students.  

--- 


## Project Demo
https://drive.google.com/file/d/1kTNhGvHTUw_PcXh28FBYeDC8veBVXXqe/view?usp=sharing


---
---
