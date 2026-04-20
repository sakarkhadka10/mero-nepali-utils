export const TOKENS = {
  YYYY: (y: number) => String(y),
  YY: (y: number) => String(y).slice(-2),
  MM: (m: number) => String(m).padStart(2, "0"),
  M: (m: number) => String(m),
  DD: (d: number) => String(d).padStart(2, "0"),
  D: (d: number) => String(d),
};