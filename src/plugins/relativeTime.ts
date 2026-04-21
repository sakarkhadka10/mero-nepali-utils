import type { MeroDatePlugin } from "../core/MeroDate";

export const relativeTimePlugin: MeroDatePlugin = (cls) => {
  cls.prototype.toNow = function () {
    return new cls().from(this.toAD());
  };

  cls.prototype.from = function (input: string | Date) {
    return new cls(input).fromNow();
  };
};