import type { Palette } from "@/types/palette";
import { newPalette } from "@/util/factory";
import { defineStore } from "pinia";
import { api } from '../util/api';

export interface IAppState {
    session: any
    username: string
    palettes : Palette[]
}

export const usePalaceStore = defineStore('main', {
    state: () => ({
        session: null,
        username : 'friend',
        palettes : [newPalette()]
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
        // increment() {
        //     this.count++
        // }
    }
})
