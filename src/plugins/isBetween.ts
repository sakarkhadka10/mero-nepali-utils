import type { MeroDatePlugin } from "../core/MeroDate";
import { normalizeUnit, PublicUnit } from "../utils/normalizeUnit";

type Unit = PublicUnit;
type Inclusivity = "()" | "[]" | "(]" | "[)";

export const isBetweenPlugin: MeroDatePlugin = (MeroDateClass) => {
  if (
    typeof MeroDateClass.prototype.diff !== "function" ||
    typeof MeroDateClass.prototype.isSame !== "function"
  ) {
    throw new Error(
      "isBetweenPlugin requires diffPlugin and isSamePlugin."
    );
  }

  MeroDateClass.prototype.isBetween = function (
    start: string | Date | InstanceType<typeof MeroDateClass>,
    end: string | Date | InstanceType<typeof MeroDateClass>,
    unit: Unit = "day",
    inclusivity: Inclusivity = "()"
  ) {
    const startDate =
      start instanceof MeroDateClass
        ? start
        : new MeroDateClass(start);

    const endDate =
      end instanceof MeroDateClass
        ? end
        : new MeroDateClass(end);

    const u = normalizeUnit(unit);

    const isAfterStart = this.diff(startDate, u) > 0;
    const isBeforeEnd = this.diff(endDate, u) < 0;

    const isSameStart = this.isSame(startDate, u);
    const isSameEnd = this.isSame(endDate, u);

    switch (inclusivity) {
      case "()":
        return isAfterStart && isBeforeEnd;

      case "[]":
        return (
          (isAfterStart || isSameStart) &&
          (isBeforeEnd || isSameEnd)
        );

      case "(]":
        return isAfterStart && (isBeforeEnd || isSameEnd);

      case "[)":
        return (isAfterStart || isSameStart) && isBeforeEnd;

      default:
        return false;
    }
  };
};