import { writeFileSync } from "fs";
import { bsMonthData } from "../src/data/bsMonthsData.ts";

const result: Record<number, number> = {};

let total = 0;

const years = Object.keys(bsMonthData)
  .map(Number)
  .sort((a, b) => a - b);

for (const year of years) {
  result[year] = total;
  total += bsMonthData[year].reduce((a, b) => a + b, 0);
}

const content = `export const rawBsYearStartDays = ${JSON.stringify(result, null, 2)} as const;\n
// ✅ type-safe map for runtime usage
export const bsYearStartDays: Record<number, number> =
  rawBsYearStartDays as unknown as Record<number, number>;

// ✅ optional: export type for advanced usage
export type BsYear = keyof typeof rawBsYearStartDays;\n`;

writeFileSync(
  "src/utils/bsYearStartDays.ts",
  content
);

console.log("✅ bsYearStartDays generated!");