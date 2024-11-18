import apiClient from './axiosConfig';

// This will allow us to make API calls to fetch test scores and grade distributions.
export const fetchTestScores = async (courseId) => {
  try {
    const response = await apiClient.get(`/statistics/scores?courseId=${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching test scores:', error);
    throw error;
  }
};

export const fetchGradeDistribution = async (quizId) => {
  try {
    const response = await apiClient.get(`/statistics/grades?quizId=${quizId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching grade distribution:', error);
    throw error;
  }
};
