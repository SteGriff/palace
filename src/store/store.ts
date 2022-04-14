import { defineStore, getActivePinia } from "pinia";
import { api } from '../util/api';

export interface IAppState {
    session: any
    username: string
}

export const usePalaceStore = defineStore('main', {
    state: () => ({
        session: null,
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
