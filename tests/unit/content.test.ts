import { describe, expect, it } from "vitest";
import { cases, projects, testimonials } from "@/content/site-data";

describe("demo content", () => {
  it("marks every project and case as demo", () => {
    expect(projects).toHaveLength(6);
    expect(projects.every((project) => project.isDemo)).toBe(true);
    expect(cases).toHaveLength(3);
    expect(cases.every((item) => item.isDemo)).toBe(true);
  });

  it("contains only explicit demo testimonials", () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(4);
  });
});
