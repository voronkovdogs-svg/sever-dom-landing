import { NextResponse } from "next/server";
import { leadSchema } from "@/schemas/lead";
import { normalizePhone } from "@/lib/phone";
import { deliverLead } from "@/lib/lead-delivery";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function isAllowed(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);
  if (!current || current.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_REQUESTS) return false;
  current.count += 1;
  return true;
}

function originAllowed(request: Request) {
  const configured = process.env.ALLOWED_ORIGINS?.split(",").map((item) => item.trim()).filter(Boolean);
  if (!configured?.length) return true;
  const origin = request.headers.get("origin");
  return !origin || configured.includes(origin);
}

export async function POST(request: Request) {
  if (!originAllowed(request)) {
    return NextResponse.json({ ok: false, error: "Источник запроса не разрешен" }, { status: 403 });
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!isAllowed(ip)) {
    return NextResponse.json({ ok: false, error: "Слишком много попыток. Повторите позже" }, { status: 429 });
  }

  try {
    const body: unknown = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Проверьте поля формы", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const lead = { ...parsed.data, phone: normalizePhone(parsed.data.phone) };
    const result = await deliverLead(lead);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось обработать заявку";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
