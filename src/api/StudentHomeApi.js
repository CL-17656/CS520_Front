//import apiClient from './axiosConfig';
//import apiUrlEncodeClient from './axiosConfigLogin';
import {apiClient, apiUrlEncodeClient} from './axiosConfig';

/*
const validateAssignmentId = async(assignmentId) =>{
    try {
        const res = await apiClient.get(`/assignmentquestion/quizId=${assignmentId}`);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}*/

// const saveAnswers = async (quizId,answers) => {
//     try {
//       const res = await apiClient.post(`/assignmentquestion/quizId=${quizId}`, { answers });
//       return res.data;
//     } catch (error) {
//       console.error('Error saving answers:', error);
//       throw error;
//     }
// };

const getAssignmentsStudentTaken = async(studentId) =>{
  try {
      const res = await apiUrlEncodeClient.get(`/admin/posts?isDelete=0&userInfoId=${studentId}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
}

const getAssignmentByProjectId = async(projectId) =>{
  try {
      const res = await apiUrlEncodeClient.get(`/admin/project/${projectId}/info`);
      return res.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
}

const getInstructorInfo = async(instructorId) =>{
  try {
      const res = await apiUrlEncodeClient.get(`/admin/users?isDelete=0&userInfoId=${instructorId}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
}

export{getAssignmentsStudentTaken}
export{getAssignmentByProjectId}
export{getInstructorInfo}