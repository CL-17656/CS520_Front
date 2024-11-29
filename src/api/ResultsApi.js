import apiClient from './axiosConfig';

export async function fetchResults(projectId) {
  try {
    const response = await apiClient.get(`/project/${projectId}/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
}

