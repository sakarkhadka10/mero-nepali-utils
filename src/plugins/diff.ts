import type { MeroDatePlugin } from "../core/MeroDate";

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
    // Normalize input
    const other =
      input instanceof MeroDateClass
        ? input
        : new MeroDateClass(input);

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

    // Simple units
    if (unit in conversions) {
      const value =
        diffMs / conversions[unit as keyof typeof conversions];
      return float ? value : Math.floor(value);
    }

    // Months (more accurate)
    if (unit === "months") {
      const years = d1.getFullYear() - d2.getFullYear();
      const months = d1.getMonth() - d2.getMonth();
      const total = years * 12 + months;

      return float
        ? total + (d1.getDate() - d2.getDate()) / 30
        : total;
    }

    // Years (based on months)
    if (unit === "years") {
      const monthsDiff =
        (d1.getFullYear() - d2.getFullYear()) * 12 +
        (d1.getMonth() - d2.getMonth());

      const value = monthsDiff / 12;

      return float ? value : Math.floor(value);
    }

    return diffMs;
  };
};