import type { MeroDatePlugin } from "../core/MeroDate";
import { normalizeUnit, PublicUnit, InternalUnit } from "../utils/normalizeUnit";

/**
 * Accept both public + internal units
 */
type Unit = PublicUnit | InternalUnit;

export const isSamePlugin: MeroDatePlugin = (MeroDateClass) => {
  if (typeof MeroDateClass.prototype.diff !== "function") {
    throw new Error(
      "isSamePlugin requires diffPlugin. Please install it first."
    );
  }

  MeroDateClass.prototype.isSame = function (
    input: string | Date | InstanceType<typeof MeroDateClass>,
    unit: Unit = "day"
  ) {
    const other =
      input instanceof MeroDateClass
        ? input
        : new MeroDateClass(input);

    // ✅ normalize everything
    const u = normalizeUnit(unit);

    return this.diff(other, u) === 0;
  };
};