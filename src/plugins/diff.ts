import type { MeroDatePlugin } from "../core/MeroDate";
import { getConfig } from "../core/config";
import { meroBs } from "../core/package/meroBs";
import { parseBs } from "../utils/parseBs";
import { diffBs } from "../diff/bsDiff";

type DiffUnit =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "years";

export const diffPlugin: MeroDatePlugin = (MeroDateClass) => {
  MeroDateClass.prototype.diff = function (
    input: string | Date | InstanceType<typeof MeroDateClass>,
    unit: DiffUnit = "days",
    float = false
  ) {
    const other =
      input instanceof MeroDateClass
        ? input
        : new MeroDateClass(input);

    const { calendar } = getConfig();
    const d1 = new Date(this.toAD());
    const d2 = new Date(other.toAD());

    const diffMs = d1.getTime() - d2.getTime();

    const conversions = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60,
      days: 1000 * 60 * 60 * 24,
    };

    if (unit in conversions) {
      const value =
        diffMs / conversions[unit as keyof typeof conversions];
      return float ? value : Math.floor(value);
    }

    // =========================
    // ✅ MONTHS / YEARS
    // =========================
    if (calendar === "bs") {
      const b1 = parseBs(meroBs(d1));
      const b2 = parseBs(meroBs(d2));

      const isNegative = diffMs < 0;
      const [start, end] = isNegative ? [b1, b2] : [b2, b1];
      const diff = diffBs(end, start);

      const totalMonths = diff.year * 12 + diff.month;
      
      if (unit === "months") {
        const result = isNegative ? -totalMonths : totalMonths;
        return float ? result + (diff.day / 30) : result;
      }

      if (unit === "years") {
        const result = totalMonths / 12;
        return float ? (isNegative ? -result : result) : Math.floor(isNegative ? -result : result);
      }
    }

    // AD fallback
    if (unit === "months") {
      const years = d1.getFullYear() - d2.getFullYear();
      const months = d1.getMonth() - d2.getMonth();
      const total = years * 12 + months;

      return float
        ? total + (d1.getDate() - d2.getDate()) / 30
        : Math.floor(total);
    }

    if (unit === "years") {
      const totalMonths =
        (d1.getFullYear() - d2.getFullYear()) * 12 +
        (d1.getMonth() - d2.getMonth());
      const value = totalMonths / 12;
      return float ? value : Math.floor(value);
    }

    return diffMs;
  };
};