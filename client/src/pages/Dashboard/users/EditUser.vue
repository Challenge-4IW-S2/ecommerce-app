<script setup>
import EditForm from "../../../components/Form/DynamicForm.vue";
import {computed, onMounted, ref} from "vue";
import ky from "ky";
import {useRoute} from "vue-router";
import DynamicForm from "../../../components/Form/DynamicForm.vue";
import {fetchModelStructure} from "../../functions/model.js";
const route = useRoute();
const modelName = 'User';
const modelStructure = ref([]);

const data = ref([]);
const inputs = ref([])
const id = computed(() => route.params.id);
const getRoleOptions = async () => {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/users/role`).json();
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
const getModelStructure = async () => {
  const [structure] = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/users/${id.value}`).json();
  console.log(structure)
  if (structure) {
    console.log(structure)
    modelStructure.value = structure.map(field => {
      if (field.name === 'role') {
        field.is = 'select';
        /* field.options = getRoles();
         field.options.then((data) => {
           field.options = data;
         });
         console.log(field.options)*/
        field.options = [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ];
      }
      if(field.type === 'UUID'){
        field.type = 'password';
      }
      if (field.type==='STRING'){
        field.type = 'text';
      }
      if(field.name === 'password'){
        field.type = 'password';
      }
      return field;
    });
  }
};

const fetchData = async () => {
  console.log("Fetching data")
  try {
    //Recuperer le user passer dans l'url
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/users/${id.value}`).json();
    if (response) {
      data.value = response;
      if (data.value.role) {
        const user_roles = await ky.post(`${import.meta.env.VITE_API_BASE_URL}/users/role`, {
          json: { role: data.value.role }
        }).json();
        inputs.value = Object.keys(data.value).map(async (key) => {
          if (key === 'role') {
            // Gérer le champ 'role' comme un select
            return {
              id: key,
              title: 'Role',
              type: 'select',
              //options: await getRoleOptions(), // Fonction pour récupérer les options de rôle
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
onMounted(() => {
  getModelStructure();
  //fetchData();
});

</script>

<template>
  <h1> Modification Utilisateur n°  </h1>
  <DynamicForm :inputs="modelStructure" @submit="handleFormSubmit"  />
</template>

<style scoped>

</style>