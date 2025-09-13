<template>
  <div class="card flex flex-column gap-3">
    <h2>Űrlapbejegyzések</h2>
    <ul>
      <li v-for="entry in entries" :key="entry.id">
        {{ entry.firstName }} {{ entry.lastName }} - 
        Elfogadta: {{ entry.agree ? "igen" : "nem" }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { database } from "../firebase"
import { ref as dbRef, onValue, off } from "firebase/database";

const entries = ref([]); 

const entriesRef = dbRef(database, "entries");

function handleEntriesSnapshot(snapshot) {
  const val = snapshot.val();
  if (!val) {
    entries.value = [];
    return;
  }
  entries.value = Object.entries(val).map(([id, data]) => ({ id, ...data }));
}

onMounted(() => {
  onValue(entriesRef, handleEntriesSnapshot);
});

onUnmounted(() => {
  off(entriesRef, "value", handleEntriesSnapshot);
});
</script>

<style scoped></style>
