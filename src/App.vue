<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { onMounted } from "vue";
import { usePalaceStore } from "./store/store";
import type { Palette } from "./types/palette";

const store = usePalaceStore();

onMounted(() => {
  store.startAnonSession();
});

</script>

<template>
  <main class="sans-serif ph2 flex">
    <div class="flex-auto">
      <div v-for="(p, pix) in store.palettes" :key="pix" class="mv3">
        <h2>{{ p.name }}</h2>

        <!-- Chips -->
        <div class="flex w-100">
          <div
            class="pa2 flex-auto"
            v-for="(c, cix) in p.colours"
            :key="cix"
            :style="{ backgroundColor: c }"
            @click="store.edit(pix, cix)"
          >{{ c }}</div>
        </div>

        <!-- Editor -->
        <div class="mv2">
          <!-- {{store.editingPalette?.name}} -->
         
          <color-picker v-model:pureColor="store.palettes[store.selectedPalette].colours[store.selectedColour]" />
        </div>
      </div>

      <button type="button" class="bn white pointer br3 ph3 pv2 f6 db center tc bg-purple">Create</button>
    </div>
    <div class="flex-auto pv3">
      Export
    </div>
  </main>
</template>

