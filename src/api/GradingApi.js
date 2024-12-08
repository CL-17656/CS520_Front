import apiClient from './axiosConfig';
// Fetch assignments that need grading for a specific quiz
export const fetchAssignmentsForGrading = async (projectId,studentId) => {
  try {
    const response = await apiClient.get(`/project/${projectId}/history/${studentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    throw error;
  }
}

// Save grade and feedback for a specific assignment
export const saveGrade = async (postVO) => {
  const response = await apiClient.post(`/project/gradeUpdate`, postVO);
  return response.data;
};

