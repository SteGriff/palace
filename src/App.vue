<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { onMounted } from "vue";
import { usePalaceStore } from "./store/store";

const store = usePalaceStore();

onMounted(() => { 
  store.startAnonSession();
});
</script>

<template>
  <main class="sans-serif ph2">
    <h1>Hello {{ store.username }}</h1>
    <input v-model="store.username">
    <pre>{{store.session}}</pre>
  </main>
</template>

