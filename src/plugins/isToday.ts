import type { MeroDatePlugin } from "../core/MeroDate";

export const isTodayPlugin: MeroDatePlugin = (MeroDateClass) => {
  MeroDateClass.prototype.isToday = function () {
    const now = new Date();

    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");

    const today = `${y}-${m}-${d}`;

    return this.toAD() === today;
  };
};