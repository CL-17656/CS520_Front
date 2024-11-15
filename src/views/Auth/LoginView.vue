<script setup>
import { reactive } from 'vue';
import { useAuthenticationStore } from '@/stores/Auth';
import { useRouter } from "vue-router";

const loginData = reactive(
    {
        accountType: "",
        email: "",
        password: "",
    }
);

const errors = reactive(
    {
        accountType: [],
        email: [],
        password: [],
        shouldSubmit: true,
    }
);

const loginSuccess = reactive(
    {
        logSuccess: false,
    }
);

function resetErrors()
{
    errors.accountType = [];
    errors.email = [];
    errors.password = [];
    errors.shouldSubmit = true;
}

const router = useRouter();
function submit()
{
    resetErrors();
    loginSuccess.logSuccess = false;
    if(loginData.accountType === "") {
        errors.accountType.push("must select an account type")
        errors.shouldSubmit = false;
    }
    if(loginData.email === "") {
        errors.email.push("must enter an emial")
        errors.shouldSubmit = false;
    }
    if(loginData.password === "") {
        errors.password.push("must enter password")
        errors.shouldSubmit = false;
    }
    if(loginData.passwordCon !== loginData.password)
    {
        errors.passwordCon.push("password confirmation does not match passward")
        errors.shouldSubmit = false;
    }
    if(errors.shouldSubmit)
    {
        //post to server
        //TEMPRORY
        loginSuccess.logSuccess = true; 
        //TEMPRORY
    }
    console.log(errors)
    console.log(loginData)
}
</script>

<template>
  <main>
    <h1 class = "title"> Login into your account</h1>
  </main>

  <form @submit.prevent="submit" class="w-1/2 mx-auto space-y-6">
    <div>
        <label for="accountType" class="register">Select Account Type</label>
        <select id="accountType" class="register" v-model="loginData.accountType">
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
        </select>
        <h1 class="text-red-600" v-if="errors.accountType.length > 0">{{errors.accountType[0]}}</h1>
    </div>

    <div>
        <input type="text" placeholder="Enter Email" v-model="loginData.email"/>
        <h1 class="text-red-600" v-if="errors.email.length > 0">{{errors.email[0]}}</h1>
    </div>

    <div>
        <input type="password" placeholder="Enter Password" v-model="loginData.password"/>
        <h1 class="text-red-600" v-if="errors.password.length > 0">{{errors.password[0]}}</h1>
    </div>

    <button class="primary-btn">Login</button>
  </form>
</template>