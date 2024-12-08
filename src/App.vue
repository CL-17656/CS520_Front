<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthenticationStore } from '@/stores/Auth';

const store = useAuthenticationStore();

function checkAuthenticated() {
  return store.isAuthenticated;
}

function checkIsProf() {
  return checkAuthenticated() && store.userType == "prof";
}

function checkisStu() {
  return checkAuthenticated() && store.userType == "stu";
}
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{name: 'studenthome'}" class="nav-link" v-if="checkisStu()">Home</RouterLink>
      <RouterLink :to="{name: 'instructorhome'}" class="nav-link" v-if="checkIsProf()">Home</RouterLink>
      <RouterLink :to="{name: 'start'}" class="nav-link" v-if="checkAuthenticated() == false">Start</RouterLink>
      <div>
        <RouterLink :to="{name : 'register'}" class="nav-link" v-if="checkAuthenticated() == false">Register</RouterLink>
      </div>
      <div>
        <RouterLink :to="{name: 'login'}" class="nav-link" v-if="checkAuthenticated() == false">Login</RouterLink>
      </div>
      <RouterLink :to="{name: 'userProfile'}" class="nav-link" v-if="checkAuthenticated() == true">Profile</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>