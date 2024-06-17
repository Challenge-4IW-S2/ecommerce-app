<script setup>
import {ref} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: 'Titre de mon input'
  },
  placeholder: String,
  type: {
    type: String,
    validator: (value) => ['text', 'email', 'password', 'number', 'date', 'datetime-local', 'month', 'search', 'tel', 'time', 'url', 'week', 'color'].includes(value),
    default: 'text'
  },
  id: String
})

let dynamicType = ref(props.type);

const value = defineModel('value');

function changeVisibility(){
  dynamicType.value = dynamicType.value === 'password'
      ? 'text'
      : 'password';
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="id">{{ title }}</label>
    <div class="w-full relative">
      <input :id="id" :type="dynamicType" :placeholder="placeholder" v-model="value" class="border border-black pl-3 py-2 placeholder:text:base w-full" >
      <span v-if="type === 'password'" class="absolute top-2/4 right-4 -translate-y-2/4 text-xs cursor-pointer" @click="changeVisibility">
        {{
          dynamicType === 'password' ? 'AFFICHER' : 'MASQUER'
        }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
