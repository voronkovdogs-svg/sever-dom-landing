import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <span>404</span>
        <h1>Такой страницы нет</h1>
        <p>Вернитесь на главную — там находятся проекты, калькулятор и ответы на вопросы.</p>
        <Link className="button" href="/">На главную</Link>
      </div>
    </main>
  );
}
