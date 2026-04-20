import { bsMonthData } from "../data/bsMonthsData";

interface BsDate {
  y: number;
  m: number;
  d: number;
}

function getBsMonthDays(year: number, month: number) {
  return bsMonthData[year][month - 1];
}

export function diffBs(a: BsDate, b: BsDate) {
  let year = a.y - b.y;
  let month = a.m - b.m;
  let day = a.d - b.d;

  if (day < 0) {
    month -= 1;
    day += getBsMonthDays(b.y, b.m);
  }

  if (month < 0) {
    year -= 1;
    month += 12;
  }

  return { year, month, day };
}