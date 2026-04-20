import { describe, it, expect } from "vitest";
import { toNepaliNumber } from "../src/number/toNepali";
import { toEnglishNumber } from "../src/number/toEnglish";

describe("Number Conversion", () => {
  describe("toNepaliNumber", () => {
    it("should convert English digits to Nepali", () => {
      expect(toNepaliNumber("123")).toBe("१२३");
      expect(toNepaliNumber(456)).toBe("४५६");
      expect(toNepaliNumber("7890")).toBe("७८९०");
    });

    it("should handle mixed input", () => {
      expect(toNepaliNumber("Date: 2024-01-01")).toBe("Date: २०२४-०१-०१");
    });
  });

  describe("toEnglishNumber", () => {
    it("should convert Nepali digits to English", () => {
      expect(toEnglishNumber("१२३")).toBe("123");
      expect(toEnglishNumber("४५६")).toBe("456");
      expect(toEnglishNumber("७८९०")).toBe("7890");
    });

    it("should handle mixed input", () => {
      expect(toEnglishNumber("मिति: २०२४-०१-०१")).toBe("मिति: 2024-01-01");
    });
  });

  describe("round trip conversion", () => {
    it("should maintain data through round trip", () => {
      const original = "1234567890";
      const nepali = toNepaliNumber(original);
      const back = toEnglishNumber(nepali);
      expect(back).toBe(original);
    });
  });
});