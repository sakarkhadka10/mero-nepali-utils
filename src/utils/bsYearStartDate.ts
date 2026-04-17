import { bsMonthData } from "../data/bsMonthsData";

export const bsYearStartDays: Record<number, number> = {};

let total = 0;

const years = Object.keys(bsMonthData)
  .map(Number)
  .sort((a, b) => a - b);

for (const year of years) {
  bsYearStartDays[year] = total;
  total += bsMonthData[year].reduce((a, b) => a + b, 0);
}
