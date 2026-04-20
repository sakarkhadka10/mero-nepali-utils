export function parseBs(bs: string) {
  const [y, m, d] = bs.split("-").map(Number);
  return { y, m, d };
}