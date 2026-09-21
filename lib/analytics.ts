export type AnalyticsEvent =
  | "cta_click"
  | "calculator_start"
  | "calculator_step_complete"
  | "calculator_complete"
  | "lead_submit"
  | "lead_success"
  | "lead_error"
  | "project_view"
  | "faq_open";

export function trackEvent(_event: AnalyticsEvent, _data?: Record<string, string | number | boolean>) {
  // Demo mode: intentionally no-op. Connect Yandex Metrica or another provider here.
  void _event;
  void _data;
}
