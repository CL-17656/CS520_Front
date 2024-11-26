import apiClient from './axiosConfig';

const validateAssignmentId = async(assignmentId) =>{
    try {
        const res = await apiClient.get(`/assignmentquestion/quizId=${assignmentId}`);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

// const saveAnswers = async (quizId,answers) => {
//     try {
//       const res = await apiClient.post(`/assignmentquestion/quizId=${quizId}`, { answers });
//       return res.data;
//     } catch (error) {
//       console.error('Error saving answers:', error);
//       throw error;
//     }
// };

export{validateAssignmentId}