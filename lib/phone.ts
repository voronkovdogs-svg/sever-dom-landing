export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) return "7" + digits.slice(1);
  if (digits.length === 10) return "7" + digits;
  return digits.slice(0, 11);
}

export function formatPhone(value: string) {
  const normalized = normalizePhone(value);
  const national = normalized.startsWith("7") ? normalized.slice(1) : normalized;
  const parts = national.slice(0, 10);
  let result = "+7";
  if (parts.length) result += " (" + parts.slice(0, 3);
  if (parts.length >= 3) result += ")";
  if (parts.length > 3) result += " " + parts.slice(3, 6);
  if (parts.length > 6) result += "-" + parts.slice(6, 8);
  if (parts.length > 8) result += "-" + parts.slice(8, 10);
  return result;
}
