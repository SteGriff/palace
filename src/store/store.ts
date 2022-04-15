import type { Palette } from "@/types/palette";
import { newPalette } from "@/util/factory";
import { defineStore } from "pinia";
import { api } from '../util/api';

export interface IAppState {
    session: any
    username: string
    palettes: Palette[],
    selectedPalette : number,
    selectedColour : number,
    editingPalette: Palette | null,
    editingColour: string | null
}

export const usePalaceStore = defineStore('main', {
    state: () => ({
        session: null,
        username: 'friend',
        palettes: [newPalette()],
        selectedPalette : 0,
        selectedColour : 0,
        editingPalette: null,
        editingColour: null
    } as IAppState),
    getters: {
        //double: (state) => state.count * 2,
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
            // this.editingPalette = palette;
            // this.editingColour = palette.colours[colourIndex];
        }
        // increment() {
        //     this.count++
        // }
    }
})
