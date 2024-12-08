//import apiUrlEncodeClient from './axiosConfigLogin';
import {apiClient, apiUrlEncodeClient} from './axiosConfig';

const getAssignmentsByInstructorId = async(instructorId, pagenumber) =>{
    try {
        const res = await apiUrlEncodeClient.get(`/admin/projects?current=${pagenumber}&isDelete=0&userInfoId=${instructorId}`);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

const getStudentByAssignmentId = async(assignmentId) =>{
    try {
        const res = await apiUrlEncodeClient.get(`/admin/posts?projectId=${assignmentId}`);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

export{getAssignmentsByInstructorId}
export{getStudentByAssignmentId}