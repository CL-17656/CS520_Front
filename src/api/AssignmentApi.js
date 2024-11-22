import apiClient from './axiosConfig';

const fetchquestions = async(quizId) =>{
    try {
        const res = await apiClient.get(`/assignmentquestion/quizId=${quizId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

const saveAnswers = async (quizId,answers) => {
    try {
      const res = await apiClient.post(`/assignmentquestion/quizId=${quizId}`, { answers });
      return res.data;
    } catch (error) {
      console.error('Error saving answers:', error);
      throw error;
    }
};

export{fetchquestions, saveAnswers}