import { describe, expect, it } from "vitest";
import { calculateEstimate, formatPrice } from "@/config/calculator";

describe("calculateEstimate", () => {
  it("calculates a transparent range for the basic scenario", () => {
    const result = calculateEstimate({
      technology: "Каркас",
      area: 100,
      floors: "1",
      finish: "warm",
      options: [],
    });
    expect(result.base).toBe(5_800_000);
    expect(result.extras).toBe(0);
    expect(result.min).toBe(5_340_000);
    expect(result.max).toBe(6_500_000);
  });

  it("adds coefficients and selected options", () => {
    const result = calculateEstimate({
      technology: "Газобетон",
      area: 250,
      floors: "2",
      finish: "turnkey",
      options: ["terrace", "utilities"],
    });
    expect(result.extras).toBe(2_130_000);
    expect(result.min).toBeLessThan(result.max);
    expect(result.min).toBeGreaterThan(20_000_000);
  });

  it("formats ruble prices", () => {
    expect(formatPrice(8_900_000)).toContain("8");
    expect(formatPrice(8_900_000)).toContain("₽");
  });
});
