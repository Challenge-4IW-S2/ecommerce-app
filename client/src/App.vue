<script setup>
import Header from "./components/Header.vue";
import CardDescription from "./components/CardDescription.vue";
import Login from "./pages/Login.vue";
import User from "./pages/Dashboard/users/Users.vue";
import EditUser from "./pages/Dashboard/users/EditUser.vue";
</script>

<template>
    <Header/>
  <main>
    <strong>Current route path:</strong> {{ $route.fullPath }}

    <RouterView />
  </main>

</template>

<style scoped>

</style>
