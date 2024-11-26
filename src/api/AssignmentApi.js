import apiClient from './axiosConfig';

export const fetchQuestions = (quizId) => {
  return apiClient.get(`/admin/questions/${quizId}`);
};

export const submitAnswers = (payload) => {
  return apiClient.post("/projects/post", payload);
};
