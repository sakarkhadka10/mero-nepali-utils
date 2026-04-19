import { EN_TO_NP } from "../data/numberData";

export function toNepaliNumber(input:string | number): string{
    return String(input).replace(/[0-9]/g, d => EN_TO_NP[d]);
}