import "../core/MeroDate";

type PublicUnit = "day" | "month" | "year";
type InternalUnit = "days" | "months" | "years";
type Unit = PublicUnit | InternalUnit;

declare module "../core/MeroDate" {
  interface MeroDateClass {
    isToday(): boolean;

    diff(
      input: string | Date | MeroDateClass,
      unit?:
        | "milliseconds"
        | "seconds"
        | "minutes"
        | "hours"
        | "days"
        | "months"
        | "years",
      float?: boolean
    ): number;

  
    isSame(
      input: string | Date | MeroDateClass,
      unit?: Unit
    ): boolean;

    isBetween(
      start: string | Date | MeroDateClass,
      end: string | Date | MeroDateClass,
      unit?: PublicUnit,
      inclusivity?: "()" | "[]" | "(]" | "[)"
    ): boolean;

    startOf(unit: PublicUnit): MeroDateClass;
    endOf(unit: PublicUnit): MeroDateClass;
  }
}