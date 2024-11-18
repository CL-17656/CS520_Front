<script setup>
import { reactive } from 'vue';
import { useAuthenticationStore } from '@/stores/Auth';
import { useRouter } from "vue-router";
import { loginUser } from '@/api/AuthApi'; // added

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
        success: false,
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
    loginSuccess.success = false;
    if(loginData.accountType === "") {
        errors.accountType.push("must select an account type");
        errors.shouldSubmit = false;
    }
    if(loginData.email === "") {
        errors.email.push("must enter an emial");
        errors.shouldSubmit = false;
    }
    if(loginData.password === "") {
        errors.password.push("must enter password");
        errors.shouldSubmit = false;
    }
    if(errors.shouldSubmit)
    {
        //post to server
        //TEMPRORY
        loginSuccess.success = true; 
        //TEMPRORY
    }
    //redirect to login page if success
    //possibly need to move to another function as web request are async
    console.log(loginSuccess.success);
    if(loginSuccess.success)
    {
        if(loginData.accountType === "Instructor") {
            router.push({ name: 'instructorhome'});
        }
        else if(loginData.accountType === "Student")
        {
            router.push({ name: 'studenthome'});
        }
    }
    console.log(errors);
    console.log(loginData);
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

    <button class="primary-btn">Register</button>
  </form>
</template>
