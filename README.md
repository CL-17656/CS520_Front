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
     - Text-based answers can be graded manually by instructors. The instructor can further manual grade the autograded questions in case there're some discrepancies in the predefined answers.
   
   Furthermore, instructors can also provide feedback for the entire quiz along with the   

6. **Statistics**:  
   - Instructors and students can view detailed quiz performance analytics.
     - **Student stats**:
        sfvvddsf

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



4. Start the development server:
   ```bash
   npm run serve
   ```
5. Access the application in your browser at `http://localhost:8090/`.

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

## Setting Up the Testing Environment

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









Required Dependencies
Vitest: For running tests.
npm install vitest --save-dev

Vue Test Utils: For testing Vue components.
npm install @vue/test-utils --save-dev

Pinia: For managing the global state in tests.
npm install pinia --save

jsdom: For simulating a browser environment.
npm install jsdom --save-dev

npx vitest





