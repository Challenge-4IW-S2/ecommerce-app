<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ky from "ky";

onMounted(async () => {
  const router = useRouter();
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
      credentials: 'include',
    });
    if (response.ok) {
      await router.push('/');
    }
  } catch (e) {

  }
});
</script>

<template>
  <div>Déconnexion...</div>
</template>

