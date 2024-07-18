<script setup>
import Input from "../../components/Inputs/Input.vue";
import Button from "../../components/Buttons/Button.vue";
import {onMounted, reactive, ref} from "vue";

onMounted(() => {
  initFlowbite();
});

const showDeleteSection = ref(false);

const seeDeleteSection = () => {
  showDeleteSection.value = !showDeleteSection.value;
};

const modifyInformations = reactive({
  firstname: "",
  lastname: "",
  phone: "",
});

const submitModifyInformations = () => {
  console.log(modifyInformations);
};

const modifyPassword = reactive({
  currentPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
});

const submitModifyPassword = () => {
  console.log(modifyPassword);
}

const deleteAccount = reactive({
  password: "",
  deleteAccountPhrase: "",
});

const submitDeleteAccount = () => {
  console.log(deleteAccount);
};

</script>

<template>
  <div>
    <h1>Mon compte</h1>

    <div id="accordion-collapse" data-accordion="collapse" class="w-full mt-4">
      <h2 id="accordion-collapse-heading-1">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
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
            <form class="flex flex-col gap-y-2 flex-grow w-full mt-4" autocomplete="off" @submit.prevent="submitModifyInformations">
              <input type="text" autocomplete="false" name="hidden" class="hidden">
              <Input
                  type="text"
                  id="first-name"
                  name="first-name"
                  title="Prénom"
                  placeholder="Prénom"
                  v-model="modifyInformations.firstname"
              />
              <Input
                  type="text"
                  id="last-name"
                  name="last-name"
                  title="Nom"
                  placeholder="Nom"
                  v-model="modifyInformations.lastname"
              />
              <Input
                  type="text"
                  id="phone-number"
                  name="phone-number"
                  title="Numéro de téléphone"
                  placeholder="Numéro de téléphone"
                  v-model="modifyInformations.phone"
              />
              <Button
                  type="submit"
                  text="Modifier mes informations">
                Modifier mes informations
              </Button>
            </form>
          </div>
        </div>
      </div>
      <h2 id="accordion-collapse-heading-2">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 border-b-0" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
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
            <form class="flex flex-col gap-y-2 flex-grow w-full mt-4" autocomplete="off">
              <input type="text" autocomplete="false" name="hidden" class="hidden">
              <Input
                  type="password"
                  id="password"
                  name="password"
                  title="Mot de passe actuel"
                  placeholder="Mot de passe actuel"
              />
              <Input
                  type="password"
                  id="new-password"
                  name="new-password"
                  title="Nouveau mot de passe"
                  autocomplete="new-password"
                  placeholder="Nouveau mot de passe"
              />
              <Input
                  type="password"
                  id="new-password-confirm"
                  name="new-password-confirm"
                  title="Confirmer le mot de passe"
                  autocomplete="new-password"
                  placeholder="Confirmer le mot de passe"
              />
              <Button
                  type="submit"
                  text="Modifier le mot de passe"
              >
                Modifier le mot de passe
              </Button>
            </form>
          </div>
        </div>
      </div>
      <h2 id="accordion-collapse-heading-3">
        <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
          <span>Supprimer mon compte</span>
          <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
          </svg>
        </button>
      </h2>
      <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-3">
        <div class="p-5 border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-xl">

          <div v-if="!showDeleteSection">
            <p>Voulez-vous vraiment accéder à cette section ?</p>
            <Button @click="seeDeleteSection" class="mt-4" text="Je comprends les risques" />
          </div>
          <div v-else class="flex justify-between gap-x-4 flex-wrap">
            <p>
              La suppression de votre compte est une action irréversible.
            </p>
            <p>
              Celle-ci entraîne la suppression de toutes vos données personnelles.
            </p>
            <form class="flex flex-col gap-y-2 flex-grow w-full mt-4" autocomplete="off">
              <input type="text" autocomplete="false" name="hidden" class="hidden">
              <Input
                  type="password"
                  id="password"
                  name="password"
                  title="Mot de passe"
                  placeholder="Mot de passe"
                  autocomplete="new-password"
              />
<!--           add input where user types "j'accepte de supprimer mon compte   -->
              <p>Pour confirmer votre volonté, veuillez taper "Je souhaite supprimer mon compte".</p>
              <Input
                  type="text"
                  id="delete-account"
                  name="delete-account"
                  title="Supprimer mon compte"
                  placeholder="Taper la phrase ci-dessus"
              />
              <Button
                  type="submit"
                  text="Supprimer mon compte"
              >
                Supprimer mon compte
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>