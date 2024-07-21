<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAPI } from '../composables/useAPI';

onMounted(async () => {
  const router = useRouter();
  try {
    const { results } = await useAPI('get', 'logout', {}, {}, 'include');
    const response = results;
    if (response.value.message === 'Logged out successfully') {
      await router.push('/');
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div>Déconnexion...</div>
</template>
