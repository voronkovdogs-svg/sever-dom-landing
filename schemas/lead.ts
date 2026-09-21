import { z } from "zod";
import { normalizePhone } from "@/lib/phone";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80, "Имя слишком длинное"),
  phone: z.string().refine((value) => /^7\d{10}$/.test(normalizePhone(value)), "Введите российский номер полностью"),
  contactMethod: z.enum(["call", "telegram", "whatsapp"]),
  comment: z.string().trim().max(1200, "Комментарий слишком длинный").optional().default(""),
  consent: z.boolean().refine((value) => value, "Нужно согласие на обработку данных"),
  company: z.string().max(0, "Spam detected").optional().default(""),
  calculator: z.record(z.string(), z.unknown()).optional(),
  utm: z.record(z.string(), z.string()).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadPayload = z.output<typeof leadSchema>;
