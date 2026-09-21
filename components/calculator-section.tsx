"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { calculateEstimate, formatPrice, type CalculatorInput, type Finish, type Floors, type Option } from "@/config/calculator";
import type { Technology } from "@/content/site-data";
import { LeadForm } from "@/components/lead-form";
import { trackEvent } from "@/lib/analytics";

const stepTitles = ["Технология", "Площадь", "Этажность", "Комплектация", "Дополнения"];
const technologyOptions: Technology[] = ["Каркас", "Газобетон", "Керамический блок"];
const floorOptions: Array<{ value: Floors; label: string }> = [
  { value: "1", label: "1 этаж" },
  { value: "1.5", label: "1,5 этажа" },
  { value: "2", label: "2 этажа" },
];
const finishOptions: Array<{ value: Finish; label: string; detail: string }> = [
  { value: "warm", label: "Теплый контур", detail: "Фундамент, стены, кровля, окна и входная дверь" },
  { value: "preFinish", label: "Под чистовую", detail: "Контур, инженерная подготовка и выровненные поверхности" },
  { value: "turnkey", label: "Под ключ", detail: "Готовая отделка и базовый комплект инженерии" },
];
const optionItems: Array<{ value: Option; label: string; price: string }> = [
  { value: "terrace", label: "Крытая терраса", price: "+780 тыс. ₽" },
  { value: "boiler", label: "Отдельная котельная", price: "+420 тыс. ₽" },
  { value: "carport", label: "Навес для автомобиля", price: "+690 тыс. ₽" },
  { value: "utilities", label: "Инженерные сети", price: "+1,35 млн ₽" },
];

export function CalculatorSection() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<CalculatorInput>({
    technology: "Каркас",
    area: 120,
    floors: "1",
    finish: "preFinish",
    options: [],
  });
  const estimate = useMemo(() => calculateEstimate(input), [input]);
  const isResult = step === stepTitles.length;
  const progress = (Math.min(step + 1, stepTitles.length) / stepTitles.length) * 100;

  const toggleOption = (option: Option, checked: boolean) => {
    setInput((current) => ({
      ...current,
      options: checked
        ? [...current.options, option]
        : current.options.filter((item) => item !== option),
    }));
  };

  const advance = () => {
    if (step === 0) trackEvent("calculator_start");
    trackEvent("calculator_step_complete", { step: step + 1, name: stepTitles[step] });
    if (step === stepTitles.length - 1) trackEvent("calculator_complete", { area: input.area, technology: input.technology });
    setStep((current) => Math.min(stepTitles.length, current + 1));
  };

  return (
    <section className="section section-calculator" id="cost" aria-labelledby="calculator-title">
      <div className="shell calculator-layout">
        <div className="calculator-intro">
          <p className="eyebrow">Предварительный расчет</p>
          <h2 id="calculator-title">Соберите свой сценарий дома</h2>
          <p>Пять коротких шагов дают честный ценовой диапазон и показывают, из чего он складывается.</p>
          <div className="calculator-note">
            <strong>Это ориентир, не публичная оферта.</strong>
            <span>Точная смета формируется после проверки участка, проекта и состава инженерии.</span>
          </div>
        </div>

        <div className="calculator-card">
          {!isResult && (
            <>
              <div className="calculator-topline">
                <span>Шаг {step + 1} из {stepTitles.length}</span>
                <strong>{stepTitles[step]}</strong>
              </div>
              <Progress value={progress} aria-label={"Прогресс расчета: " + Math.round(progress) + "%"} />
            </>
          )}

          <div className="calculator-content">
            {step === 0 && (
              <RadioGroup
                value={input.technology}
                onValueChange={(value) => setInput({ ...input, technology: value as Technology })}
                className="choice-grid"
                aria-label="Технология строительства"
              >
                {technologyOptions.map((value) => (
                  <label className="choice-card" key={value}>
                    <RadioGroupItem value={value} />
                    <span><strong>{value}</strong><small>{value === "Каркас" ? "Быстро и энергоэффективно" : value === "Газобетон" ? "Капитально и гибко" : "Массивно и долговечно"}</small></span>
                  </label>
                ))}
              </RadioGroup>
            )}
            {step === 1 && (
              <div className="area-step">
                <div className="area-value"><strong>{input.area}</strong><span>м²</span></div>
                <Slider
                  min={60}
                  max={250}
                  step={5}
                  value={[input.area]}
                  onValueChange={([area]) => setInput({ ...input, area })}
                  aria-label="Площадь дома"
                />
                <div className="area-presets">
                  {[80, 120, 160, 200].map((area) => <button type="button" key={area} onClick={() => setInput({ ...input, area })}>{area} м²</button>)}
                </div>
              </div>
            )}
            {step === 2 && (
              <RadioGroup
                value={input.floors}
                onValueChange={(value) => setInput({ ...input, floors: value as Floors })}
                className="choice-grid"
                aria-label="Этажность дома"
              >
                {floorOptions.map(({ value, label }) => (
                  <label className="choice-card" key={value}><RadioGroupItem value={value} /><span><strong>{label}</strong><small>{value === "1" ? "Все сценарии на одном уровне" : "Компактнее пятно застройки"}</small></span></label>
                ))}
              </RadioGroup>
            )}
            {step === 3 && (
              <RadioGroup
                value={input.finish}
                onValueChange={(value) => setInput({ ...input, finish: value as Finish })}
                className="choice-stack"
                aria-label="Комплектация дома"
              >
                {finishOptions.map(({ value, label, detail }) => (
                  <label className="choice-card" key={value}><RadioGroupItem value={value} /><span><strong>{label}</strong><small>{detail}</small></span></label>
                ))}
              </RadioGroup>
            )}
            {step === 4 && (
              <div className="choice-stack">
                {optionItems.map(({ value, label, price }) => {
                  const checked = input.options.includes(value);
                  return (
                    <label className="choice-card" key={value}>
                      <Checkbox checked={checked} onCheckedChange={(state) => toggleOption(value, state === true)} />
                      <span><strong>{label}</strong><small>{price}</small></span>
                    </label>
                  );
                })}
              </div>
            )}
            {isResult && (
              <div className="calculator-result">
                <span className="result-kicker"><Check aria-hidden="true" /> Предварительный диапазон</span>
                <h3>{formatPrice(estimate.min)} — {formatPrice(estimate.max)}</h3>
                <dl className="result-breakdown">
                  <div><dt>Базовая часть</dt><dd>{formatPrice(Math.round(estimate.base))}</dd></div>
                  <div><dt>Дополнительные опции</dt><dd>{formatPrice(estimate.extras)}</dd></div>
                  <div><dt>Сценарий</dt><dd>{input.area} м² · {input.technology} · {input.floors} эт.</dd></div>
                </dl>
                <p className="result-caption">Диапазон учитывает демонстрационные ставки и запас на уточнение проекта. Финальная смета появится после обследования участка.</p>
                <LeadForm compact calculator={input as unknown as Record<string, unknown>} />
              </div>
            )}
          </div>

          <div className="calculator-actions">
            <button className="back-button" type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
              <ArrowLeft aria-hidden="true" /> Назад
            </button>
            {!isResult && (
              <button className="button" type="button" onClick={advance}>
                {step === stepTitles.length - 1 ? "Показать расчет" : "Продолжить"} <ArrowRight aria-hidden="true" />
              </button>
            )}
            {isResult && <button className="back-button" type="button" onClick={() => setStep(0)}>Изменить параметры</button>}
          </div>
        </div>
      </div>
    </section>
  );
}
