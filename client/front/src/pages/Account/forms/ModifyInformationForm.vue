<script setup>
import Button from "../../../components/Buttons/Button.vue";
import Input from "../../../components/Inputs/Input.vue";
import {computed, reactive} from "vue";
import ky from "ky";
import {useUserAuthStore} from "../../../store/userAuthStore.js";


const userAuthStore = useUserAuthStore();
const userDetails = userAuthStore.getUserDetails()

const modifyInformation = reactive({
  firstname: userDetails.firstname,
  lastname: userDetails.lastname,
  phone: userDetails.phone,
});


const modifyInformationMessage = reactive({
  message: "",
  errors: {},
  success: false,
});
const submitModifyInformation = async () => {
  modifyInformationMessage.message = "";
  modifyInformationMessage.errors = {};
  modifyInformationMessage.success = false;

  await ky.put(`${import.meta.env.VITE_API_BASE_URL}/update-profile`, {
    json: modifyInformation,
    credentials: "include"
  }).then(res => {
    if (res.ok) {
      modifyInformationMessage.message = "Vos informations ont bien été modifiées";
      modifyInformationMessage.success = true;
    }
  }).catch(async (error) => {
    const httpCode = error.response.status;
    switch (httpCode) {
      case 401:
        modifyInformationMessage.message = "Votre mot de passe actuel est incorrect";
        break;
      case 400:
        const serverResponse = await error.response.json();
        if (serverResponse.errors && serverResponse.errors.length > 0) {
          modifyInformationMessage.errors = serverResponse.errors;
          modifyInformationMessage.message = "";
        } else {
          modifyInformationMessage.message = "Les mots de passe ne correspondent pas";
        }
        break;
      case 500:
        modifyInformationMessage.message = "Une erreur est survenue lors de la modification de votre mot de passe";
        break;
      default:
        modifyInformationMessage.message = "Une erreur est survenue lors de la modification de votre mot de passe";
    }
  });
};

const checkIsPhoneNumber = (event) => {
  const maxLength = 10;
  const selectionLength = event.target.selectionEnd - event.target.selectionStart;
  const isControlKey = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key);

  if (event.target.value.length >= maxLength && selectionLength === 0 && !isControlKey) {
    event.preventDefault();
  }

  const numberRegex = /^[0-9]+$/;

  if (!numberRegex.test(event.key) && !isControlKey) {
    event.preventDefault();
  }
};
</script>

<template>
  <p :class="!modifyInformationMessage.success ? 'text-red-600' : 'text-green-500'" class="mt-4" v-if="modifyInformationMessage.message.length > 0">
    {{ modifyInformationMessage.message }}
  </p>
  <ul class="text-red-600 mt-4" v-if="Object.keys(modifyInformationMessage.errors).length > 0">
    <li v-for="(error, key) in modifyInformationMessage.errors" :key="key">
      {{ error.message }}
    </li>
  </ul>
  <form class="flex flex-col gap-y-2 flex-grow w-full mt-4" autocomplete="off" @submit.prevent="submitModifyInformation">
    <input type="text" autocomplete="false" name="hidden" class="hidden">
    <Input
        type="text"
        id="first-name"
        name="first-name"
        title="Prénom"
        placeholder="Prénom"
        v-model="modifyInformation.firstname"
    />
    <Input
        type="text"
        id="last-name"
        name="last-name"
        title="Nom"
        placeholder="Nom"
        v-model="modifyInformation.lastname"
    />
    <Input
        type="text"
        id="phone-number"
        name="phone-number"
        title="Numéro de téléphone"
        placeholder="Numéro de téléphone (10 chiffres, sans identifiant international)"
        v-model="modifyInformation.phone"
        @keydown="checkIsPhoneNumber($event)"
    />
    <Button
        type="submit"
        text="Modifier mes informations">
      Modifier mes informations
    </Button>
  </form>
</template>

<style scoped>

</style>