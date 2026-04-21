import { describe, it, expect } from "vitest";
import { MeroDate, MeroDateClass } from "../src/core/MeroDate";

describe("MeroDate - Core + Plugins", () => {
  it("creates instance", () => {
    const d = MeroDate();
    expect(d).toBeInstanceOf(MeroDateClass);
  });

  it("converts to BS", () => {
    const d = MeroDate("2024-01-01");
    expect(d.toBS()).toBeDefined();
  });

  it("formats date", () => {
    const d = MeroDate("2024-01-01");
    const formatted = d.format("YYYY-MM-DD");
    expect(typeof formatted).toBe("string");
  });

  it("adds and subtracts days", () => {
    const d = MeroDate("2024-01-01");
    const added = d.addDays(5);
    const subtracted = d.subtractDays(5);

    expect(added).toBeInstanceOf(MeroDateClass);
    expect(subtracted).toBeInstanceOf(MeroDateClass);
  });

  it("diff works", () => {
    const d = MeroDate("2024-01-10") as MeroDateClass;
    const diff = d.diff("2024-01-01", "days");

    expect(diff).toBe(9);
  });

  it("isSame works", () => {
    const d = MeroDate("2024-01-01") as MeroDateClass;
    expect(d.isSame("2024-01-01")).toBe(true);
  });

  it("isBetween works", () => {
    const d = MeroDate("2024-01-05") as MeroDateClass;
    expect(d.isBetween("2024-01-01", "2024-01-10")).toBe(true);
  });

  it("isToday works", () => {
    const today = new Date();
    const d = MeroDate(today) as MeroDateClass;

    expect(typeof d.isToday()).toBe("boolean");
  });

  it("startOf & endOf exist", () => {
    const d = MeroDate() as MeroDateClass;

    expect(d.startOf("month")).toBeInstanceOf(MeroDateClass);
    expect(d.endOf("month")).toBeInstanceOf(MeroDateClass);
  });

  it("relative time works", () => {
    const d = MeroDate("2020-01-01") as MeroDateClass;

    expect(typeof d.fromNow()).toBe("string");
    expect(typeof d.toNow()).toBe("string");
    expect(typeof d.from("2022-01-01")).toBe("string");
  });

  it("clone works", () => {
    const d = MeroDate("2024-01-01");
    const clone = d.clone();

    expect(clone).toBeInstanceOf(MeroDateClass);
    expect(clone.toAD()).toBe(d.toAD());
  });

  it("valueOf works", () => {
    const d = MeroDate("2024-01-01");
    expect(typeof d.valueOf()).toBe("number");
  });

  it("toString & toJSON", () => {
    const d = MeroDate("2024-01-01");

    expect(typeof d.toString()).toBe("string");
    expect(typeof d.toJSON()).toBe("string");
  });
});