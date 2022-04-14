<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { onMounted } from "vue";
import { usePalaceStore } from "./store/store";
import { toHex } from "./util/formatters";

const store = usePalaceStore();

onMounted(() => {
  store.startAnonSession();
});

</script>

<template>
  <main class="sans-serif ph2 measure center">

    <div v-for="p in store.palettes" class="mv3">

      <h2>{{ p.name }}</h2>

      <!-- Chips -->
      <div class="flex ba w-100">
        <div v-for="c in p.colours" class="pa2 flex-auto" :style="{ backgroundColor: toHex(c) }" @click="">{{ toHex(c) }}</div>
      </div>

      <!-- Editor -->
      <div>

      </div>
    </div>

    <button type="button" class="bn white pointer br3 ph3 pv2 f6 db center tc bg-purple">Create</button>

  </main>
</template>

