import { bsYearStartDays } from "../utils/bsYearStartDate";

export function parse(date: string) {
  const [y, m, d] = date.split("-").map(Number);

  if (!y || !m || !d) {
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }

  return { y, m, d };
}

export function format(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function toDays(y: number, m: number, d: number) {
  return Date.UTC(y, m - 1, d) / 86400000;
}

const YEARS = Object.keys(bsYearStartDays).map(Number);

// 🔥 Binary search (core optimization)
export function findBsYear(diff: number) {
  let low = 0;
  let high = YEARS.length - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    const year = YEARS[mid];

    if (bsYearStartDays[year] <= diff) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return YEARS[high];
}
