import { meroBs } from "./package/meroBs";
import { formatBs } from "../format/formatter";
import { toNepaliNumber } from "../number/toNepali";
import { fromNow } from "../relative/fromNow";
import { getConfig, setLocale } from "./config";

/**
 * Core Class (internal)
 */
class MeroDateClass {
  private ad: string;
  private bs?: string;

  constructor(date: string | Date = new Date()) {
    if (date instanceof Date) {
      // Local date (avoid timezone issues)
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      this.ad = `${y}-${m}-${d}`;
    } else {
      this.ad = date;
    }
  }

  toBS(): string {
    if (!this.bs) {
      this.bs = meroBs(this.ad);
    }
    return this.bs;
  }

  toAD(): string {
    return this.ad;
  }

  format(pattern: string, opts?: { locale?: "np" | "en" }) {
    const globalLocale = getConfig().locale;
  const locale = opts?.locale ?? globalLocale;

    return formatBs(this.toBS(), pattern, {locale});
  }

  toNepaliNumber(): string {
    const {locale} = getConfig();
    const bs = this.toBS();
     return locale === "np" ? toNepaliNumber(bs) : bs;
  }

  addDays(days: number) {
    const date = new Date(this.ad);
    date.setDate(date.getDate() + days);
    return new MeroDateClass(date);
  }

  subtractDays(days: number) {
    return this.addDays(-days);
  }

  fromNow() {
    return fromNow(this.ad);
  }

  clone() {
    return new MeroDateClass(this.ad);
  }

  valueOf() {
    return new Date(this.ad).getTime();
  }
}

/**
 * Factory creator
 */
const create = (date?: string | Date) =>
  new MeroDateClass(date ?? new Date());

/**
 * Constructor type (fixes circular TS issue)
 */
type MeroDateClassConstructor = {
  new (date?: string | Date): MeroDateClass;
  prototype: MeroDateClass;
};

/**
 * Plugin type
 */
export type MeroDatePlugin = (
  MeroDateClass: MeroDateClassConstructor,
  factory: (date?: string | Date) => MeroDateClass
) => void;

/**
 * Installed plugins registry
 */
const installedPlugins = new Set<MeroDatePlugin>();

/**
 * Extend method
 */
function extend(plugin: MeroDatePlugin) {
  if (installedPlugins.has(plugin)) return;

  plugin(MeroDateClass as MeroDateClassConstructor, create);
  installedPlugins.add(plugin);
}

/**
 * Callable + constructable type
 */
type MeroDateType = typeof MeroDateClass & {
  (date?: string | Date): MeroDateClass;
};

/**
 * Final export (dayjs-style API)
 */
export const MeroDate = Object.assign(create, MeroDateClass, {
  extend,
  locale: setLocale,
}) as MeroDateType & {
  extend: (plugin: MeroDatePlugin) => void;
  locale: (locale: "np" | "en") => void;
};

/**
 * Optional export for advanced usage / plugin typing
 */
export { MeroDateClass };