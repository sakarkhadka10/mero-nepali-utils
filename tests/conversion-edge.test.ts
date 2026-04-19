import { describe, it, expect } from "vitest";
import { meroAd, meroBs } from "../src";

describe("🔁 Conversion Edge Cases", () => {
  it("should handle boundary BS date", () => {
    expect(() => meroAd("2000-01-01")).not.toThrow();
  });

  it("should handle boundary AD date", () => {
    expect(() => meroBs("1943-04-14")).not.toThrow();
  });

  it("should throw on invalid BS format", () => {
    expect(() => meroAd("invalid-date")).toThrow();
  });

  it("should throw on invalid AD format", () => {
    expect(() => meroBs("invalid-date")).toThrow();
  });
});