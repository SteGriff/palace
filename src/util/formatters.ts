import {colord} from 'colord';

export function toCloud(pal : Palette): any {
    return {
        name : pal.name,
        colours : pal.colours.map(c => colord(c).toHex())
    }
}

export function toLocal(pal: any): Palette {
    return {
        id : pal["$id"],
        name : pal.name,
        colours: pal.colours.map(c => colord(c))
    }
}