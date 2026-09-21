"use client";

import { Check, Minus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const packages = {
  contour: {
    title: "Теплый контур",
    price: "от 58 000 ₽/м²",
    description: "Защищенная от осадков и холода коробка, готовая к инженерным работам.",
    items: ["Рабочий проект", "Подготовка участка", "Фундамент", "Несущие стены", "Кровля", "Окна и входная дверь"],
  },
  prefinish: {
    title: "Под чистовую",
    price: "от 72 000 ₽/м²",
    description: "Дом с базовыми инженерными сетями и поверхностями под финишную отделку.",
    items: ["Все из теплого контура", "Черновая электрика", "Водоснабжение и канализация", "Отопление", "Стяжка и штукатурка", "Вентиляционные каналы"],
  },
  turnkey: {
    title: "Под ключ",
    price: "от 89 000 ₽/м²",
    description: "Готовое пространство для переезда с согласованной отделкой и инженерией.",
    items: ["Все из «под чистовую»", "Чистовые покрытия", "Межкомнатные двери", "Сантехника", "Розетки и освещение", "Пусконаладка систем"],
  },
} as const;

const stages = ["Проект", "Участок", "Фундамент", "Коробка", "Кровля", "Окна", "Инженерия", "Отделка"];

export function PackagesSection() {
  return (
    <section className="section section-packages" aria-labelledby="packages-title">
      <div className="shell">
        <div className="section-heading heading-row">
          <div><p className="eyebrow eyebrow-dark">Состав работ</p><h2 id="packages-title">Что входит в стоимость</h2></div>
          <p>Комплектации можно сравнить без мелкого шрифта. В договоре состав раскладывается по материалам и этапам.</p>
        </div>
        <Tabs defaultValue="prefinish" className="package-tabs">
          <TabsList aria-label="Комплектации строительства">
            {Object.entries(packages).map(([value, item]) => <TabsTrigger key={value} value={value}>{item.title}</TabsTrigger>)}
          </TabsList>
          {Object.entries(packages).map(([value, item], packageIndex) => (
            <TabsContent key={value} value={value} className="package-panel">
              <div className="package-summary">
                <span>Ориентир</span><strong>{item.price}</strong><p>{item.description}</p>
                <a className="button" href="#cost">Рассчитать комплектацию</a>
              </div>
              <div className="package-details">
                <h3>Включено</h3>
                <ul>{item.items.map((entry) => <li key={entry}><Check aria-hidden="true" />{entry}</li>)}</ul>
                <div className="stage-strip" aria-label="Охват этапов">
                  {stages.map((stage, stageIndex) => (
                    <span className={stageIndex <= 5 + packageIndex ? "included" : ""} key={stage}>
                      {stageIndex <= 5 + packageIndex ? <Check aria-hidden="true" /> : <Minus aria-hidden="true" />}{stage}
                    </span>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
