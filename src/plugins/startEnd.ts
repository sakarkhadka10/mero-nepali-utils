import { MeroDatePlugin } from "../core/MeroDate";
import { meroAd } from "../core/package/meroAd";
import { parseBs } from "../utils/parseBs";
import { bsMonthData } from "../data/bsMonthsData";

export const startEndPlugin: MeroDatePlugin = (cls) => {
  cls.prototype.startOf = function (unit) {
    const bs = this.toBS();
    const { y, m } = parseBs(bs);

    let newBs = bs;

    if (unit === "month") {
      newBs = `${y}-${String(m).padStart(2, "0")}-01`;
    }

    if (unit === "year") {
      newBs = `${y}-01-01`;
    }

    return new cls(meroAd(newBs));
  };

  cls.prototype.endOf = function (unit) {
    const bs = this.toBS();
    const { y, m } = parseBs(bs);

    let newBs = bs;

    if (unit === "month") {
      const lastDay = bsMonthData[y][m - 1];
      newBs = `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    }

    if (unit === "year") {
      const lastMonth = 12;
      const lastDay = bsMonthData[y][lastMonth - 1];
      newBs = `${y}-${lastMonth}-${lastDay}`;
    }

    return new cls(meroAd(newBs));
  };
};