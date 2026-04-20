import { describe, it, expect } from "vitest";
import { formatBs } from "../src/format/formatter";

describe("formatBs", () => {
  it("should format BS date with YYYY-MM-DD pattern", () => {
    expect(formatBs("2080-09-17", "YYYY-MM-DD")).toBe("2080-09-17");
  });

  it("should format BS date with DD/MM/YYYY pattern", () => {
    expect(formatBs("2080-09-17", "DD/MM/YYYY")).toBe("17/09/2080");
  });

  it("should format with month names", () => {
    expect(formatBs("2080-01-01", "DD MMMM YYYY")).toBe("01 Baisakh 2080");
    expect(formatBs("2080-12-01", "DD MMMM YYYY")).toBe("01 Chaitra 2080");
  });

  it("should support Nepali locale", () => {
    expect(formatBs("2080-01-01", "DD MMMM YYYY", { locale: "np" })).toBe("01 बैशाख 2080");
  });

  it("should support English locale", () => {
    expect(formatBs("2080-01-01", "DD MMMM YYYY", { locale: "en" })).toBe("01 Baisakh 2080");
  });
});