import { parse, format, toDays, findBsYear } from "../helpers";
import { validateAd } from "../validate";
import { bsMonthData } from "../../data/bsMonthsData";
import { bsYearStartDays } from "../../utils/bsYearStartDate";

const BASE_AD = toDays(1943, 4, 14);

export function meroBs(date: string | Date): string {
  let y: number, m: number, d: number;

  if (typeof date === "string") {
    ({ y, m, d } = parse(date));
  } else {
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
  }

  validateAd(y, m, d);

  const diff = toDays(y, m, d) - BASE_AD;

  const year = findBsYear(diff);

  let remaining = diff - bsYearStartDays[year];

  const months = bsMonthData[year];

  let month = 1;

  while (remaining >= months[month - 1]) {
    remaining -= months[month - 1];
    month++;
  }

  const day = remaining + 1;

  return format(year, month, day);
}
