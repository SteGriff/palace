<script setup lang="ts">
import { reactive } from "@vue/reactivity";

const state = reactive({
  person: 'Gromit'
})
</script>

<template>
  <main class="sans-serif ph2">
    <h1>Hello {{ state.person }}</h1>
    <input v-model="state.person">
  </main>
</template>

