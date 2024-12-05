import axios from 'axios';

// Fetch assignments that need grading for a specific quiz
export const fetchAssignmentsForGrading = async (projectId) => {
  try {
    const response = await apiClient.get(`/admin/project/${projectId}/analysis`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    throw error;
  }
}
// Save grade and feedback for a specific assignment
export const saveGrade = async (assignmentId, gradeData) => {
  const response = await axios.post(`/api/assignments/${assignmentId}/grade`, gradeData);
  return response.data;
};

