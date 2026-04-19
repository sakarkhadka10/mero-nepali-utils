import { NP_TO_EN } from "../data/numberData";

export function toEnglishNumber(input:string | number): string{
    return String(input).replace(/[०-९]/g, d => NP_TO_EN[d]);
}