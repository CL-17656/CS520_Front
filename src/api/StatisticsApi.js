import apiClient from './axiosConfig';

// Fetch quiz results for all graded students
export async function fetchStudentResults(projectId) {
  try {
    const response = await apiClient.get(`/project/${projectId}/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    throw error;
  }
}
