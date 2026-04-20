import { describe, it, expect } from "vitest";
import { MeroDate } from "../src";

describe("MeroDate Class", () => {
  describe("constructor", () => {
    it("should create instance with current date when no argument", () => {
      const date = MeroDate();
      expect(date.toAD()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("should create instance with provided AD date string", () => {
      const date = MeroDate("2024-01-01");
      expect(date.toAD()).toBe("2024-01-01");
    });

    it("should create instance with provided Date object", () => {
      const jsDate = new Date("2024-01-01");
      const date = MeroDate(jsDate);
      expect(date.toAD()).toBe("2024-01-01");
    });
  });

  describe("toBS()", () => {
    it("should convert AD to BS", () => {
      const date = MeroDate("2024-01-01");
      expect(date.toBS()).toBe("2080-09-16");
    });
  });

  describe("toAD()", () => {
    it("should return AD date", () => {
      const date = MeroDate("2024-01-01");
      expect(date.toAD()).toBe("2024-01-01");
    });
  });

  describe("format()", () => {
    it("should format date with pattern", () => {
      const date = MeroDate("2024-01-01");
      expect(date.format("YYYY-MM-DD")).toBe("2080-09-16");
      expect(date.format("DD/MM/YYYY")).toBe("16/09/2080");
    });

    it("should support MMMM for month names", () => {
      const date = MeroDate("2024-01-01");
      expect(date.format("DD MMMM YYYY")).toBe("16 पुष 2080");
    });
  });

  describe("addDays()", () => {
    it("should add days to date", () => {
      const date = MeroDate("2024-01-01");
      const newDate = date.addDays(5);
      expect(newDate.toAD()).toBe("2024-01-06");
    });
  });

  describe("subtractDays()", () => {
    it("should subtract days from date", () => {
      const date = MeroDate("2024-01-01");
      const newDate = date.subtractDays(5);
      expect(newDate.toAD()).toBe("2023-12-27");
    });
  });

  describe("fromNow()", () => {
    it("should return relative time", () => {
      MeroDate.locale("en");
      const pastDate = MeroDate("2023-01-01");
      expect(pastDate.fromNow()).toContain("ago");

      const futureDate = MeroDate("2027-01-01");
      expect(futureDate.fromNow()).toContain("in");
    });
  });

  describe("clone()", () => {
    it("should create a copy", () => {
      const date = MeroDate("2024-01-01");
      const clone = date.clone();
      expect(clone.toAD()).toBe(date.toAD());
      expect(clone).not.toBe(date);
    });
  });

  describe("toNepaliNumber()", () => {
    it("should convert date to Nepali numbers when locale is np", () => {
      MeroDate.locale("np");
      const date = MeroDate("2024-01-01");
      expect(date.toNepaliNumber()).toBe("२०८०-०९-१६");
    });
  });

  describe("valueOf()", () => {
    it("should return timestamp", () => {
      const date = MeroDate("2024-01-01");
      const timestamp = new Date("2024-01-01").getTime();
      expect(date.valueOf()).toBe(timestamp);
    });
  });
});