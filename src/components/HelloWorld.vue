<template>
  {{ msg }}
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{ msg: string }>();

onMounted(() => {
  test();
});
const test = () => {
  console.log("test");
};
const count = ref(0);
</script>
<style scoped>

</style>
