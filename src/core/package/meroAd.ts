import { parse, format } from "../helpers";
import { validateBs } from "../validate";
import { bsMonthData } from "../../data/bsMonthsData";
import { bsYearStartDays } from "../../utils/bsYearStartDays";
import { OutOfRangeError } from "../errors";

const BASE_AD = Date.UTC(1943, 3, 14) / 86400000;

export function meroAd(date: string): string {
  const { y, m, d } = parse(date);

  //  validation
  validateBs(y, m, d);

  /* istanbul ignore next */
  if (!(y in bsYearStartDays)) {
    throw new OutOfRangeError(`Unsupported BS year: ${y}`);
  }

  if (!bsMonthData[y]) {
    throw new OutOfRangeError(`Missing month data for BS year: ${y}`);
  }

  let days = bsYearStartDays[y];

  const months = bsMonthData[y];

  //  accumulate month days
  for (let i = 0; i < m - 1; i++) {
    days += months[i];
  }

  //  add days
  days += d - 1;

  //  convert to AD (UTC safe)
  const ad = new Date((BASE_AD + days) * 86400000);

  return format(
    ad.getUTCFullYear(),
    ad.getUTCMonth() + 1,
    ad.getUTCDate()
  );
}