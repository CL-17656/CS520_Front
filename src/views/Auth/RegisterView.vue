<script setup>
import { reactive } from 'vue';
import { useAuthenticationStore } from '@/stores/Auth';

const registerData = reactive(
    {
        accountType: "",
        email: "",
        password: "",
        passwardCon: "",
    }
);

const errors = reactive(
    {
        accountType: [],
        email: [],
        password: [],
        passwardCon: [],
        shouldSubmit: true,
    }
);

function resetErrors()
{
    errors.accountType = [];
    errors.email = [];
    errors.password = [];
    errors.passwardCon = [];
    errors.shouldSubmit = true;
}

function submit()
{
    resetErrors();
    if(registerData.accountType == "") {
        errors.accountType.push("must select an account type")
        errors.shouldSubmit = false;
    }
    if(registerData.email == "") {
        errors.email.push("must enter an emial")
        errors.shouldSubmit = false;
    }
    if(registerData.password == "") {
        errors.password.push("must enter password")
        errors.shouldSubmit = false;
    }
    if(registerData.passwordCon == "") {
        errors.passwardCon.push("must enter password conformation")
        errors.shouldSubmit = false;
    }
    if(registerData.passwardCon != registerData.passward)
    {
        errors.passwardCon.push("password confirmation does not match passward")
        errors.shouldSubmit = false;
    }
    if(errors.shouldSubmit)
    {
        //post to server
    }
    console.log(errors)
    console.log(registerData)
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
        <input type="text" placeholder="Enter Email" v-model="registerData.email"/>
        <h1 class="text-red-600" v-if="errors.email.length > 0">{{errors.email[0]}}</h1>
    </div>

    <div>
        <input type="password" placeholder="Enter Password" v-model="registerData.password"/>
        <h1 class="text-red-600" v-if="errors.password.length > 0">{{errors.password[0]}}</h1>
    </div>

    <div>
        <input type="password" placeholder="Confirm Password" v-model="registerData.passwardCon"/>
        <h1 class="text-red-600" v-if="errors.passwardCon.length > 0">{{errors.passwardCon[0]}}</h1>
    </div>

    <button class="primary-btn">Register</button>
  </form>
</template>