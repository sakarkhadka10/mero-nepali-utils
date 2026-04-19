import { bsMonthData } from "../data/bsMonthsData";
import { SUPPORTED_AD_RANGE, SUPPORTED_BS_RANGE } from "./constants";
import { InvalidDateValueError, OutOfRangeError } from "./errors";

// ✅ Validate BS date
export function validateBs(y: number, m: number, d: number) {
  // year range
  if (y < SUPPORTED_BS_RANGE.min || y > SUPPORTED_BS_RANGE.max) {
    throw new OutOfRangeError(
      `BS date out of supported range (${SUPPORTED_BS_RANGE.min}–${SUPPORTED_BS_RANGE.max})`
    );
  }

  // month range
  if (m < 1 || m > 12) {
    throw new InvalidDateValueError("Invalid BS month");
  }

  const months = bsMonthData[y];

  if (!months) {
    throw new OutOfRangeError(`Missing BS data for year: ${y}`);
  }

  const maxDay = months[m - 1];

  if (d < 1 || d > maxDay) {
    throw new InvalidDateValueError("Invalid BS day");
  }
}

// ✅ Validate AD date
export function validateAd(
  y: number,
  m: number,
  d: number,
  strict = true
) {
  // year range
  if (y < SUPPORTED_AD_RANGE.min || y > SUPPORTED_AD_RANGE.max) {
    throw new OutOfRangeError(
      `AD date out of supported range (${SUPPORTED_AD_RANGE.min}–${SUPPORTED_AD_RANGE.max})`
    );
  }

  // month
  if (m < 1 || m > 12) {
    throw new InvalidDateValueError("Invalid AD month");
  }

  // day
  if (d < 1 || d > 31) {
    throw new InvalidDateValueError("Invalid AD day");
  }

  // real calendar validation
  const date = new Date(y, m - 1, d);

  if (
    date.getFullYear() !== y ||
    date.getMonth() + 1 !== m ||
    date.getDate() !== d
  ) {
    throw new InvalidDateValueError("Invalid real calendar date");
  }

  if (!strict) {
    // future extension point
  }
}