import type { MeroDatePlugin } from "../core/MeroDate";
import { meroAd } from "../core/package/meroAd";
import { bsMonthData } from "../data/bsMonthsData";
import { parseBs } from "../utils/parseBs";

type Unit = "day" | "month" | "year";

export const startEndPlugin: MeroDatePlugin = (MeroDateClass) => {
  MeroDateClass.prototype.startOf = function (unit: Unit) {
    const bs = this.toBS();
    const { y, m } = parseBs(bs);

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
    const { y, m } = parseBs(bs);

    let newBs = bs;

    switch (unit) {
      case "day":
        newBs = bs;
        break;

      case "month": {
        const lastDay = bsMonthData[y][m - 1];
        newBs = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
        break;
      }

      case "year": {
        const lastMonth = 12;
        const lastDay = bsMonthData[y][lastMonth - 1];
        newBs = `${y}-${String(lastMonth).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
        break;
      }
    }

    return new MeroDateClass(meroAd(newBs));
  };
};