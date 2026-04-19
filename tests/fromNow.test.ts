import { describe, it, expect } from "vitest";
import { fromNow } from "../src/relative/fromNow";

function toISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

describe("⏱️ fromNow", () => {
  it("should return today", () => {
    expect(fromNow(new Date())).toBe("today");
  });

  it("should handle yesterday", () => {
    const d = new Date(Date.now() - 86400000);
    expect(fromNow(toISO(d))).toBe("yesterday");
  });

  it("should handle past days", () => {
    const d = new Date(Date.now() - 3 * 86400000);
    expect(fromNow(toISO(d))).toContain("days ago");
  });

  it("should handle weeks ago", () => {
    const d = new Date(Date.now() - 10 * 86400000);
    expect(fromNow(toISO(d))).toContain("weeks ago");
  });

  it("should handle tomorrow", () => {
    const d = new Date(Date.now() + 86400000);
    expect(fromNow(toISO(d))).toBe("tomorrow");
  });

  it("should handle future days", () => {
    const d = new Date(Date.now() + 3 * 86400000);
    expect(fromNow(toISO(d))).toContain("in");
  });
});