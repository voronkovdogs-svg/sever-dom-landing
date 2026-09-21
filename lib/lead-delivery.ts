import "server-only";
import type { LeadPayload } from "@/schemas/lead";
import { normalizePhone } from "@/lib/phone";

export type DeliveryResult = { ok: true; id: string };

function createLeadId() {
  return "SD-" + crypto.randomUUID().slice(0, 8).toUpperCase();
}

function buildMessage(lead: LeadPayload, id: string) {
  const calculator = lead.calculator ? JSON.stringify(lead.calculator) : "не заполнен";
  return [
    "Новая заявка «Север Дом»",
    "ID: " + id,
    "Имя: " + lead.name,
    "Телефон: +" + normalizePhone(lead.phone),
    "Связь: " + lead.contactMethod,
    "Комментарий: " + (lead.comment || "—"),
    "Калькулятор: " + calculator,
  ].join("\n");
}

export async function deliverLead(lead: LeadPayload): Promise<DeliveryResult> {
  const id = createLeadId();
  const mode = process.env.LEAD_DELIVERY_MODE ?? "mock";

  if (mode === "mock") return { ok: true, id };
  if (mode !== "telegram") throw new Error("Некорректный режим доставки заявок");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("Доставка заявок временно не настроена");

  const response = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: buildMessage(lead, id) }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Не удалось передать заявку. Попробуйте позже");
  return { ok: true, id };
}
