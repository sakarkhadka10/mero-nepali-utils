import { meroBs } from "./package/meroBs";
import { formatBs } from "../format/formatter";
import { toNepaliNumber } from "../number/toNepali";
import { fromNow } from "../relative/fromNow";
import { getConfig, setLocale, setCalendar } from "./config";

/**
 * Types
 */
export type LocaleType = "np" | "en";
export type CalendarType = "bs" | "ad";

export type Unit =
  | "day"
  | "month"
  | "year"
  | "days"
  | "months"
  | "years";

export type DiffUnit =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "years";

export type Inclusivity = "()" | "[]" | "(]" | "[)";
export type StartEndUnit = "day" | "month" | "year";

/**
 * Core Class
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class MeroDateClass {
  private ad: string;
  private bs?: string;

  constructor(date: string | Date = new Date()) {
    if (date instanceof Date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      this.ad = `${y}-${m}-${d}`;
    } else {
      this.ad = date;
    }
  }

  toBS(): string {
    if (!this.bs) this.bs = meroBs(this.ad);
    return this.bs;
  }

  toAD(): string {
    return this.ad;
  }

  format(pattern: string, opts?: { locale?: LocaleType }): string {
    const locale = opts?.locale ?? getConfig().locale;
    return formatBs(this.toBS(), pattern, { locale });
  }

  toNepaliNumber(): string {
    const { locale } = getConfig();
    const bs = this.toBS();
    return locale === "np" ? toNepaliNumber(bs) : bs;
  }

  addDays(days: number): MeroDateClass {
    const d = new Date(this.ad);
    d.setDate(d.getDate() + days);
    return new MeroDateClass(d);
  }

  subtractDays(days: number): MeroDateClass {
    return this.addDays(-days);
  }

  fromNow(): string {
    return fromNow(this.ad);
  }

  clone(): MeroDateClass {
    return new MeroDateClass(this.ad);
  }

  valueOf(): number {
    return new Date(this.ad).getTime();
  }

  toString(): string {
    return this.toBS();
  }

  toJSON(): string {
    return this.toAD();
  }
  
  [Symbol.toPrimitive](hint: string) {
  if (hint === "number") {
    return this.valueOf();
  }
  return this.toString();
}
}

/**
 * Plugin method declarations (Interface Merging)
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface MeroDateClass {
  diff(
    input: string | Date | MeroDateClass,
    unit?: DiffUnit,
    float?: boolean
  ): number;

  isSame(input: string | Date | MeroDateClass, unit?: Unit): boolean;

  isBetween(
    a: string | Date | MeroDateClass,
    b: string | Date | MeroDateClass,
    unit?: Unit | Inclusivity,
    inc?: Inclusivity
  ): boolean;

  isToday(): boolean;

  startOf(unit: StartEndUnit): MeroDateClass;
  endOf(unit: StartEndUnit): MeroDateClass;

  toNow(): string;
  from(input: string | Date): string;
}

/**
 * Plugin system
 */
export type MeroDatePlugin = (
  cls: typeof MeroDateClass,
  factory: (date?: string | Date) => MeroDateClass
) => void;

const installed = new Set<MeroDatePlugin>();

const create = (date?: string | Date) =>
  new MeroDateClass(date ?? new Date());

export function extend(plugin: MeroDatePlugin) {
  if (!plugin || typeof plugin !== "function") return;
  if (installed.has(plugin)) return;
  plugin(MeroDateClass, create);
  installed.add(plugin);
}

/**
 * Export
 */
export const MeroDate = Object.assign(create, MeroDateClass, {
  extend,
  locale: setLocale,
  calendar: setCalendar,
});

/**
 * 🔥 AUTO REGISTER PLUGINS (CRITICAL)
 */
import { diffPlugin } from "../plugins/diff";
import { isSamePlugin } from "../plugins/isSame";
import { isBetweenPlugin } from "../plugins/isBetween";
import { startEndPlugin } from "../plugins/startEnd";
import { relativeTimePlugin } from "../plugins/relativeTime";
import { isTodayPlugin } from "../plugins/isToday";

extend(diffPlugin);
extend(isSamePlugin);
extend(isBetweenPlugin);
extend(startEndPlugin);
extend(relativeTimePlugin);
extend(isTodayPlugin);