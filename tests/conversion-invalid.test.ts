import { describe, it, expect } from "vitest";
import { meroAd, meroBs } from "../src";
import { InvalidDateFormatError } from "../src/core/errors";

describe("❌ Invalid Format Handling", () => {
  it("should throw on wrong format (slashes)", () => {
    expect(() => meroBs("2024/04/13")).toThrow();
    expect(() => meroAd("2081/01/01")).toThrow();
  });

  it("should throw on incomplete date", () => {
    expect(() => meroBs("2024-04")).toThrow();
    expect(() => meroAd("2081-01")).toThrow();
  });

  it("should throw on non-numeric input", () => {
    expect(() => meroBs("abcd-ef-gh")).toThrow();
    expect(() => meroAd("xxxx-yy-zz")).toThrow();
  });

  it("should throw on empty string", () => {
    expect(() => meroBs("")).toThrow();
    expect(() => meroAd("")).toThrow();
  });
});

describe("❌ Invalid Value Handling", () => {
  it("should throw on invalid BS values", () => {
    expect(() => meroAd("2081-00-10")).toThrow(); // month 0
    expect(() => meroAd("2081-13-10")).toThrow(); // month 13
    expect(() => meroAd("2081-01-00")).toThrow(); // day 0
  });

  it("should throw on invalid AD values", () => {
    expect(() => meroBs("2024-00-10")).toThrow();
    expect(() => meroBs("2024-13-10")).toThrow();
    expect(() => meroBs("2024-01-00")).toThrow();
  });

  it("should throw on out-of-range years", () => {
    expect(() => meroBs("1800-01-01")).toThrow(); // too old
    expect(() => meroAd("3000-01-01")).toThrow(); // too future
  });
  it("should throw InvalidDateFormatError for bad format", () => {
  expect(() => meroBs("2024/04/13")).toThrow(InvalidDateFormatError);
  expect(() => meroAd("2081/01/01")).toThrow(InvalidDateFormatError);
});
});