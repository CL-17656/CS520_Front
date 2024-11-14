<script setup>
import { reactive } from 'vue';
import { useAuthenticationStore } from '@/stores/Auth';

const registerData = reactive(
    {
        accountType: "",
        email: "",
        password: "",
        passwardCom: "",
    }
);
</script>

<template>
  <main>
    <h1 class = "title"> Register a new account</h1>
  </main>

  <form @submit.prevent="console.log(registerData)" class="w-1/2 mx-auto space-y-6">
    <div>
        <label for="accountType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Account Type</label>
        <select id="accountType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="registerData.accountType">
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
        </select>
    </div>

    <div>
        <input type="text" placeholder="Email" v-model="registerData.email"/>
    </div>

    <div>
        <input type="password" placeholder="Password" v-model="registerData.password"/>
    </div>

    <div>
        <input type="password" placeholder="Confirm Password" v-model="registerData.passwardCom"/>
    </div>

    <button class="primary-btn">Register</button>
  </form>
</template>