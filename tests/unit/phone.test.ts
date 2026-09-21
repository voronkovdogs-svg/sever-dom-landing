import { describe, expect, it } from "vitest";
import { formatPhone, normalizePhone } from "@/lib/phone";

describe("phone utilities", () => {
  it.each([
    ["8 (999) 123-45-67", "79991234567"],
    ["+7 999 123 45 67", "79991234567"],
    ["9991234567", "79991234567"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizePhone(input)).toBe(expected);
  });

  it("formats progressive input", () => {
    expect(formatPhone("89991234567")).toBe("+7 (999) 123-45-67");
  });
});
