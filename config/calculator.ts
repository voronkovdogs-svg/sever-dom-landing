import type { Technology } from "@/content/site-data";

export type Floors = "1" | "1.5" | "2";
export type Finish = "warm" | "preFinish" | "turnkey";
export type Option = "terrace" | "boiler" | "carport" | "utilities";

export type CalculatorInput = {
  technology: Technology;
  area: number;
  floors: Floors;
  finish: Finish;
  options: Option[];
};

export const calculatorConfig = {
  isDemo: true,
  baseRates: { Каркас: 58000, Газобетон: 72000, "Керамический блок": 81000 },
  floorCoefficients: { "1": 1, "1.5": 1.07, "2": 1.12 },
  finishCoefficients: { warm: 1, preFinish: 1.24, turnkey: 1.52 },
  optionPrices: { terrace: 780000, boiler: 420000, carport: 690000, utilities: 1350000 },
} as const;

export function calculateEstimate(input: CalculatorInput) {
  const base = calculatorConfig.baseRates[input.technology] * input.area;
  const withFloors = base * calculatorConfig.floorCoefficients[input.floors];
  const withFinish = withFloors * calculatorConfig.finishCoefficients[input.finish];
  const extras = input.options.reduce((sum, option) => sum + calculatorConfig.optionPrices[option], 0);
  const midpoint = withFinish + extras;
  return {
    base,
    extras,
    min: Math.round(midpoint * 0.92 / 10000) * 10000,
    max: Math.round(midpoint * 1.12 / 10000) * 10000,
  };
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}
