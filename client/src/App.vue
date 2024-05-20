<script setup>
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Header from "./page-components/Header.vue";
import Footer from "./page-components/Footer.vue";

</script>

<template class="container">
  <Header :currentPage="currentPage" :changeView="changeView"></Header>
  <Login></Login>
<!--  <Register></Register>-->
  <Footer></Footer>
</template>