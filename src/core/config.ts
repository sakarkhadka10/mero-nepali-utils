import { LocaleType, CalendarType } from "../types";

interface Config {
  locale: LocaleType;
  calendar: CalendarType;
}

const config: Config = {
  locale: "np", // default
  calendar: "bs", //default
};

export function getConfig() {
  return config;
}

export function setLocale(locale: LocaleType) {
  config.locale = locale;
}

export function setCalendar(calendar: CalendarType) {
  config.calendar = calendar;
}