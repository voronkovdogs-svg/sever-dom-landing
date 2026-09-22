export const dynamic = "force-static";

export function GET() {
  return Response.json({
    ok: false,
    mode: "static-demo",
    message: "Отправка заявок отключена в версии для GitHub Pages.",
  });
}
