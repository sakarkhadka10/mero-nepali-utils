import type { MeroDatePlugin } from "../core/MeroDate";

export const isTodayPlugin: MeroDatePlugin = (cls) => {
  cls.prototype.isToday = function () {
    const now = new Date();

    const today = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    return this.toAD() === today;
  };
};