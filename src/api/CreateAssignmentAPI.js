import apiClient from './axiosConfig';
import apiUrlEncodeClient from './axiosConfigLogin';

const createQuestion = async(questionData) =>{
    try {
        const res = await apiClient.post('/admin/questions', questionData);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

const createAssignmentAndAddQuestion = async(AssignmentData) =>{
    try {
        const res = await apiClient.post('/admin/projects', AssignmentData);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

const messageTest = async(messageData) =>{
  try {
      const res =  await apiUrlEncodeClient.get(`/messages`);
      return res.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
}

export{createQuestion};
export{createAssignmentAndAddQuestion};
export{messageTest};