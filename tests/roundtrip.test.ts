import { describe, it, expect } from "vitest";
import { isRoundTripValid } from "../src/core/roundtrip";

describe("isRoundTripValid", () => {
  it("should return true for valid BS dates", () => {
    expect(isRoundTripValid("2080-09-17")).toBe(true);
    expect(isRoundTripValid("2080-01-01")).toBe(true);
    expect(isRoundTripValid("2079-12-30")).toBe(true);
  });

  it("should return false for invalid BS dates", () => {
    expect(isRoundTripValid("2080-13-01")).toBe(false);
    expect(isRoundTripValid("2080-01-32")).toBe(false);
    expect(isRoundTripValid("1800-01-01")).toBe(false);
  });

  it("should return false for malformed dates", () => {
    expect(isRoundTripValid("invalid")).toBe(false);
    expect(isRoundTripValid("2080-09")).toBe(false);
    expect(isRoundTripValid("")).toBe(false);
  });
});