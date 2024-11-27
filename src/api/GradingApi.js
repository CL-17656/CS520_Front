import axios from 'axios';

// Fetch assignments that need grading for a specific quiz
export const fetchAssignmentsForGrading = async (quizId) => {
  const response = await axios.get(`/api/assignments/quiz/${quizId}/pending`);
  return response.data; 
}

// Save grade and feedback for a specific assignment
export const saveGrade = async (assignmentId, gradeData) => {
  const response = await axios.post(`/api/assignments/${assignmentId}/grade`, gradeData);
  return response.data;
};

