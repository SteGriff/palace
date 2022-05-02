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

const newPalette = () => {
  store.addPalette();
}

</script>

<template>
  <header class="sans-serif w-100 pa3 ph3-ns bg-white bb bw2">
    <div class="db dt-ns mw9 center w-100">
      <div class="db dtc-ns v-mid tl">
        🏯
      </div>
      <div class="db dtc-ns v-mid tl">
        <a href="/" class="dib f5 f4-ns fw6 mt0 mb1 link black-70" title="Home">
          Palace
        </a>
      </div>
      <div class="db dtc-ns v-mid tl tr-ns mt2 mt0-ns">
        <span class="f6 ttu black-70 mr1 dib">
          Account
        </span>

        <span>
          <input ng-model="username" type="text" placeholder="username" class="pa1 ph2 h2
            b--black-60 black-80 bg-white bw1 ba" />

          <input ng-model="password" type="password" placeholder="password" class="pa1 ph2 h2
            b--black-60 black-80 bg-white bw1 ba" />

          <button type="button" 
              class="dib mv1 pa1 ph3 h2 w4
              b--black-80 black-80 bg-white bw1 ba
              b pointer">
            Login
          </button>

          <button type="button" v-if="store.isAnon"
              class="dib mv1 pa1 ph3 h2
              b--black-80 black-80 bg-white bw1 ba
              b pointer">
            Register
          </button>
        </span>
      </div>
    </div>
  </header>
  <main class="sans-serif ph2">
      <div v-for="(p, pix) in store.palettes" :key="pix" class="mv3 flex">
        <p class="f6 b mh2">{{pix}}</p>
        <p class="mh2"><input v-model="p.name" class="input-reset ba b--black "></p>

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
            </span>
            <div class="color-picker-shim">
              <color-picker 
                :pureColor="store.palettes[pix].colours[cix].toHex()"
                @update:pureColor="setColour($event, pix, cix)"
                 />
            </div>
          </div>
        </div>

      </div>

      <button
        type="button"
        class="bn white pointer br3 ph3 pv2 f6 db center tc bg-purple"
        @click="newPalette()"
        >+ Add</button>
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
