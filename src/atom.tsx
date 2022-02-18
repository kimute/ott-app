import { atom } from "recoil";


export interface LIst{
    id: string
}

interface MYlistState {
    [key: string]: LIst[];
}

export const myListstate = atom<MYlistState>({
    key:"lists",
    default:{
        "My LIst": [],
    },
})