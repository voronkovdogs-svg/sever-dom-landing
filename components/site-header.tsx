"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  ["Проекты", "#projects"],
  ["Стоимость", "#cost"],
  ["Как работаем", "#process"],
  ["Кейсы", "#cases"],
  ["Отзывы", "#reviews"],
  ["FAQ", "#faq"],
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"site-header " + (scrolled ? "is-scrolled" : "")}>
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Север Дом — на главную">
          <span className="brand-mark" aria-hidden="true">С</span>
          <span>Север Дом</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="phone" href="tel:+79991234567">+7 (999) 123-45-67</a>
          <a className="button button-small" href="#cost">Рассчитать</a>
          <Sheet>
            <SheetTrigger asChild>
              <button className="menu-button" type="button" aria-label="Открыть меню">
                <Menu aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetHeader>
                <SheetTitle>Навигация</SheetTitle>
                <SheetDescription>Демонстрационный сайт «Север Дом»</SheetDescription>
              </SheetHeader>
              <nav className="mobile-nav" aria-label="Мобильная навигация">
                {navigation.map(([label, href]) => (
                  <SheetClose asChild key={href}><a href={href}>{label}</a></SheetClose>
                ))}
              </nav>
              <div className="mobile-sheet-footer">
                <a href="tel:+79991234567">+7 (999) 123-45-67</a>
                <SheetClose asChild><a className="button" href="#cost">Рассчитать стоимость</a></SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
