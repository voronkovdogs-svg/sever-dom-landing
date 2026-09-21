import { describe, expect, it } from "vitest";
import { leadSchema } from "@/schemas/lead";

describe("leadSchema", () => {
  it("accepts a complete lead", () => {
    const result = leadSchema.safeParse({
      name: "Анна",
      phone: "+7 (999) 123-45-67",
      contactMethod: "telegram",
      comment: "",
      consent: true,
      company: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid phone and missing consent", () => {
    const result = leadSchema.safeParse({
      name: "А",
      phone: "123",
      contactMethod: "call",
      consent: false,
      company: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    const result = leadSchema.safeParse({
      name: "Анна",
      phone: "+7 (999) 123-45-67",
      contactMethod: "call",
      consent: true,
      company: "bot",
    });
    expect(result.success).toBe(false);
  });
});
