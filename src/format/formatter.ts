import { getLocale } from "../locale";
import { LocaleType } from "../types";
import { TOKENS } from "./tokens";

export function formatBs(
    date:string,
    pattern: string,
    options?:{locale?:LocaleType}
){
    const [y,m,d] = date.split("-").map(Number);
    const locale = getLocale(options?.locale);

    const map: Record<string, string>={
        YYYY:TOKENS.YYYY(y),
        MM:TOKENS.MM(m),
        DD:TOKENS.DD(d),
        MMMM:locale.months[m-1],
    };

    return pattern.replace(/YYYY|MMMM|MM|DD/g, t => map[t]);
}