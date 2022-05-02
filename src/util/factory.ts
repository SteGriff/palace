
import type { Palette } from "@/types/palette";
import {colord} from 'colord';
import { predicates } from 'friendly-words';

export function newPalette(name : string): Palette {
    return {
        name : name || 'Nice',
        colours : [
            colord('#046d8b'), 
            colord('#309292'), 
            colord('#2fb8ac'), 
            colord('#93a42a'), 
            colord('#ecbe13')
        ]
    }
}

export function toName(index : number) : string {
    //predicates
}