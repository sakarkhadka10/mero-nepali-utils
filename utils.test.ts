import { describe, it, expect } from "vitest";
import { meroBs } from "./src/core/package/meroBs";
import { meroAd } from "./src/core/package/meroAd";
import { meroNumber } from "./src/core/package/meroNumber";

describe("mero-nepali-utils", () => {
  // -------------------------
  // 📅 Date Conversion Tests
  // -------------------------

  describe("meroBs (AD → BS)", () => {
    it("converts known AD date to BS", () => {
      const result = meroBs("2026-04-17");
      expect(result).toBe("2083-01-04");
    });

    it("accepts Date object", () => {
      const result = meroBs(new Date("2026-04-17"));
      expect(result).toBe("2083-01-04");
    });

    it("throws error for invalid input", () => {
      expect(() => meroBs("invalid-date")).toThrow();
    });
  });

  describe("meroAd (BS → AD)", () => {
    it("converts known BS date to AD", () => {
      const result = meroAd("2083-01-01");
      expect(result).toBe("2026-04-14");
    });

    it("throws error for invalid BS date", () => {
      expect(() => meroAd("2083-13-01")).toThrow();
    });
  });

  describe("Round Trip (AD → BS → AD)", () => {
    it("returns original AD date", () => {
      const original = "2026-04-17";
      const bs = meroBs(original);
      const back = meroAd(bs);

      expect(back).toBe(original);
    });

    it("works for multiple dates", () => {
      const dates = ["2000-01-01", "2010-05-15", "2024-12-31"];

      for (const date of dates) {
        const bs = meroBs(date);
        const back = meroAd(bs);

        expect(back).toBe(date);
      }
    });
  });

  // -------------------------
  // 🔢 Number Conversion Tests
  // -------------------------

  describe("meroNepaliNumber (EN → NP)", () => {
    it("converts simple numbers", () => {
      expect(meroNumber(123)).toBe("१२३");
    });

    it("converts string numbers", () => {
      expect(meroNumber("456")).toBe("४५६");
    });

    it("handles mixed text", () => {
      expect(meroNumber("Price: 789")).toBe("Price: ७८९");
    });

    it("handles decimals", () => {
      expect(meroNumber("123.45")).toBe("१२३.४५");
    });

    it("handles commas", () => {
      expect(meroNumber("1,234")).toBe("१,२३४");
    });

    it("handles special characters", () => {
      expect(meroNumber("Rs. 1000/-")).toBe("Rs. १०००/-");
    });

    it("returns same string if no digits", () => {
      expect(meroNumber("Hello")).toBe("Hello");
    });

    it("handles empty string", () => {
      expect(meroNumber("")).toBe("");
    });
  });
});
