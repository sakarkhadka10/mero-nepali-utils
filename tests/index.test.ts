import { describe, it, expect } from "vitest";

describe("📦 Public API (index.ts)", () => {
  it("should load index exports", async () => {
    const pkg = await import("../src/index");

    expect(pkg.MeroDate).toBeDefined();
    expect(pkg.meroAd).toBeDefined();
    expect(pkg.meroBs).toBeDefined();
    expect(pkg.formatBs).toBeDefined();
    expect(pkg.toNepaliNumber).toBeDefined();
    expect(pkg.toEnglishNumber).toBeDefined();
    expect(pkg.fromNow).toBeDefined();
    expect(pkg.isRoundTripValid).toBeDefined();
    expect(pkg.SUPPORTED_BS_RANGE).toBeDefined();
    expect(pkg.SUPPORTED_AD_RANGE).toBeDefined();
  });
});