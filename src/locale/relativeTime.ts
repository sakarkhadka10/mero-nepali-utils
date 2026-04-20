export type RelativeTimeLocale = {
  future: (str: string) => string;
  past: (str: string) => string;

  s: string; // seconds
  m: string;
  mm: (n: number) => string;

  h: string;
  hh: (n: number) => string;

  d: string;
  dd: (n: number) => string;

  w: string;
  ww: (n: number) => string;

  M: string;
  MM: (n: number) => string;

  y: string;
  yy: (n: number) => string;
};

export const relativeTimeLocales: Record<string, RelativeTimeLocale> = {
  en: {
    future: (str: string) => `in ${str}`,
    past: (str: string) => `${str} ago`,

    s: "just now",
    m: "a minute",
    mm: (n: number) => `${n} minutes`,

    h: "an hour",
    hh: (n: number) => `${n} hours`,

    d: "a day",
    dd: (n: number) => `${n} days`,

    w: "1 week",
    ww: (n: number) => `${n} weeks`,

    M: "a month",
    MM: (n: number) => `${n} months`,

    y: "a year",
    yy: (n: number) => `${n} years`,
  },

  np: {
    future: (str: string) => `${str} पछि`,
    past: (str: string) => `${str} अघि`,

    s: "अहिले",
    m: "१ मिनेट",
    mm: (n: number) => `${n} मिनेट`,

    h: "१ घण्टा",
    hh: (n: number) => `${n} घण्टा`,

    d: "१ दिन",
    dd: (n: number) => `${n} दिन`,

    w: "१ हप्ता",
    ww: (n: number) => `${n} हप्ता`,

    M: "१ महिना",
    MM: (n: number) => `${n} महिना`,

    y: "१ वर्ष",
    yy: (n: number) => `${n} वर्ष`,
  },
} as const;