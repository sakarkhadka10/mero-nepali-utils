import { describe, it, expect } from "vitest";
import { meroBs } from "../src";
import {
  InvalidDateFormatError,
  InvalidDateValueError,
} from "../src/core/errors";

describe("🚨 Error Handling", () => {
  it("should throw format error", () => {
    expect(() => meroBs("invalid")).toThrow(InvalidDateFormatError);
  });

  it("should throw value error", () => {
    expect(() => meroBs("2024-13-01")).toThrow(InvalidDateValueError);
  });
});