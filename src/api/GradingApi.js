import axios from 'axios';

// Fetch assignments that need grading for a specific quiz
export const fetchAssignmentsForGrading = async (projectId) => {
  try {
    const response = await apiClient.get(`/project/${projectId}/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    throw error;
  }
}
// Save grade and feedback for a specific assignment
export const saveGrade = async (postVO) => {
  const response = await axios.post(`/project/updateGrade`, postVO);
  return response.data;
};

