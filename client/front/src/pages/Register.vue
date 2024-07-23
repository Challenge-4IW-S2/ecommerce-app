<script setup>

import Input from "../components/Inputs/Input.vue";
import Button from "../components/Buttons/Button.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import { computed, reactive, ref } from "vue";
import { useRegisterLogin } from "../composables/useRegisterLogin.js";

const parameters = reactive({
  firstname: '',
  lastname: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: ''
});

const msgError = ref('');
const isSubmitted = ref(false);

const isEmailValid = computed(() => {
  const emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  const emailRegex = new RegExp(emailPattern);
  return emailRegex.test(parameters.email);
});

const isPasswordLongEnough = computed(() => {
  return parameters.password.length >= 12;
});

// refactorisable ?

const isPasswordUsingSpecialCharacters = computed(() => {
  const specialCharactersPattern = '.*[!@#$%^&*()_+\\-=\\[\\]{};:\'"\\|,.<>\\/?].*';
  const specialCharactersRegex = new RegExp(specialCharactersPattern);
  return specialCharactersRegex.test(parameters.password);
});

const isPasswordUsingCapitalLetters = computed(() => {
  const capitalLettersPattern = '.*[A-Z].*';
  const capitalLettersRegex = new RegExp(capitalLettersPattern);
  return capitalLettersRegex.test(parameters.password);
});

const isPasswordUsingLowercaseLetters = computed(() => {
  const lowercaseLettersPattern = '.*[a-z].*';
  const lowercaseLettersRegex = new RegExp(lowercaseLettersPattern);
  return lowercaseLettersRegex.test(parameters.password);
});

const canSubmit = computed(() => {
  return parameters.firstname.length > 0
      && parameters.lastname.length > 0
      && isEmailValid.value
      && isPasswordLongEnough.value
      && isPasswordUsingCapitalLetters.value
      && isPasswordUsingLowercaseLetters.value
      && isPasswordUsingSpecialCharacters.value
      && parameters.password === parameters.confirmPassword
      && parameters.email === parameters.confirmEmail;
});

const register = async () => {
  try {
    const json = {
      ...parameters
    };
    const { status } = await useRegisterLogin('signup', json);
    isSubmitted.value = true;
    if (status.value === 201) {
      msgError.value = 'Votre compte a bien été créé. Vous allez recevoir un e-mail de confirmation pour activer votre compte.';
    }

  } catch (error) {
    if (error.status.value === 409) {
      msgError.value = 'Un compte existe déjà avec cette adresse e-mail';
    } else {
      msgError.value = 'Une erreur est survenue pendant la création de votre compte. Veuillez réessayer plus tard.';
    }
    if (error.response) {
      const serverResponse = await error.response.json();
      msgError.value = serverResponse.message;
    } else {
      msgError.value = 'Une erreur est survene pendant la création de votre compte. Veuillez réessayer plus tard.';
    }
  }
};
</script>

<template>
  <div>
    <div class="m-auto max-w-125">
      <h1 class="mb-4">
        Créer votre compte Luzaya
      </h1>
      <div v-if="!isSubmitted">
        <small class="error" v-if="msgError">
          {{ msgError }}
        </small>
        <form @submit.prevent="register">
          <div class="flex flex-col gap-y-5">
            <Input id="firstname" title="Prénom" placeholder="Prénom" v-model="parameters.firstname" />
            <Input id="lastname" title="Nom" placeholder="Nom" v-model="parameters.lastname" />
            <div class="flex flex-col">
              <div class="flex flex-wrap flex-grow gap-y-5 gap-x-8">
                <Input id="email" type="email" title="Adresse e-mail" placeholder="Adresse e-mail" class="flex-grow"
                  v-model="parameters.email" />
                <Input id="confirme-email" type="email" title="Confirmer votre adresse e-mail"
                  placeholder="Adresse e-mail" class="flex-grow" v-model="parameters.confirmEmail" />
              </div>
              <span v-if="!isEmailValid && parameters.email.length > 0" class="text-sm error mt-2">
                L'adresse e-mail entrée n'est pas valide
              </span>
              <span v-else-if="parameters.confirmEmail.length > 0 && parameters.confirmEmail !== parameters.email"
                class="text-sm error mt-2">
                Les adresses ne correspondent pas
              </span>
            </div>
            <div class="flex flex-col">
              <div class="flex flex-wrap flex-grow gap-y-5 gap-x-8">
                <Input id="password" type="password" title="Mot de passe" placeholder="Mot de passe" class="flex-grow"
                  v-model="parameters.password" />
                <Input id="confirme-password" type="password" title="Confirmer votre mot de passe"
                  placeholder="Mot de passe" class="flex-grow" v-model="parameters.confirmPassword" />
              </div>
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
              <span v-if="parameters.confirmPassword.length > 0 && parameters.confirmPassword !== parameters.password"
                class="text-sm error mt-2">
                Les mots de passe ne correspondent pas
              </span>
            </div>
            <Button text="Devenir membre Luzaya" :disabled="!canSubmit" />
            <ButtonLink class-name="bg-transparent text-black border border-black h-12" text="Connexion" to="/login" />
          </div>
        </form>
      </div>
      <div v-else class="mt-2">
        <h2 class="text-center">
          Votre compte a bien été créé
        </h2>
        <p class="text-center">
          Vous allez recevoir un e-mail de confirmation pour activer votre compte.
        </p>
        <ButtonLink class-name="bg-black text-white border border-black h-12 mt-5" text="Connexion" to="/login" />
      </div>
    </div>
  </div>

</template>

<style scoped></style>
