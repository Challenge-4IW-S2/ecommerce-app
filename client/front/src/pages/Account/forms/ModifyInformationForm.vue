<script setup>
import Button from "../../../components/Buttons/Button.vue";
import Input from "../../../components/Inputs/Input.vue";
import {reactive, ref} from "vue";

const modifyInformation = reactive({
  firstname: "",
  lastname: "",
  phone: "",
});

const modifyInformationMessage = ref("");

const submitModifyInformation = () => {

};
</script>

<template>
  <form class="flex flex-col gap-y-2 flex-grow w-full mt-4" autocomplete="off" @submit.prevent="submitmodifyInformation">
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
        placeholder="Numéro de téléphone"
        v-model="modifyInformation.phone"
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