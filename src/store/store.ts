import type { Palette } from "@/types/palette";
import { newPalette } from "@/util/factory";
import { defineStore } from "pinia";
import { api } from '../util/api';

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

export const usePalaceStore = defineStore('main', {
    state: () => ({
        session: null,
        account : null,
        email: '',
        password : '',
        message: '',
        palettes: [newPalette()],
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
                this.setMessage ("Logged in!");
            }
            catch (error) {
                this.setMessage ("Oops! Wrong email or password!");
            }
        },
        logout () {
            console.log("Logout");
        }
        async register(){
            console.log("Register");
            try {
                this.account = await api.createAccount(this.email, this.password, this.email);
                console.log("Register:Account", this.account);
                this.session = await api.createSession(email, password);
                console.log("Register:Session", this.session);
                this.setMessage ( "Registered!" );
            }
            catch (error) {

            }
        },
        async resolveSession() {
            try {
                this.session = await api.getSession();
            } catch (error) {
                this.session = await api.createAnonSession();
                this.account = null;
            }
            console.log("resolveSession", this.session);
        },
        setMessage(msg : string) {
            this.message = msg;
            setTimeout(() => {this.message = ''}, 3000);
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
