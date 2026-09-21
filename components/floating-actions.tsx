"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > Math.min(window.innerHeight * 0.8, 720));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <>
      <a className="mobile-cta" href="#cost">Рассчитать стоимость</a>
      <button className="to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Наверх">
        <ArrowUp aria-hidden="true" />
      </button>
    </>
  );
}
