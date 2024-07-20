<script setup>
import {computed, onMounted} from "vue";
import ModifyInformationForm from "./forms/ModifyInformationForm.vue";
import ModifyPasswordForm from "./forms/ModifyPasswordForm.vue";
import DeleteAccountForm from "./forms/DeleteAccountForm.vue";
import {useUserAuthStore} from "../../store/userAuthStore.js";

onMounted(() => {
  initFlowbite();
});

const userAuthStore = useUserAuthStore();
const userDetails = userAuthStore.getUserDetails();

</script>

<template>
  <div>
    <h1>Mon compte</h1>

    <div id="accordion-collapse" data-accordion="collapse" class=" mt-4">
      <h2 id="accordion-collapse-heading-1">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
          <span>Modifier mes informations</span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-collapse-body-1" class="" aria-labelledby="accordion-collapse-heading-1">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <div class="flex justify-between gap-x-4 flex-wrap">
            <p>
              Vous pouvez modifier vos informations personnelles à tout moment.
            </p>
            <p>
              Celles-ci sont utilisées pour vous identifier et vous contacter.
            </p>
          </div>
          <ModifyInformationForm />
        </div>
      </div>
      <h2 id="accordion-collapse-heading-2">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 border-b-0" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
          <span>Modifier mon mot de passe</span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
        <div class="p-5 border border-gray-200 border-b-0 dark:border-gray-700">
          <div class="flex justify-between gap-x-4 flex-wrap">
            <p>
              La modification de votre mot de passe est une étape importante pour sécuriser votre compte.
            </p>
            <p>
              Celle-ci est effective dès lors que vous cliquez sur le bouton "Modifier le mot de passe".
            </p>
            <ModifyPasswordForm />
          </div>
        </div>
      </div>
      <h2 id="accordion-collapse-heading-3">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
          <span>Supprimer mon compte</span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
        <div class="p-5 border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-xl">
          <DeleteAccountForm />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>