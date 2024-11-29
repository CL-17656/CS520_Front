import apiClient from './axiosConfig';

// Fetch project and question details
export const fetchQuizDetails = (quizId) => {
  return apiClient.get(`/project/${quizId}/info`);
};

// Submit the answers we get from the user
export const submitQuizAnswers = (postVO) => {
  return apiClient.post(`/projects/post`, postVO);
};
