import { describe, it, expect } from "vitest";
import * as mero from "../src";

describe("Main Exports", () => {
  it("should export MeroDate", () => {
    expect(typeof mero.MeroDate).toBe("function");
    expect(typeof mero.MeroDate()).toBe("object");
  });

  it("should export conversion functions", () => {
    expect(typeof mero.meroAd).toBe("function");
    expect(typeof mero.meroBs).toBe("function");
  });

  it("should export format function", () => {
    expect(typeof mero.formatBs).toBe("function");
  });

  it("should export number conversion functions", () => {
    expect(typeof mero.toNepaliNumber).toBe("function");
    expect(typeof mero.toEnglishNumber).toBe("function");
  });

  it("should export relative time function", () => {
    expect(typeof mero.fromNow).toBe("function");
  });

  it("should export validation function", () => {
    expect(typeof mero.isRoundTripValid).toBe("function");
  });

  it("should export constants", () => {
    expect(mero.SUPPORTED_BS_RANGE).toBeDefined();
    expect(mero.SUPPORTED_AD_RANGE).toBeDefined();
  });

  it("should export plugins", () => {
    expect(typeof mero.isTodayPlugin).toBe("function");
    expect(typeof mero.diffPlugin).toBe("function");
    expect(typeof mero.isSamePlugin).toBe("function");
    expect(typeof mero.isBetweenPlugin).toBe("function");
    expect(typeof mero.startEndPlugin).toBe("function");
  });
});