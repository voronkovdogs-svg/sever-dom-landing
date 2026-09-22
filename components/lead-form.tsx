"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPhone } from "@/lib/phone";
import { leadSchema, type LeadInput } from "@/schemas/lead";
import { trackEvent } from "@/lib/analytics";

type LeadFormProps = {
  calculator?: Record<string, unknown>;
  compact?: boolean;
};

export function LeadForm({ calculator, compact = false }: LeadFormProps) {
  const [serverState, setServerState] = useState<{ type: "idle" | "success" | "error"; message?: string }>({
    type: "idle",
    message: "Демонстрационная форма: данные никуда не отправляются.",
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", contactMethod: "call", comment: "", consent: false, company: "" },
    shouldFocusError: true,
  });

  const onSubmit = handleSubmit(() => {
    trackEvent("lead_submit", { source: compact ? "calculator" : "contact" });
    void calculator;
    setServerState({ type: "success", message: "Демо готово: форма проверена, но данные не были отправлены." });
    trackEvent("lead_success", { source: compact ? "calculator" : "contact" });
    reset();
  });

  return (
    <form className={compact ? "lead-form compact" : "lead-form"} onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={compact ? "name-calc" : "name"}>Имя</label>
          <input
            id={compact ? "name-calc" : "name"}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? (compact ? "name-calc-error" : "name-error") : undefined}
            {...register("name")}
          />
          {errors.name && <span className="field-error" id={compact ? "name-calc-error" : "name-error"}>{errors.name.message}</span>}
        </div>
        <div className="field">
          <label htmlFor={compact ? "phone-calc" : "phone"}>Телефон</label>
          <input
            id={compact ? "phone-calc" : "phone"}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? (compact ? "phone-calc-error" : "phone-error") : undefined}
            {...register("phone", {
              onChange: (event) => setValue("phone", formatPhone(event.target.value), { shouldValidate: false }),
            })}
          />
          {errors.phone && <span className="field-error" id={compact ? "phone-calc-error" : "phone-error"}>{errors.phone.message}</span>}
        </div>
      </div>

      <fieldset className="contact-method">
        <legend>Как удобнее связаться</legend>
        <Controller
          control={control}
          name="contactMethod"
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="radio-row">
              {[
                ["call", "Позвонить"],
                ["telegram", "Telegram"],
                ["whatsapp", "WhatsApp"],
              ].map(([value, label]) => (
                <label className="radio-label" key={value}>
                  <RadioGroupItem value={value} />
                  {label}
                </label>
              ))}
            </RadioGroup>
          )}
        />
      </fieldset>

      {!compact && (
        <div className="field">
          <label htmlFor="comment">Комментарий <span>необязательно</span></label>
          <textarea id="comment" rows={4} placeholder="Площадь, участок, пожелания к планировке" {...register("comment")} />
          {errors.comment && <span className="field-error">{errors.comment.message}</span>}
        </div>
      )}

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={compact ? "company-calc" : "company"}>Компания</label>
        <input id={compact ? "company-calc" : "company"} tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <Controller
        control={control}
        name="consent"
        render={({ field }) => (
          <div>
            <label className="consent-row">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? (compact ? "consent-calc-error" : "consent-error") : undefined}
              />
              <span>Согласен на обработку данных по <Link href="/privacy">политике конфиденциальности</Link></span>
            </label>
            {errors.consent && <span className="field-error" id={compact ? "consent-calc-error" : "consent-error"}>{errors.consent.message}</span>}
          </div>
        )}
      />

      <button className="button submit-button" type="submit">
        {compact ? "Показать демо-результат" : "Показать демо-расчет"}
      </button>

      <div className={"form-status " + serverState.type} aria-live="polite" aria-atomic="true">
        {serverState.type === "success" && <CheckCircle2 aria-hidden="true" />}
        {serverState.message}
      </div>
    </form>
  );
}
