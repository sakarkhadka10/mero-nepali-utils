import type {
  MeroDatePlugin,
  MeroDateClass,
  DiffUnit,
} from "../core/MeroDate";

export const diffPlugin: MeroDatePlugin = (cls) => {
  cls.prototype.diff = function (
    input: string | Date | MeroDateClass,
    unit: DiffUnit = "days",
    float = false
  ) {
    const d1 = new Date(this.toAD());

    const d2 =
      input instanceof cls
        ? new Date(input.toAD())
        : new Date(input);

    const ms = d1.getTime() - d2.getTime();

    const map: Record<DiffUnit, number> = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 60000,
      hours: 3600000,
      days: 86400000,
      months: 2592000000,
      years: 31536000000,
    };

    const val = ms / map[unit];
    return float ? val : Math.trunc(val);
  };
};