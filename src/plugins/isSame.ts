import type {
  MeroDatePlugin,
  MeroDateClass,
} from "../core/MeroDate";

export const isSamePlugin: MeroDatePlugin = (cls) => {
  cls.prototype.isSame = function (
    input: string | Date | MeroDateClass
  ) {
    return this.diff(input, "days") === 0;
  };
};