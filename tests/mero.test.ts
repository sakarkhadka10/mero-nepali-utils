import { describe, it, expect } from "vitest";

import {
  meroAd,
  meroBs,
  formatBs,
  toNepaliNumber,
  toEnglishNumber,
  MeroDate,
  isRoundTripValid,
} from "../src/index";

describe("📅 Date Conversion (BS ↔ AD)", () => {
  it("should convert AD → BS correctly", () => {
    expect(meroBs("2024-04-13")).toBe("2081-01-01");
  });

  it("should convert BS → AD correctly", () => {
    expect(meroAd("2081-01-01")).toBe("2024-04-13");
  });

  it("should maintain round-trip integrity", () => {
    const bs = "2081-05-10";
    expect(meroBs(meroAd(bs))).toBe(bs);
  });

  it("should validate round trip using helper", () => {
    expect(isRoundTripValid("2081-01-01")).toBe(true);
  });
});

describe("🎨 Formatting", () => {
  it("should format BS date with default tokens", () => {
    expect(formatBs("2081-01-01", "YYYY-MM-DD")).toBe("2081-01-01");
  });

  it("should format with Nepali month", () => {
    expect(
      formatBs("2081-01-01", "YYYY MMMM DD", { locale: "np" })
    ).toBe("2081 बैशाख 01");
  });
});

describe("🔢 Number Conversion", () => {
  it("should convert English → Nepali numbers", () => {
    expect(toNepaliNumber(123456)).toBe("१२३४५६");
  });

  it("should convert Nepali → English numbers", () => {
    expect(toEnglishNumber("१२३४५६")).toBe("123456");
  });

  it("should handle mixed string", () => {
    expect(toNepaliNumber("Year 2024")).toBe("Year २०२४");
  });
});

describe("📅 MeroDate Class", () => {
  it("should convert AD → BS using class", () => {
    const d = new MeroDate("2024-04-13");
    expect(d.toBS()).toBe("2081-01-01");
  });

  it("should format date", () => {
    const d = new MeroDate("2024-04-13");
    expect(d.format("YYYY MMMM DD", { locale: "np" })).toBe(
      "2081 बैशाख 01"
    );
  });

  it("should add days correctly", () => {
    const d = new MeroDate("2024-04-13");
    expect(d.addDays(1).toAD()).toBe("2024-04-14");
  });

  it("should subtract days correctly", () => {
    const d = new MeroDate("2024-04-13");
    expect(d.subtractDays(1).toAD()).toBe("2024-04-12");
  });

  it("should support chaining", () => {
    const d = new MeroDate("2024-04-13");
    expect(d.addDays(5).subtractDays(2).toAD()).toBe("2024-04-16");
  });
});

describe("⏱️ Relative Time", () => {
  it("should return today for same date", () => {
    const today = new Date().toISOString().slice(0, 10);
    const d = new MeroDate(today);
    expect(d.fromNow()).toBe("today");
  });
});

describe("❌ Edge Cases", () => {
  it("should throw on invalid BS date", () => {
    expect(() => meroAd("2081-13-01")).toThrow();
  });

  it("should throw on invalid AD date", () => {
    expect(() => meroBs("1800-01-01")).toThrow();
  });
});