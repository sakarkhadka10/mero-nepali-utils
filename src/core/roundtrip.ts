import { meroAd } from "./package/meroAd";
import { meroBs } from "./package/meroBs";

export function isRoundTripValid(bs: string): boolean {
  try {
    return meroBs(meroAd(bs)) === bs;
  } catch {
    return false;
  }
}