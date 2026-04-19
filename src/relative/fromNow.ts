export function fromNow(input: string | Date): string {
  const now = new Date();
  const target = typeof input === "string" ? new Date(input) : input;

  const diffMs = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  // 🟢 TODAY
  if (diffDays === 0) return "today";

  // 🔵 PAST
  if (diffDays > 0) {
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
  }

  // 🟣 FUTURE
  const futureDays = Math.abs(diffDays);

  if (futureDays === 1) return "tomorrow";
  if (futureDays < 7) return `in ${futureDays} days`;
  return `in ${Math.floor(futureDays / 7)} weeks`;
}