import { parse, format } from "../helpers";
import { validateBs } from "../validate";
import { bsMonthData } from "../../data/bsMonthsData";
import { bsYearStartDays } from "../../utils/bsYearStartDate";

const BASE_AD = Date.UTC(1943, 3, 14) / 86400000;

export function meroAd(date: string): string {
  const { y, m, d } = parse(date);

  validateBs(y, m, d);

  let days = bsYearStartDays[y];

  const months = bsMonthData[y];

  for (let i = 0; i < m - 1; i++) {
    days += months[i];
  }

  days += d - 1;

  const ad = new Date((BASE_AD + days) * 86400000);

  return format(ad.getUTCFullYear(), ad.getUTCMonth() + 1, ad.getUTCDate());
}
