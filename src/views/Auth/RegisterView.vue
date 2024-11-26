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
    }
);

const registerSubmitData = reactive(
    {
        invitationCode: "",
        username: "",
        password: "",
    }
);

const errors = reactive(
    {
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
    errors.accountType = [];
    errors.username = [];
    errors.password = [];
    errors.passwordCon = [];
    errors.shouldSubmit = true;
}
    
const router = useRouter();
    
// function submit()
// {
//     resetErrors();
//     registerSuccess.regScucess = false;
//     if(registerData.accountType === "") {
//         errors.accountType.push("must select an account type");
//         errors.shouldSubmit = false;
//     }
//     if(registerData.email === "") {
//         errors.email.push("must enter an emial");
//         errors.shouldSubmit = false;
//     }
//     if(registerData.password === "") {
//         errors.password.push("must enter password");
//         errors.shouldSubmit = false;
//     }
//     if(registerData.passwordCon === "") {
//         errors.passwordCon.push("must enter password conformation");
//         errors.shouldSubmit = false;
//     }
//     if(registerData.passwordCon !== registerData.password)
//     {
//         errors.passwordCon.push("password confirmation does not match passward");
//         errors.shouldSubmit = false;
//     }
//     if(errors.shouldSubmit)
//     {
//         //post to server
//         //TEMPRORY
//         registerSuccess.regScucess = true; 
//         //TEMPRORY
//     }
//     //redirect to login page if success
//     //possibly need to move to another function as web request are async
//     console.log(registerSuccess.regScucess);
//     if(registerSuccess.regScucess)
//     {
//         alert(`Register Success, Navigating to Login`);
//         router.push({ name: 'login'});
//     }
//     console.log(errors);
//     console.log(registerData);
// }

// modified submit function:
async function submit() {
  errors.shouldSubmit = true;

  if (!registerData.accountType) {
    errors.accountType.push('Must select an account type');
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
    registerSubmitData.invitationCode = "123456"
    registerSubmitData.username = registerData.username;
    registerSubmitData.password = registerData.password;
    console.log(registerSubmitData);

    try {
      const response =await registerUser(registerSubmitData);
      if(response.flag == true) {
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
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
        </select>
        <h1 class="text-red-600" v-if="errors.accountType.length > 0">{{errors.accountType[0]}}</h1>
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
