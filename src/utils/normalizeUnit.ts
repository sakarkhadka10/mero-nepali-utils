export type PublicUnit = "day" | "month" | "year";
export type InternalUnit = "days" | "months" | "years";

/**
 * Normalize user input → internal unit system
 */
export function normalizeUnit(unit: PublicUnit | InternalUnit): InternalUnit {
  const map = {
    day: "days",
    days: "days",
    month: "months",
    months: "months",
    year: "years",
    years: "years",
  } as const;

  return map[unit];
}