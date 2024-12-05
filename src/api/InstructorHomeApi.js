import apiUrlEncodeClient from './axiosConfigLogin';

const getAssignmentsByInstructorId = async(instructorId) =>{
    try {
        const res = await apiUrlEncodeClient.get(`/admin/projects?isDelete=0&userInfoId=${instructorId}`);
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