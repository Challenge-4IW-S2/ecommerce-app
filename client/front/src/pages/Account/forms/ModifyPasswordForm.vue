<script setup>
import Button from "../../../components/Buttons/Button.vue";
import Input from "../../../components/Inputs/Input.vue";
import {computed, reactive, ref} from "vue";
import ky from "ky";

const modifyPassword = reactive({
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const isPasswordLongEnough = computed(() => {
  return modifyPassword.newPassword.length >= 12;
});

const isPasswordUsingSpecialCharacters = computed(() => {
  const specialCharactersPattern = '.*[!@#$%^&*()_+\\-=\\[\\]{};:\'"\\|,.<>\\/?].*';
  const specialCharactersRegex = new RegExp(specialCharactersPattern);
  return specialCharactersRegex.test(modifyPassword.newPassword);
});

const isPasswordUsingCapitalLetters = computed(() => {
  const capitalLettersPattern = '.*[A-Z].*';
  const capitalLettersRegex = new RegExp(capitalLettersPattern);
  return capitalLettersRegex.test(modifyPassword.newPassword);
});

const isPasswordUsingLowercaseLetters = computed(() => {
  const lowercaseLettersPattern = '.*[a-z].*';
  const lowercaseLettersRegex = new RegExp(lowercaseLettersPattern);
  return lowercaseLettersRegex.test(modifyPassword.newPassword);
});

const modifyPasswordMessage = reactive({
  message: "",
  errors: {},
  success: false,
});

const canSubmit = computed(() => {
  return isPasswordLongEnough.value
      && isPasswordUsingCapitalLetters.value
      && isPasswordUsingLowercaseLetters.value
      && isPasswordUsingSpecialCharacters.value
      && modifyPassword.newPassword === modifyPassword.confirmNewPassword;
});

const submitModifyPassword = async () => {
  modifyPasswordMessage.message = "";
  modifyPasswordMessage.errors = {};
  modifyPasswordMessage.success = false;

  await ky.put(`${import.meta.env.VITE_API_BASE_URL}/change-password`, {
    json: modifyPassword,
    credentials: "include"
  }).then(res => {
    if (res.ok) {
      modifyPasswordMessage.message = "Votre mot de passe a bien été modifié";
      modifyPasswordMessage.success = true;
      modifyPassword.oldPassword = "";
      modifyPassword.newPassword = "";
      modifyPassword.confirmNewPassword = "";
    }
  }).catch(async (error) => {
    const httpCode = error.response.status;
    switch (httpCode) {
      case 401:
        modifyPasswordMessage.message = "Votre mot de passe actuel est incorrect";
        break;
      case 400:
        // if (error.response)
        const serverResponse = await error.response.json();
        if (serverResponse.errors && serverResponse.errors.length > 0) {
          modifyPasswordMessage.errors = serverResponse.errors;
          modifyPasswordMessage.message = "";
        } else {
          modifyPasswordMessage.message = "Les mots de passe ne correspondent pas";
        }
        break;
      case 500:
        modifyPasswordMessage.message = "Une erreur est survenue lors de la modification de votre mot de passe";
        break;
      default:
        modifyPasswordMessage.message = "Une erreur est survenue lors de la modification de votre mot de passe";
    }
  });
}
</script>

<template>
  <p :class="!modifyPasswordMessage.success ? 'text-red-600' : 'text-green-500'" class="mt-4" v-if="modifyPasswordMessage.message.length > 0">
    {{ modifyPasswordMessage.message }}
  </p>
  <ul class="text-red-600 mt-4" v-if="Object.keys(modifyPasswordMessage.errors).length > 0">
      <li v-for="(error, key) in modifyPasswordMessage.errors" :key="key">
        {{ error.message }}
      </li>
  </ul>
  <form class="flex flex-col gap-y-2 flex-grow w-full mt-4" autocomplete="off" @submit.prevent="submitModifyPassword">
    <Input
        type="password"
        id="password"
        name="password"
        title="Mot de passe actuel"
        placeholder="Mot de passe actuel"
        v-model="modifyPassword.oldPassword"
    />
    <Input
        type="password"
        id="new-password"
        name="new-password"
        title="Nouveau mot de passe"
        autocomplete="new-password"
        placeholder="Nouveau mot de passe"
        v-model="modifyPassword.newPassword"
    />
    <ul class="text-sm mt-2">
      <li class="checked" :class="isPasswordLongEnough ? 'success' : 'error'">
        Contient au moins 12 caractères
      </li>
      <li class="checked" :class="isPasswordUsingCapitalLetters ? 'success' : 'error'">
        Contient une majuscule
      </li>
      <li class="checked" :class="isPasswordUsingLowercaseLetters ? 'success' : 'error'">
        Contient une minuscule
      </li>
      <li class="checked" :class="isPasswordUsingSpecialCharacters ? 'success' : 'error'">
        Contient un caractère spécial
      </li>
    </ul>
    <Input
        type="password"
        id="new-password-confirm"
        name="new-password-confirm"
        title="Confirmer le mot de passe"
        autocomplete="new-password"
        placeholder="Confirmer le mot de passe"
        v-model="modifyPassword.confirmNewPassword"
    />
    <Button
        type="submit"
        text="Modifier le mot de passe"
        :disabled="!canSubmit">
      Modifier le mot de passe
    </Button>
  </form>

</template>

<style scoped>

</style>