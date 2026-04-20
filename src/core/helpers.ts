import { bsYearStartDays } from "../utils/bsYearStartDays";
import { InvalidDateFormatError, InvalidDateValueError, OutOfRangeError } from "./errors";

//  Strict parser (production-grade)
export function parse(input: string) {
  //  must be string
  if (typeof input !== "string" || input.trim() === "") {
    throw new InvalidDateFormatError();
  }

  //  strict format: YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    throw new InvalidDateFormatError();
  }

  const [yStr, mStr, dStr] = input.split("-");

  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);

  // ✅ prevent NaN issues
  if ([y, m, d].some((v) => Number.isNaN(v))) {
    throw new InvalidDateValueError("Invalid numeric values in date");
  }

  return { y, m, d };
}

//  Format back to YYYY-MM-DD
export function format(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

//  Convert AD date → days (UTC-safe)
export function toDays(y: number, m: number, d: number) {
  return Date.UTC(y, m - 1, d) / 86400000;
}

// Pre-sorted BS years (important for binary search)
const YEARS = Object.keys(bsYearStartDays)
  .map(Number)
  .sort((a, b) => a - b);

//  Binary search (optimized + safe)
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

  //  critical safety check
  if (high < 0) {
   throw new OutOfRangeError("Date is before supported BS range");
  }

  return YEARS[high];
}