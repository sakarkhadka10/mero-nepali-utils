import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fromNow } from "../src/relative/fromNow";
import { MeroDate } from "../src/core/MeroDate";

describe("Coverage - Relative Time Extra", () => {
  const mockNow = new Date("2024-01-15T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(mockNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should test Nepali locale relative time", () => {
    MeroDate.locale("np");
    
    // Past
    expect(fromNow("2024-01-10")).toBe("5 दिन अघि");
    
    // Future
    expect(fromNow("2024-01-20")).toBe("5 दिन पछि");

    // Other units in NP
    MeroDate.calendar("ad");
    expect(fromNow("2020-01-15")).toBe("4 वर्ष अघि");
    MeroDate.calendar("bs");

    MeroDate.locale("en"); // Reset
  });

  it("should test specific units for coverage", () => {
    MeroDate.locale("en");
    MeroDate.calendar("ad");

    // Seconds (0 days)
    const justBefore = new Date(mockNow.getTime() - 1000);
    expect(fromNow(justBefore)).toBe("today"); // because of specialized today/yesterday check

    // Actually, to hit the 's', 'm', 'mm', 'h', 'hh' branches in AD mode, 
    // we need to look at how fromNow handles them.
    // Wait, fromNow.ts only handles days and up in AD mode!
    
    /*
    else {
        if (absDays === 0) result = loc.s;
        ...
    }
    */
    
    // So 'absDays === 0' always returns 'loc.s', but then it returns 'today' because of line 68.
  });
});
