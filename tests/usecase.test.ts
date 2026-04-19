import { describe, it, expect } from "vitest";
import { MeroDate, toNepaliNumber } from "../src";

describe("🌍 Real World Use Case", () => {
  it("should render user join date in Nepali UI", () => {
    const createdAt = "2024-04-13";

    const date = new MeroDate(createdAt).toBS();
    const display = toNepaliNumber(date);

    expect(display).toBe("२०८१-०१-०१");
  });

  it("should format dashboard date", () => {
    const d = new MeroDate("2024-04-13");

    const formatted = d.format("YYYY MMMM DD", { locale: "np" });

    expect(formatted).toBe("2081 बैशाख 01");
  });
});