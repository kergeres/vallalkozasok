<template>
  <div class="card flex flex-wrap justify-center gap-4">
    <InputText v-model="firstName" placeholder="Keresztnév" />
    <InputText v-model="lastName" placeholder="Vezetéknév" />
    <div class="flex items-center gap-2">
    <Checkbox  v-model="agree" inputId="agree" binary /> 
    <label for="agree"> Elfogadom a feltételeket </label>
    </div>
    <Button label="Küldés" @click="submitForm" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";

const firstName = ref("");
const lastName = ref("");
const agree = ref(false);

const submitForm = () => {
  if (!firstName.value || !lastName.value || !agree.value) {
    alert("Töltsd ki az összes mezőt és pipáld ki a checkboxot!");
    return;
  }
  alert(`Küldés sikeres! Név: ${firstName.value} ${lastName.value}`);
};
</script>

<style scoped>
.card {
  max-width: 400px;
  margin: 2rem auto;
}
</style>
