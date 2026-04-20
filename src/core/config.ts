type Locale = "np" | "en";

interface Config {
  locale: Locale;
}

const config: Config = {
  locale: "np", // default
};

export function getConfig() {
  return config;
}

export function setLocale(locale: Locale) {
  config.locale = locale;
}