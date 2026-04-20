import type { MeroDatePlugin } from "../core/MeroDate";
import { meroAd } from "../core/package/meroAd"; // 👈 your existing function

type Unit = "day" | "month" | "year";

function parseBS(bs: string) {
  const [y, m, d] = bs.split("-").map(Number);
  return { y, m, d };
}

export const startEndPlugin: MeroDatePlugin = (MeroDateClass) => {
  MeroDateClass.prototype.startOf = function (unit: Unit) {
    const bs = this.toBS();
    const { y, m } = parseBS(bs);

    let newBs = bs;

    switch (unit) {
      case "day":
        newBs = bs;
        break;

      case "month":
        newBs = `${y}-${String(m).padStart(2, "0")}-01`;
        break;

      case "year":
        newBs = `${y}-01-01`;
        break;
    }

    return new MeroDateClass(meroAd(newBs));
  };

  MeroDateClass.prototype.endOf = function (unit: Unit) {
    const bs = this.toBS();
    const { y, m } = parseBS(bs);

    let newBs = bs;

    switch (unit) {
      case "day":
        newBs = bs;
        break;

      case "month": {
        // 🔥 find last day of BS month
        let day = 32;

        while (day > 28) {
          const test = `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          try {
            meroAd(test);
            newBs = test;
            break;
          } catch {
            day--;
          }
        }
        break;
      }

      case "year": {
        // BS year has 12 months
        let day = 32;
        const lastMonth = 12;

        while (day > 28) {
          const test = `${y}-${lastMonth}-${String(day).padStart(2, "0")}`;
          try {
            meroAd(test);
            newBs = test;
            break;
          } catch {
            day--;
          }
        }
        break;
      }
    }

    return new MeroDateClass(meroAd(newBs));
  };
};