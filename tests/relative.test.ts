import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fromNow } from "../src/relative/fromNow";

describe("fromNow", () => {
  const mockNow = new Date("2024-01-15");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return 'today' for current date", () => {
    expect(fromNow("2024-01-15")).toBe("today");
  });

  it("should return 'yesterday' for previous day", () => {
    expect(fromNow("2024-01-14")).toBe("yesterday");
  });

  it("should return 'tomorrow' for next day", () => {
    expect(fromNow("2024-01-16")).toBe("tomorrow");
  });

  it("should return days ago for past dates", () => {
    expect(fromNow("2024-01-10")).toBe("5 days ago");
    expect(fromNow("2024-01-08")).toBe("1 week ago");
  });

  it("should return days ahead for future dates", () => {
    expect(fromNow("2024-01-20")).toBe("in 5 days");
    expect(fromNow("2024-01-22")).toBe("in 1 week");
  });

  it("should handle Date objects", () => {
    const pastDate = new Date("2024-01-10");
    expect(fromNow(pastDate)).toBe("5 days ago");
  });
});