import { describe, it, expect } from "vitest";
import { MeroDate, MeroDateClass } from "../src/core/MeroDate";

describe("MeroDate Factory Function", () => {
  it("should create MeroDate instance when called as function", () => {
    const date = MeroDate("2024-01-01");
    expect(date.toAD()).toBe("2024-01-01");
    expect(date.toBS()).toBe("2080-09-16");
  });

  it("should create instance with current date when no argument", () => {
    const date = MeroDate();
    expect(date.toAD()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  describe("extend method", () => {
    it("should allow extending with plugins", () => {
      const testPlugin = (MeroDateClass: typeof MeroDateClass) => {
        (MeroDateClass.prototype as Record<string, unknown>).testMethod = function() {
          return "test";
        };
      };

      MeroDate.extend(testPlugin);

      const date = MeroDate("2024-01-01");
      expect((date as MeroDateClass & { testMethod: () => string }).testMethod()).toBe("test");
    });
  });

  describe("locale method", () => {
    it("should allow setting locale", () => {
      MeroDate.locale("np");
      const date = MeroDate("2024-01-01");
      expect(date.format("MMMM")).toBe("पुष");

      MeroDate.locale("en");
      expect(date.format("MMMM")).toBe("Poush");
    });
  });
});