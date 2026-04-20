export type LocaleType = "np" | "en";
export type CalendarType = "bs" | "ad";
export type TimeUnit = "day" | "week" | "month" | "year";

export interface FromNowOptions {
  unit?: TimeUnit;
  precision?: number;
}