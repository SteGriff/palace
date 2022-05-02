import type { Palette } from "@/types/palette";
import { newPalette } from "@/util/factory";
import { defineStore } from "pinia";
import { api } from '../util/api';

export interface IAppState {
    session: any
    username: string
    palettes: Palette[],
    selectedPalette : number,
    selectedColour : number
}

export const usePalaceStore = defineStore('main', {
    state: () => ({
        session: null,
        username: 'anon',
        palettes: [newPalette()],
        selectedPalette : 0,
        selectedColour : 0
    } as IAppState),
    getters: {
        isAnon : (state) => state.username === 'anon',
    },
    actions: {
        async startAnonSession() {
            try {
                this.session = await api.getSession();
            } catch (error) {
                this.session = await api.createAnonSession();
            }
            console.log("startAnonSession", this.session);
        },
        edit(paletteIndex : number, colourIndex: number) {
            console.log("edit", paletteIndex, colourIndex);
            this.selectedPalette = paletteIndex;
            this.selectedColour = colourIndex;
        },
        addPalette() {
            this.palettes.push(newPalette('Sparkly'));
        },
        save() {
            
        }
        // increment() {
        //     this.count++
        // }
    }
})
