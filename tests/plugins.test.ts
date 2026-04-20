import { describe, it, expect, vi, beforeAll } from "vitest";
import { MeroDate } from "../src";
import { isTodayPlugin } from "../src/plugins/isToday";
import { diffPlugin } from "../src/plugins/diff";
import { isSamePlugin } from "../src/plugins/isSame";
import { isBetweenPlugin } from "../src/plugins/isBetween";
import { startEndPlugin } from "../src/plugins/startEnd";
import "../src/types/plugins.d";

describe("Plugins", () => {
  beforeAll(() => {
    MeroDate.extend(isTodayPlugin);
    MeroDate.extend(diffPlugin);
    MeroDate.extend(isSamePlugin);
    MeroDate.extend(isBetweenPlugin);
    MeroDate.extend(startEndPlugin);
  });

  it("should add isToday method", () => {
    const date = MeroDate("2024-01-15");
    expect(typeof date.isToday).toBe("function");
  });

  it("should return true for today", () => {
    const mockNow = new Date("2024-01-15");
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);

    const date = MeroDate("2024-01-15");
    expect(date.isToday()).toBe(true);

    vi.useRealTimers();
  });

  it("should return false for other dates", () => {
    const mockNow = new Date("2024-01-15");
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);

    const date = MeroDate("2024-01-14");
    expect(date.isToday()).toBe(false);

    vi.useRealTimers();
  });

  it("should add isSame method", () => {
    const date = MeroDate("2024-01-15");
    expect(typeof date.isSame).toBe("function");
  });

  it("should return true for same dates", () => {
    const date1 = MeroDate("2024-01-15");
    const date2 = MeroDate("2024-01-15");
    expect(date1.isSame(date2)).toBe(true);
  });

  it("should return false for different dates", () => {
    const date1 = MeroDate("2024-01-15");
    const date2 = MeroDate("2024-01-16");
    expect(date1.isSame(date2)).toBe(false);
  });

  it("should add diff method", () => {
    const date = MeroDate("2024-01-15");
    expect(typeof date.diff).toBe("function");
  });

  it("should calculate day difference", () => {
    const date1 = MeroDate("2024-01-15");
    const date2 = MeroDate("2024-01-20");
    expect(date1.diff(date2, "days")).toBe(-5);
    expect(date2.diff(date1, "days")).toBe(5);
  });

  it("should calculate month difference", () => {
    const date1 = MeroDate("2024-01-15");
    const date2 = MeroDate("2024-03-15");
    expect(date1.diff(date2, "months")).toBe(-2);
    expect(date2.diff(date1, "months")).toBe(2);
  });

  it("should calculate year difference", () => {
    const date1 = MeroDate("2023-01-15");
    const date2 = MeroDate("2025-01-15");
    expect(date1.diff(date2, "years")).toBe(-2);
    expect(date2.diff(date1, "years")).toBe(2);
  });

  it("should calculate year difference with float false", () => {
    const date1 = MeroDate("2024-01-01");
    const date2 = MeroDate("2025-06-01");
    expect(date1.diff(date2, "years", false)).toBe(-2);
  });

  it("should add isBetween method", () => {
    const date = MeroDate("2024-01-15");
    expect(typeof date.isBetween).toBe("function");
  });

  it("should return true when date is between range", () => {
    const date = MeroDate("2024-01-15");
    const start = MeroDate("2024-01-10");
    const end = MeroDate("2024-01-20");
    expect(date.isBetween(start, end)).toBe(true);
    expect(date.isBetween(start, end, "[]")).toBe(true);
    expect(date.isBetween(start, end, "()")).toBe(true);
  });

  it("should return false when date is outside range", () => {
    const date = MeroDate("2024-01-25");
    const start = MeroDate("2024-01-10");
    const end = MeroDate("2024-01-20");
    expect(date.isBetween(start, end)).toBe(false);
    expect(date.isBetween(start, end, "[]")).toBe(false);
  });

  it("should handle different inclusivity options", () => {
    const date = MeroDate("2024-01-15");
    const start = MeroDate("2024-01-10");
    const end = MeroDate("2024-01-20");
    expect(date.isBetween(start, end, "()")).toBe(true);
    expect(date.isBetween(start, end, "(]")).toBe(true);
    expect(date.isBetween(start, end, "[)")).toBe(true);
  });

  it("should add startOf and endOf methods", () => {
    const date = MeroDate("2024-01-15");
    expect(typeof date.startOf).toBe("function");
    expect(typeof date.endOf).toBe("function");
  });

  it("should handle year start/end", () => {
    const date = MeroDate("2024-06-15");
    const startOfYear = date.startOf("year");
    const endOfYear = date.endOf("year");

    expect(startOfYear).toBeDefined();
    expect(endOfYear).toBeDefined();
    expect(startOfYear.toAD()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(endOfYear.toAD()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("should handle month start/end", () => {
    const date = MeroDate("2024-06-15");
    const startOfMonth = date.startOf("month");
    const endOfMonth = date.endOf("month");

    expect(startOfMonth).toBeDefined();
    expect(endOfMonth).toBeDefined();
    expect(startOfMonth.toAD()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(endOfMonth.toAD()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("should handle day start/end", () => {
    const date = MeroDate("2024-06-15");
    const startOfDay = date.startOf("day");
    const endOfDay = date.endOf("day");

    expect(startOfDay.toAD()).toBe(date.toAD());
    expect(endOfDay.toAD()).toBe(date.toAD());
  });
});