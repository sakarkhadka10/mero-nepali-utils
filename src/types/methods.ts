import type { MeroDateClass } from "../core/MeroDate";
import type { PublicUnit, InternalUnit } from "../utils/normalizeUnit";

// Units
export type Unit = PublicUnit | InternalUnit;

export type DiffUnit =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "years";

export type StartEndUnit = "day" | "month" | "year";

export type Inclusivity = "()" | "[]" | "(]" | "[)";

// Methods
export type DiffMethod = (
  this: MeroDateClass,
  input: string | Date | MeroDateClass,
  unit?: DiffUnit,
  float?: boolean
) => number;

export type IsSameMethod = (
  this: MeroDateClass,
  input: string | Date | MeroDateClass,
  unit?: Unit
) => boolean;

export type IsBetweenMethod = (
  this: MeroDateClass,
  start: string | Date | MeroDateClass,
  end: string | Date | MeroDateClass,
  unit?: Unit | Inclusivity,
  inclusivity?: Inclusivity
) => boolean;

export type IsTodayMethod = (this: MeroDateClass) => boolean;

export type StartOfMethod = (
  this: MeroDateClass,
  unit: StartEndUnit
) => MeroDateClass;

export type EndOfMethod = (
  this: MeroDateClass,
  unit: StartEndUnit
) => MeroDateClass;

export type FromNowMethod = (this: MeroDateClass) => string;

export type ToNowMethod = (this: MeroDateClass) => string;

export type FromMethod = (
  this: MeroDateClass,
  input: string | Date
) => string;