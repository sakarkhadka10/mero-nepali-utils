import { meroBs } from "./package/meroBs";
import { formatBs } from "../format/formatter";
import { toNepaliNumber } from "../number/toNepali";
import { fromNow } from "../relative/fromNow";

export class MeroDate {
  private ad: string;

  constructor(date: string | Date) {
    if (date instanceof Date) {
      this.ad = date.toISOString().slice(0, 10);
    } else {
      this.ad = date;
    }
  }

  toBS(): string {
    return meroBs(this.ad);
  }

  toAD(): string {
    return this.ad;
  }

  format(pattern: string, opts?: { locale?: "np" | "en" }) {
    return formatBs(this.toBS(), pattern, opts);
  }

  toNepaliNumber(): string {
    return toNepaliNumber(this.toBS());
  }

  addDays(days: number) {
    const date = new Date(this.ad);
    date.setDate(date.getDate() + days);
    return new MeroDate(date);
  }

  subtractDays(days: number) {
    return this.addDays(-days);
  }

  fromNow() {
    return fromNow(this.ad);
  }
}