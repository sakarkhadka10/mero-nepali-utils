import { MeroDatePlugin } from "../core/MeroDate";
import { getConfig } from "../core/config";
import { relativeTimeLocales } from "../locale/relativeTime";
import { thresholds } from "../relative/thresholds";
import { meroBs } from "../core/package/meroBs";
import { parseBs } from "../utils/parseBs";
import { diffBs } from "../diff/bsDiff";

export const relativeTimePlugin: MeroDatePlugin = (
  MeroDateClass
) => {
  MeroDateClass.prototype.fromNow = function () {
    const { locale, calendar } = getConfig();
    const loc = relativeTimeLocales[locale];

    const now = new Date();
    const target = new Date(this.toAD());

    const diffMs = now.getTime() - target.getTime();
    const isPast = diffMs >= 0;

    const absSec = Math.abs(diffMs) / 1000;
    const absMin = absSec / 60;
    const absHr = absMin / 60;
    const absDay = absHr / 24;

    let result: string;

    // =========================
    // ✅ AD MODE (precise + UX)
    // =========================
    if (calendar === "ad") {
      if (absSec < thresholds.s) result = loc.s;

      else if (absMin < 1.5) result = loc.m;
      else if (absMin < thresholds.m)
        result = loc.mm(Math.round(absMin));

      else if (absHr < 1.5) result = loc.h;
      else if (absHr < thresholds.h)
        result = loc.hh(Math.round(absHr));

      else if (absDay < 1.5) result = loc.d;
      else if (absDay < thresholds.d)
        result = loc.dd(Math.round(absDay));

      else if (absDay / 30 < 1.5) result = loc.M;
      else if (absDay / 30 < thresholds.M)
        result = loc.MM(Math.round(absDay / 30));

      else if (absDay / 365 < 1.5) result = loc.y;
      else result = loc.yy(Math.round(absDay / 365));
    }

    // =========================
    // ✅ BS MODE (calendar-aware)
    // =========================
    else {
      const nowBs = parseBs(meroBs(now));
      const targetBs = parseBs(meroBs(target));

      // Always diff (larger, smaller) to get positive values
      const [d1, d2] = isPast ? [nowBs, targetBs] : [targetBs, nowBs];
      const { year, month, day } = diffBs(d1, d2);

      if (year > 0) result = year === 1 ? loc.y : loc.yy(year);
      else if (month > 0) result = month === 1 ? loc.M : loc.MM(month);
      else if (day > 0) {
        if (day === 1) result = loc.d;
        else if (day < 7) result = loc.dd(day);
        else {
          const weeks = Math.floor(day / 7);
          result = weeks === 1 ? loc.w : loc.ww(weeks);
        }
      } else {
        result = loc.s;
      }
    }

    return isPast ? loc.past(result) : loc.future(result);
  };

  // 🔥 BONUS: add .toNow() (pro feature)
  MeroDateClass.prototype.toNow = function () {
    const now = new Date();
    const base =  new MeroDateClass(now)
    return base.from(this.toAD())
  };

  // 🔥 BONUS: add .from(date)
  MeroDateClass.prototype.from = function (input: string | Date) {
    const base = new MeroDateClass(input);
    const target = new MeroDateClass(this.toAD())

    return base.fromNow.call(target);
  };
};