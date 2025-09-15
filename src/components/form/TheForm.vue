<template>
  <div class="w-full flex flex-col gap-4 items-center ">
    <h2 class="text-xl font-semibold text-gray-200">Cégadatok űrlap</h2>

    <!-- Cégnév -->
    <FloatLabel variant="on" class="w-full md:w-[320px] ">
      <InputText
        :class="$style.myinput"
        id="company_name"
        v-model="companyName"
        :pt="{ root: 'bg-red-800 text-white' }"
        class="w-full text-gray-100 placeholder-gray-500 border border-gray-600 rounded-lg px-3 py-2"
      />
      <label for="company_name">Cégnév</label>
    </FloatLabel>

    <!-- Cím -->
    <FloatLabel variant="on" class="w-full md:w-[320px] ">
      <InputText
        id="company_address"
        v-model="companyAddress"
        class="w-full bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 rounded-lg px-3 py-2"
      />
      <label for="company_address">Cím</label>
    </FloatLabel>

    <!-- Email -->
    <FloatLabel variant="on" class="w-full md:w-[320px] ">
      <InputText
        id="company_email"
        v-model="companyEmail"
        type="email"
        class="w-full bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 rounded-lg px-3 py-2"
      />
      <label for="company_email">Email cím</label>
    </FloatLabel>

    <!-- Telefonszám -->
    <FloatLabel variant="on" class="w-full md:w-[320px] ">
      <InputText
        id="company_phone"
        v-model="companyPhone"
        type="tel"
        class="w-full bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 rounded-lg px-3 py-2"
      />
      <label for="company_phone">Telefonszám</label>
    </FloatLabel>

    <!-- Weboldal -->
    <FloatLabel variant="on" class="w-full md:w-[320px] ">
      <InputText
        id="company_website"
        v-model="companyWebsite"
        type="url"
        class="w-full bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-600 rounded-lg px-3 py-2"
      />
      <label for="company_website">Weboldal</label>
    </FloatLabel>

    <!-- Checkbox -->
    <div class="flex items-center gap-2 w-full md:w-[320px] ">
      <Checkbox v-model="agree" inputId="agree" binary />
      <label for="agree" class="text-gray-300">Elfogadom a feltételeket</label>
    </div>

    <!-- Küldés -->
    <Button
      label="Küldés"
      @click="submitForm"
      class="w-full md:w-[320px] mt-8
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { database } from "../../firebase.ts";
import { ref as dbRef, push, onValue, off } from "firebase/database";

// Form mezők
const companyName = ref("");
const companyAddress = ref("");
const companyEmail = ref("");
const companyPhone = ref("");
const companyWebsite = ref("");
const agree = ref(false);

  const companiesRef = dbRef(database, "companies");


onMounted(() => {
  onValue(companiesRef, (snapshot) => {
    console.log("Snapshot:", snapshot.val());
  });
});

onUnmounted(() => {
  off(companiesRef, "value");
});

const submitForm = () => {
  if (
    !companyName.value ||
    !companyAddress.value ||
    !companyEmail.value ||
    !companyPhone.value ||
    !companyWebsite.value ||
    !agree.value
  ) {
    alert("Töltsd ki az összes mezőt és pipáld ki a checkboxot!");
    return;
  }

  alert("Űrlap sikeresen elküldve!");

  // Küldés a Realtime Database-be
  const companiesRef = dbRef(database, "companies");
  push(companiesRef, {
    companyAddress: companyAddress.value,
    companyName: companyName.value,
    companyEmail: companyEmail.value,
    companyPhone: companyPhone.value,
    companyWebsite: companyWebsite.value,
    agree: agree.value,
  });

  alert(`Küldés sikeres! Név: ${companyName.value}`);

  // Törlés lokálisan
  companyAddress.value = "";
  companyName.value = "";
  companyEmail.value = "";
  companyPhone.value = "";
  companyWebsite.value = "";
  agree.value = false;
};
</script>

<style module>
.myinput {
}
</style>
