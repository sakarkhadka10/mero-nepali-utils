import { meroAd } from "./package/meroAd";
import { meroBs } from "./package/meroBs";

export function isRoundTripValid(bs: string): boolean {
  return meroBs(meroAd(bs)) === bs;
}