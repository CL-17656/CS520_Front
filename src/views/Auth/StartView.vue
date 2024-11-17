<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Function to navigate to register
function navigateToRegister() {
  router.push({name: 'register'})
}

// Function to navigate to Login
function navigateToLogin() {
  router.push({name: 'login'})
}
</script>

<template>
  <main class="start">
    <h1 class="title">Welcome to Test Mangement</h1>

    <!-- Section: Courses Overview -->
    <section class="navigate">
      <button class="registerBtn" @click="navigateToRegister">Register</button>
    </section>
    <section class="navigate">
      <button class="loginBtn" @click="navigateToLogin">Login</button>
    </section>
  </main>
</template>

<style scoped>
.start {
  font-family: Arial, sans-serif;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.navigate{
  margin-bottom: 2rem;
}

button {
  background-color: #004d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.registerBtn {
  margin-left: 16.3rem;
  padding: 3rem 10rem;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 2rem;
}

.loginBtn {
  margin-left: 16.3rem;
  padding: 3rem 11.2rem;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 2rem;
}
</style>