import { EN_TO_NP_MAP } from "../../data/numberData";
export function meroNumber(input: string | number): string {
  return String(input).replace(
    /[0-9]/g,
    (digit) => EN_TO_NP_MAP[digit] || digit,
  );
}
