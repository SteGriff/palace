import type { Palette } from "@/types/palette";
import { newPalette } from "@/util/factory";
import { defineStore } from "pinia";
import { api } from '../util/api';
import { toCloud, toLocal } from '../util/formatters';

export interface IAppState {
    session: any
    account: any
    email: string
    password: string
    message : string
    palettes: Palette[]
    selectedPalette : number
    selectedColour : number
}

const PALETTES = 'palettes';

export const usePalaceStore = defineStore('main', {
    state: () => ({
        session: null,
        account : null,
        email: '',
        password : '',
        message: '',
        palettes: [],
        selectedPalette : 0,
        selectedColour : 0
    } as IAppState),
    getters: {
        isAnon : (state) => !state.account,
    },
    actions: {
        async login () {
            console.log("Login");
            try {
                this.session = await api.createSession(this.email, this.password);
                console.log("Login:Session", this.session);
                this.account = await api.getAccount();
                console.log("Login:Account", this.account);
                await this.fetchPalettes();
                this.setMessage ("Logged in!");
            }
            catch (error) {
                this.setMessage ("Oops! Wrong email or password!");
            }
        },
        async logout () {
            console.log("Logout");
            await api.deleteCurrentSession();
            this.account = null;
        },
        async register(){
            console.log("Register");
            try {
                this.account = await api.createAccount(this.email, this.password, this.email);
                console.log("Register:Account", this.account);
                this.session = await api.createSession(this.email, this.password);
                console.log("Register:Session", this.session);
                this.setMessage ( "Registered!" );
            }
            catch (error) {

            }
        },
        async resolveSession() {
            try {
                this.session = await api.getSession();
                this.account = await api.getAccount();
            } catch (error) {
                this.session = await api.createAnonSession();
                this.account = null;
            }
            console.log("resolveSession", this.session, this.account);
            await this.fetchPalettes();
        },
        async fetchPalettes() {
            try {
                const storedPalettes = await api.listDocuments(PALETTES);
                console.log("palettes", storedPalettes);
                this.palettes = storedPalettes.documents.map(p => toLocal(p));
            } catch (error) {
                
            }
        },
        setMessage(msg : string) {
            this.message = msg;
            setTimeout(() => {this.message = ''}, 3000);
        },
        edit(paletteIndex : number, colourIndex: number) {
            // Just sets the currently editing palette
            console.log("edit", paletteIndex, colourIndex);
            this.selectedPalette = paletteIndex;
            this.selectedColour = colourIndex;
        },
        async addPalette() {
            const newPal = newPalette('Howdy')
            this.palettes.push(newPal);
            const cloudPal = toCloud(newPal);
            const permission = [`user:${this.session.userId}`];
            const creationResult = await api.createDocument(PALETTES, cloudPal, permission, permission);
            console.log("createResponse", creationResult);
        },
        async save(pal : Palette) {
            console.log("Save", pal);
            const cloudPal = toCloud(pal);
            const permission = [`user:${this.session.userId}`];
            await api.updateDocument(PALETTES, pal.id, cloudPal, permission, permission);
        },
        async delete(pal : Palette) {
            console.log("Delete", pal);
            const cloudPal = toCloud(pal);
            await api.deleteDocument(PALETTES, pal.id);
            this.palettes = this.palettes.filter(p => p.id !== pal.id);
        }
    }
})
