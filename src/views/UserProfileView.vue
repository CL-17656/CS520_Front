<script setup>
import { reactive } from 'vue';
import { changeNickname, changePassword, getUserData } from '@/api/UserProfileApi';
import { onMounted } from 'vue';
import { useAuthenticationStore } from '@/stores/Auth';

const store = useAuthenticationStore();

const userData = reactive(
  {
    username: "",
    userNickname: "",
    userID: "",
    role: "",
  }
);

const newPasswordData = reactive(
  {
    newPassword: "",
    confirmNewPassword: "",
  }
);

const errors = reactive(
    {
        nickname: [],
        password: [],
        confirmPassword: [],
        shouldSubmit: true,
    }
);

const newNicknameData = reactive(
    {
        newNickname: "",
    }
);

//initialzie page
const initialize = async () => {
  console.log(store.userId);
  try {
    const pageData = await getUserData(store.userId);
    console.log(pageData);
    userData.username = store.userName;
    userData.userID = store.userId;
    if(store.userType === 'stu') {
        userData.role = "Student";
    }
    else {
        userData.role = "Instructor";
    }
    userData.userNickname = pageData.data.recordList[0].nickname;
  }
  catch(error) {
    console.log(error);
  }
};
onMounted(() => initialize());

async function submitChangeNickname() {
    errors.nickname = [];
    errors.shouldSubmit = true;
    if(!newNicknameData.newNickname) {
        errors.nickname.push('Must enter a new nickname');
        errors.shouldSubmit = false;
    }

    if(errors.shouldSubmit) {
        const res = await changeNickname({
            "nickname": newNicknameData.newNickname,
        });
        console.log(res);
        if(res.flag) {
            newNicknameData.newNickname = "";
            location.reload();
        }
    }
}

async function sumbitChangePassword() {
    errors.password = [];
    errors.confirmPassword = [];
    errors.shouldSubmit = true;

    if (!newPasswordData.newPassword) {
        errors.password.push('Must enter a password');
        errors.shouldSubmit = false;
    }
    if (newPasswordData.confirmNewPassword !== newPasswordData.newPassword) {
        errors.confirmPassword.push('Passwords do not match');
        errors.shouldSubmit = false;
    }

    if(errors.shouldSubmit) {
        const res = await changePassword({
            "invitationCode": "123456",
            "password": newPasswordData.newPassword,
            "role": store.userType,
            "username": store.userName
        });
        console.log(res);
        if(res.flag === true) {
            alert("Succesfully changed password");
            newPasswordData.newPassword = "";
            newPasswordData.confirmNewPassword = "";
        }
        else {
            alert("Change password failed, please try again");
        }
    }
}
</script>

<template>
  <main class="profile-page">
    <!-- Display Course Title -->
    <h1 class="title">User Profile</h1>

    <!-- Section: Courses Overview -->
    <section class="profile-section">
        <h1 class="sub-title">User Name: </h1>
        <h1 class="sub-title">{{ userData.username }} </h1>
    </section>
    <section class="profile-section">
        <h1 class="sub-title">User ID: </h1>
        <h1 class="sub-title">{{ userData.userID }} </h1>
    </section>
    <section class="profile-section">
        <h1 class="sub-title">User NickName: </h1>
        <h1 class="sub-title">{{ userData.userNickname }} </h1>
        <h1 class="head">Change NickName: </h1>
        <input type="text" placeholder="Enter New Nickname" v-model="newNicknameData.newNickname"/>
        <h1 class="text-red-600" v-if="errors.nickname.length > 0">{{errors.nickname[0]}}</h1>
        <button class="change-password-btn" @click="submitChangeNickname()">Change Nickname</button>
    </section>
    <section class="profile-section">
        <h1 class="sub-title">User Role: </h1>
        <h1 class="sub-title">{{ userData.role }} </h1>
    </section>
    <section class="profile-section">
        <h1 class="sub-title">Change Password: </h1>
        <h1 class="head">Change Password: </h1>
        <input type="password" placeholder="Enter Password" v-model="newPasswordData.newPassword"/>
        <h1 class="text-red-600" v-if="errors.password.length > 0">{{errors.password[0]}}</h1>
        <h1 class="head">Confirm Password: </h1>
        <input type="password" placeholder="Enter Password" v-model="newPasswordData.confirmNewPassword"/>
        <h1 class="text-red-600" v-if="errors.confirmPassword.length > 0">{{errors.confirmPassword[0]}}</h1>
        <button class="change-password-btn" @click="sumbitChangePassword()">Change Password</button>
    </section>
  </main>
</template>

<style scoped>
.profile-page {
  padding: 2rem;
}

.profile-section {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  margin-top: 1rem;
  margin-left: 21rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.sub-title {
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
}

.head {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.profile-page {
  padding: 2rem;
}

button {
  background-color: #004d4d;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

button:hover {
  background-color: #006666;
}

.change-password-btn {
  margin-top: 1rem;
  font-weight: bold;
}
</style>