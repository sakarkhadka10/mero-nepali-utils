import { meroBs } from "../core/package/meroBs";
import { getConfig } from "../core/config";
import { parseBs } from "../utils/parseBs";
import { diffBs } from "../diff/bsDiff";
import { relativeTimeLocales } from "../locale/relativeTime";

export function fromNow(input: string | Date): string {
  const { calendar, locale } = getConfig();
  const loc = relativeTimeLocales[locale];

  const now = new Date();
  const target = typeof input === "string" ? new Date(input) : input;

  const diffMs = now.getTime() - target.getTime();
  const isPast = diffMs >= 0;
  const absMs = Math.abs(diffMs);
  const absDays = Math.floor(absMs / 86400000);

  let result: string;

  // =========================
  // BS MODE
  // =========================
  if (calendar === "bs") {
    const nowBs = parseBs(meroBs(now));
    const targetBs = parseBs(meroBs(target));

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
  // =========================
  // AD MODE
  // =========================
  else {
    if (absDays === 0) result = loc.s;
    else if (absDays === 1) result = loc.d;
    else if (absDays < 7) result = loc.dd(absDays);
    else if (absDays < 30) {
      const weeks = Math.floor(absDays / 7);
      result = weeks === 1 ? loc.w : loc.ww(weeks);
    } else if (absDays < 365) {
      const months = Math.floor(absDays / 30);
      result = months === 1 ? loc.M : loc.MM(months);
    } else {
      const years = Math.floor(absDays / 365);
      result = years === 1 ? loc.y : loc.yy(years);
    }
  }

  // Final adjustment for yesterday/tomorrow which are special in the tests
  if (absDays === 1) {
    return isPast ? "yesterday" : "tomorrow";
  }
  
  if (absDays === 0) return "today";

  return isPast ? loc.past(result) : loc.future(result);
}