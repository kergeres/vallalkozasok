<template>
  <div class="card flex flex-column gap-4">
    <h1>{{ message }}</h1>

    <InputText v-model="firstName" placeholder="Keresztnév" />
    <InputText v-model="lastName" placeholder="Vezetéknév" />

    <div class="flex items-center gap-2">
      <Checkbox v-model="agree" inputId="agree" binary />
      <label for="agree">Elfogadom a feltételeket</label>
    </div>

    <Button label="Küldés" @click="submitForm" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import { database } from '../../firebase.ts';
import { ref as dbRef, push, onValue, off } from "firebase/database";

// Form state
const firstName = ref("");
const lastName = ref("");
const agree = ref(false);

// Realtime message
const message = ref("Loading...");

// Firebase reference a "some/path/to/data" helyett
const messageRef = dbRef(database, "message");
const entriesRef = dbRef(database, "entries");


// Realtime listener
const updateMessage = (snapshot: any) => {
  message.value = snapshot.val() || "Nincs adat";
};

onMounted(() => {
  onValue(entriesRef, (snapshot) => {
  console.log("Snapshot:", snapshot.val());
});
});

onUnmounted(() => {
  off(messageRef, "value", updateMessage); // memory leak megelőzés
});

// Submit form
const submitForm = () => {
  if (!firstName.value || !lastName.value || !agree.value) {
    alert("Töltsd ki az összes mezőt és pipáld ki a checkboxot!");
    return;
  }

  // Küldés a Realtime Database-be
  const entriesRef = dbRef(database, "entries");
  push(entriesRef, {
    firstName: firstName.value,
    lastName: lastName.value,
    agree: agree.value
  });

  alert(`Küldés sikeres! Név: ${firstName.value} ${lastName.value}`);

  // Törlés lokálisan
  firstName.value = "";
  lastName.value = "";
  agree.value = false;
};
</script>
