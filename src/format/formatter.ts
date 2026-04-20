import { getLocale } from "../locale";
import { LocaleType } from "../types";
import { TOKENS } from "./tokens";

export function formatBs(
  date: string,
  pattern: string,
  options?: { locale?: LocaleType },
) {
  const [y, m, d] = date.split("-").map(Number);
  const requestedLocale = options?.locale ?? "en";
  const localeData = getLocale(requestedLocale);

  const map: Record<string, string> = {
    YYYY: TOKENS.YYYY(y),
    YY: TOKENS.YY(y),
    MMMM: localeData.months[m - 1],
    MM: TOKENS.MM(m),
    M: TOKENS.M(m),
    DD: TOKENS.DD(d),
    D: TOKENS.D(d),
  };

  const regex = /YYYY|YY|MMMM|MM|M|DD|D/g;
  const result = pattern.replace(regex, (t) => map[t]);

  return result;
}
