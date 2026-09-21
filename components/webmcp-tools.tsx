"use client";

import { useEffect } from "react";
import { calculateEstimate, formatPrice, type CalculatorInput, type Finish, type Floors, type Option } from "@/config/calculator";
import type { Technology } from "@/content/site-data";

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
  execute: (input: unknown) => unknown | Promise<unknown>;
};

type ModelContext = {
  registerTool: (tool: ToolDefinition, options?: { signal?: AbortSignal }) => void | Promise<void>;
};

const technologies: Technology[] = ["Каркас", "Газобетон", "Керамический блок"];
const floors: Floors[] = ["1", "1.5", "2"];
const finishes: Finish[] = ["warm", "preFinish", "turnkey"];
const options: Option[] = ["terrace", "boiler", "carport", "utilities"];

function parseEstimateInput(value: unknown): CalculatorInput {
  if (!value || typeof value !== "object") throw new Error("Параметры расчета не переданы");
  const input = value as Record<string, unknown>;
  if (!technologies.includes(input.technology as Technology)) throw new Error("Неизвестная технология");
  if (!floors.includes(input.floors as Floors)) throw new Error("Неизвестная этажность");
  if (!finishes.includes(input.finish as Finish)) throw new Error("Неизвестная комплектация");
  if (typeof input.area !== "number" || input.area < 60 || input.area > 250) throw new Error("Площадь должна быть от 60 до 250 м²");
  if (!Array.isArray(input.options) || input.options.some((item) => !options.includes(item as Option))) throw new Error("Переданы неизвестные опции");
  return input as CalculatorInput;
}

export function WebMcpTools() {
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = (tool: ToolDefinition) => {
      try {
        void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => undefined);
      } catch {
        // Browsers without a complete WebMCP implementation keep the visible UI working.
      }
    };

    register({
      name: "calculate_house_estimate",
      title: "Рассчитать ориентир стоимости дома",
      description: "Возвращает демонстрационный ценовой диапазон по тем же правилам, что и видимый калькулятор сайта.",
      inputSchema: {
        type: "object",
        properties: {
          technology: { type: "string", enum: technologies },
          area: { type: "number", minimum: 60, maximum: 250 },
          floors: { type: "string", enum: floors },
          finish: { type: "string", enum: finishes },
          options: { type: "array", items: { type: "string", enum: options }, uniqueItems: true },
        },
        required: ["technology", "area", "floors", "finish", "options"],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute(input) {
        const estimate = calculateEstimate(parseEstimateInput(input));
        return { min: estimate.min, max: estimate.max, formatted: `${formatPrice(estimate.min)} — ${formatPrice(estimate.max)}`, disclaimer: "Ориентир, не публичная оферта" };
      },
    });

    register({
      name: "start_consultation_request",
      title: "Открыть форму консультации",
      description: "Прокручивает страницу к форме заявки и переводит фокус в поле имени; заявку не отправляет.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute() {
        const section = document.querySelector<HTMLElement>("#contact");
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => section?.querySelector<HTMLInputElement>("#name")?.focus(), 450);
        return { status: "ready", section: "contact" };
      },
    });

    return () => lifecycle.abort();
  }, []);

  return null;
}
