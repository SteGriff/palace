<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { onMounted } from "vue";
import { usePalaceStore } from "./store/store";
import type { Palette } from "./types/palette";
import {colord} from 'colord';

const store = usePalaceStore();

onMounted(() => {
  store.startAnonSession();
});

const setColour = (event, pix, cix) => {
  console.log("setColour", event, pix, cix);
  store.palettes[pix].colours[cix] = colord(event);
}

const setHexColour = (event, pix, cix) => {
  const newHex = event.target.value;
  const newColour = colord(newHex);
  console.log("setHexColour", newHex, pix, cix);
  if (newHex.length < 7 || !newColour.isValid())
    return;
  
  store.palettes[pix].colours[cix] = newColour;
}

</script>

<template>
  <main class="sans-serif ph2 flex">
    <div class="flex-auto">
      <div v-for="(p, pix) in store.palettes" :key="pix" class="mv3">
        <h2>{{ p.name }}</h2>

        <!-- Chips -->
        <div class="flex w-100">
          <div
            class="pa2 flex-auto flex"
            v-for="(c, cix) in p.colours"
            :key="cix"
            :style="{ backgroundColor: c.toHex() }"
            @click="store.edit(pix, cix)"
          >
            <span class="mh2">
              <input class="input-reset bg-transparent bn w3"
                :value="c.toHex()" 
                @input="setHexColour($event, pix, cix)">
              <!-- {{ c.toHex() }} -->
            </span>
            <div class="color-picker-shim">
              <color-picker 
                :pureColor="store.palettes[pix].colours[cix].toHex()"
                @update:pureColor="setColour($event, pix, cix)"
                 />
            </div>
          </div>
        </div>

        <!-- Editor -->
        <div class="mv2">
          <!-- {{store.editingPalette?.name}} -->
<!--          
          <color-picker
            :pureColor="store.palettes[store.selectedPalette].colours[store.selectedColour]"
            @update:pureColor="setColor($event)"
            /> -->
        </div>
      </div>

      <button type="button" class="bn white pointer br3 ph3 pv2 f6 db center tc bg-purple">Create</button>
    </div>
    <div class="flex-auto pv3">
      Export
    </div>
  </main>
</template>
<style>
.color-picker-shim
{
  width: 50px;
  height: 24px;
  overflow: hidden;
  border: 2px solid white;
}
.color-picker-shim::after
{
  content: '✏';
  color: white;
  pointer-events: none;
  z-index: 999;
  position:relative;
  left: 16px;
  top: -22px;
}
</style>
