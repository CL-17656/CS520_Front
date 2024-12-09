import {apiClient, apiUrlEncodeClient} from './axiosConfig';

const getUserData = async(userId) =>{
    try {
        //const res = await apiUrlEncodeClient.get(`/admin/users/online?userInfoId=${userId}`);
        const res = await apiUrlEncodeClient.get(`/admin/users?isDelete=0&userInfoId=${userId}`);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

const changePassword = async(changePasswordData) =>{
    try {
        const res = await apiClient.put('/users/password', changePasswordData);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

const changeNickname = async(chanegNicknameData) =>{
    try {
        const res = await apiClient.put('/users/info', chanegNicknameData);
        return res.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
      }
}

export{getUserData};
export{changePassword};
export{changeNickname};