<script setup>
import EditForm from "../../../components/Form/DynamicForm.vue";
import {computed, onMounted, ref} from "vue";
import ky from "ky";
import {useRoute} from "vue-router";
const route = useRoute();
const data = ref([]);
const inputs = ref([])
const id = computed(() => route.params.id);
const getRoleOptions = async () => {
  try {
    const response = await ky.get("http://localhost:8000//users/role").json();
    if (response) {
      console.log(response)
      return response.map((role) => {
        return {
          value: role.id,
          text: role.name
        };
      });

    } else {
      console.log('No data found');
    }
  } catch (error) {
    console.error('Failed to fetch roles:', error);
  }
};

const fetchData = async () => {
  console.log("Fetching data")
  try {
    //Recuperer le user passer dans l'url
    const response = await ky.get(`http://localhost:8000/users/${id.value}`).json();
    if (response) {
      data.value = response;
      if (data.value.role) {
        const user_roles = await ky.post("http://localhost:8000/users/role", {
          json: { role: data.value.role }
        }).json();
        inputs.value = Object.keys(data.value).map(async (key) => {
          if (key === 'role') {
            // Gérer le champ 'role' comme un select
            return {
              id: key,
              title: 'Role',
              type: 'select',
              options: await getRoleOptions(), // Fonction pour récupérer les options de rôle
              value: data.value[key]
            };
          } else if (key === 'id') {
            // Gérer le champ 'id' comme désactivé
            return {
              id: key,
              title: key.charAt(0).toUpperCase() + key.slice(1),
              type: 'text',
              placeholder: `Enter ${key}`,
              value: data.value[key],
              disabled: true // Champ désactivé
            };
          } else {
            return {
              id: key,
              title: key.charAt(0).toUpperCase() + key.slice(1),
              type: getTypeForKey(key),
              placeholder: `Enter ${key}`,
              value: data.value[key]
            };
          }

        });

      }

    } else {

      console.log('No data found');
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
}
const getTypeForKey = (key) => {
  switch (key) {
    case 'email':
      return 'email';
    case 'password':
      return 'password';
    case 'phone':
      return 'tel';
    case 'is_verified':
      return 'select';
    case 'role':
      return 'select';
    default:
      return 'text';
  }
};

// Appeler fetchData lors du montage du composant
onMounted(fetchData);


</script>

<template>
  <h1> Modification Utilisateur n°  </h1>
  <EditForm :inputs="inputs" />
</template>

<style scoped>

</style>