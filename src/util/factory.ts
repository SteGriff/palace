
import type { Palette } from "@/types/palette";
import {colord} from 'colord';

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