<script setup>
import Button from "../../../components/Buttons/Button.vue";
import Input from "../../../components/Inputs/Input.vue";
import {reactive, ref} from "vue";

const showDeleteSection = ref(false);
const seeDeleteSection = () => {
  showDeleteSection.value = !showDeleteSection.value;
};

const deleteAccount = reactive({
  password: "",
  deleteAccountPhrase: "",
});

const submitDeleteAccount = () => {
  console.log(deleteAccount);
};
</script>

<template>
  <p>
    TODO: À FAIRE
  </p>
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
</template>

<style scoped>

</style>