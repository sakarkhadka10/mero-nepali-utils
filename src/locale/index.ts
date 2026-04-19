import { LocaleType } from "../types";
import { EN_LOCALE } from "./en";
import { NP_Locale } from "./np";

export function getLocale(locale:LocaleType ="en"){
    return locale === "np"? NP_Locale : EN_LOCALE;
}