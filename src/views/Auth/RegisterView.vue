<script setup>
import { reactive } from 'vue';
import { useAuthenticationStore } from '@/stores/Auth';
import { useRouter } from "vue-router";
import { registerUser } from '@/api/AuthApi'; // added

const registerData = reactive(
    {
        accountType: "",
        username: "",
        password: "",
        passwordCon: "",
        invitationCode: "",
    }
);

const registerSubmitData = reactive(
    {
        invitationCode: "",
        username: "",
        role: "",
        password: "",
    }
);

const errors = reactive(
    {
        invitationCode: [],
        accountType: [],
        username: [],
        password: [],
        passwordCon: [],
        shouldSubmit: true,
    }
);

const registerSuccess = reactive(
    {
        regScucess: false,
    }
);

function resetErrors()
{
    errors.invitationCode = [];
    errors.accountType = [];
    errors.username = [];
    errors.password = [];
    errors.passwordCon = [];
    errors.shouldSubmit = true;
}
    
const router = useRouter();

// modified submit function:
async function submit() {
  resetErrors();

  if (!registerData.accountType) {
    errors.accountType.push('Must select an account type');
    errors.shouldSubmit = false;
  }
  if (!registerData.invitationCode) {
    errors.invitationCode.push('Must Enter an invitation code');
    errors.shouldSubmit = false;
  }
  if (!registerData.username) {
    errors.username.push('Must enter an username');
    errors.shouldSubmit = false;
  }
  if (!registerData.password) {
    errors.password.push('Must enter a password');
    errors.shouldSubmit = false;
  }
  if (registerData.password !== registerData.passwordCon) {
    errors.passwordCon.push('Passwords do not match');
    errors.shouldSubmit = false;
  }

  if (errors.shouldSubmit) {
    //create data structure for back end
    registerSubmitData.invitationCode = registerData.invitationCode;
    registerSubmitData.username = registerData.username;
    registerSubmitData.role = registerData.accountType;
    registerSubmitData.password = registerData.password;
    console.log(registerSubmitData);

    try {
      const response =await registerUser(registerSubmitData);
      if(response.flag == true) {
        alert("Succesfully registered, going to login")
        router.push({ name: 'login' });
      }
      else {
        console.error('Registration failed:', response);
        errors.username.push('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      errors.username.push('Registration failed. Please try again.');
    }
  }
}

</script>

<template>
  <main>
    <h1 class = "title"> Register a new account</h1>
  </main>

  <form @submit.prevent="submit" class="w-1/2 mx-auto space-y-6">
    <div>
        <label for="accountType" class="register">Select Account Type</label>
        <select id="accountType" class="register" v-model="registerData.accountType">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
        </select>
        <h1 class="text-red-600" v-if="errors.accountType.length > 0">{{errors.accountType[0]}}</h1>
    </div>

    <div>
        <input type="text" placeholder="Enter invitationCode" v-model="registerData.invitationCode"/>
        <h1 class="text-red-600" v-if="errors.invitationCode.length > 0">{{errors.invitationCode[0]}}</h1>
    </div>

    <div>
        <input type="text" placeholder="Enter Username" v-model="registerData.username"/>
        <h1 class="text-red-600" v-if="errors.username.length > 0">{{errors.username[0]}}</h1>
    </div>

    <div>
        <input type="password" placeholder="Enter Password" v-model="registerData.password"/>
        <h1 class="text-red-600" v-if="errors.password.length > 0">{{errors.password[0]}}</h1>
    </div>

    <div>
        <input type="password" placeholder="Confirm Password" v-model="registerData.passwordCon"/>
        <h1 class="text-red-600" v-if="errors.passwordCon.length > 0">{{errors.passwordCon[0]}}</h1>
    </div>

    <button class="primary-btn">Register</button>
  </form>
</template>
