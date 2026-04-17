import { bsMonthData } from "../data/bsMonthsData";

export function validateAd(y: number, m: number, d: number) {
  if (y < 1943 || y > 2100) {
    throw new Error("AD date out of supported range (1943–2100)");
  }

  if (m < 1 || m > 12) {
    throw new Error("Invalid AD month");
  }

  if (d < 1 || d > 31) {
    throw new Error("Invalid AD day");
  }
}

export function validateBs(y: number, m: number, d: number) {
  if (!bsMonthData[y]) {
    throw new Error("Unsupported BS year");
  }

  if (m < 1 || m > 12) {
    throw new Error("Invalid BS month");
  }

  const maxDay = bsMonthData[y][m - 1];

  if (d < 1 || d > maxDay) {
    throw new Error("Invalid BS day");
  }
}
