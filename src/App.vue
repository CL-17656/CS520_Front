<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{name: 'studenthome'}" class="nav-link">Student Home</RouterLink>
      <RouterLink :to="{name: 'instructorhome'}" class="nav-link">Instructor Home</RouterLink>
      <RouterLink :to="{name: 'start'}" class="nav-link">Start</RouterLink>
      <div>
        <RouterLink :to="{name : 'register'}" class="nav-link">Register</RouterLink>
      </div>
      <div>
        <RouterLink :to="{name: 'login'}" class="nav-link">Login</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>