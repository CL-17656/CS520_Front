import apiClient from './axiosConfig';

// Fetch quiz results for all graded students
// export async function fetchAverageScore() {
//   try {
//     const response = await apiClient.get(`/admin/project/lineChart`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching average score:', error);
//     throw error;
//   }
// }
export async function fetchAssignmentDataAnalysis(projectId){
  try {
    const response = await apiClient.get(`/admin/project/${projectId}/analysis`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Assignment Data Analysis:', error);
    throw error;
  }
}

export async function fetchScoreDistribution(projectId){
  try {
    const response = await apiClient.get(`/admin/project/${projectId}/pieChart`);
    return response.data;
  } catch (error) {
    console.error('Error fetching score distribution:', error);
    throw error;
  }
}