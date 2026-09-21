import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FaqSection } from "@/components/faq-section";

describe("FaqSection", () => {
  it("opens an answer from the keyboard-accessible trigger", () => {
    render(<FaqSection />);
    const trigger = screen.getByRole("button", { name: "От чего зависит стоимость дома?" });
    fireEvent.click(trigger);
    expect(screen.getByText(/От площади, технологии стен/)).toBeVisible();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});
