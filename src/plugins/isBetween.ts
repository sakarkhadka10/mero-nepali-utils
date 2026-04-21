import type {
  MeroDatePlugin,
  MeroDateClass,
} from "../core/MeroDate";

export const isBetweenPlugin: MeroDatePlugin = (cls) => {
  cls.prototype.isBetween = function (
    a: string | Date | MeroDateClass,
    b: string | Date | MeroDateClass
  ) {
    return this.diff(a) > 0 && this.diff(b) < 0;
  };
};