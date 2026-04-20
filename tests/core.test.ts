import { describe, it, expect } from "vitest";
import { meroAd } from "../src/core/package/meroAd";
import { meroBs } from "../src/core/package/meroBs";

describe("Core Conversion Functions", () => {
  describe("meroBs", () => {
    it("should convert AD date to BS date", () => {
      expect(meroBs("2024-01-01")).toBe("2080-09-16");
      expect(meroBs("2023-12-25")).toBe("2080-09-09");
    });

    it("should handle Date objects", () => {
      const date = new Date("2024-01-01");
      expect(meroBs(date)).toBe("2080-09-16");
    });

    it("should throw error for invalid AD dates", () => {
      expect(() => meroBs("1800-01-01")).toThrow();
      expect(() => meroBs("2100-13-01")).toThrow();      expect(() => meroBs("2024-01-32")).toThrow();
      expect(() => meroBs("invalid")).toThrow();    });
  });

  describe("meroAd", () => {
    it("should convert BS date to AD date", () => {
      expect(meroAd("2080-09-16")).toBe("2024-01-01");
      expect(meroAd("2080-09-09")).toBe("2023-12-25");
    });

    it("should throw error for invalid BS dates", () => {
      expect(() => meroAd("2000-13-01")).toThrow();
      expect(() => meroAd("2080-12-32")).toThrow();
      expect(() => meroAd("1800-01-01")).toThrow();
      expect(() => meroAd("invalid")).toThrow();
      expect(() => meroAd("2100-01-01")).toThrow("BS date out of supported range");
    });
  });
});