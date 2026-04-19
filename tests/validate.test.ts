import { describe, it, expect } from "vitest";
import { validateBs, validateAd } from "../src/core/validate";
import { InvalidDateValueError, OutOfRangeError } from "../src/core/errors";

describe("✅ validateBs", () => {
  it("should pass valid BS date", () => {
    expect(() => validateBs(2081, 1, 1)).not.toThrow();
  });

  it("should fail invalid month", () => {
    expect(() => validateBs(2081, 13, 1)).toThrow();
  });

  it("should fail invalid day", () => {
    expect(() => validateBs(2081, 1, 40)).toThrow();
  });

  it("should fail invalid year", () => {
    expect(() => validateBs(1000, 1, 1)).toThrow();
  });
});

describe("✅ validateAd", () => {
  it("should pass valid AD date", () => {
    expect(() => validateAd(2024, 4, 13)).not.toThrow();
  });

  it("should fail invalid month", () => {
    expect(() => validateAd(2024, 13, 1)).toThrow();
  });

  it("should fail invalid day", () => {
    expect(() => validateAd(2024, 1, 32)).toThrow();
  });

  it("should fail invalid calendar date", () => {
    expect(() => validateAd(2024, 2, 30)).toThrow(); // Feb 30 ❌
  });
});

describe("🔐 Error Types", () => {
  it("should throw OutOfRangeError for invalid BS year", () => {
    expect(() => validateBs(1000, 1, 1)).toThrow(OutOfRangeError);
  });

  it("should throw InvalidDateValueError for invalid month", () => {
    expect(() => validateBs(2081, 13, 1)).toThrow(InvalidDateValueError);
  });

  it("should throw InvalidDateValueError for invalid AD date", () => {
    expect(() => validateAd(2024, 2, 30)).toThrow(InvalidDateValueError);
  });
});