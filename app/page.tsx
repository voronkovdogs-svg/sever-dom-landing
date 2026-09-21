import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Camera,
  Check,
  ClipboardCheck,
  FileText,
  HardHat,
  MessageSquareText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ProjectsSection } from "@/components/projects-section";
import { CalculatorSection } from "@/components/calculator-section";
import { PackagesSection } from "@/components/packages-section";
import { CasesSection } from "@/components/cases-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { LeadForm } from "@/components/lead-form";
import { FloatingActions } from "@/components/floating-actions";
import { WebMcpTools } from "@/components/webmcp-tools";
import { buildDirections, faqItems, processSteps, siteFacts } from "@/content/site-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Север Дом",
    url: siteUrl,
    description: "Демонстрационный проект строительной компании. Компания и данные вымышлены.",
    email: "hello@sever-dom.example.com",
    telephone: "+7-999-123-45-67",
    areaServed: "Москва и Московская область",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Проектирование и строительство загородных домов",
    provider: { "@type": "Organization", name: "Север Дом" },
    areaServed: "Москва и Московская область",
    serviceType: "Строительство домов под ключ",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#content">Перейти к содержимому</a>
      <SiteHeader />
      <main id="content">
        <section className="hero" id="top">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Москва и Московская область</p>
              <h1>Дом для постоянной жизни — с фиксированной сметой</h1>
              <p className="hero-lead">Проектируем и строим загородные дома под ключ. До начала работ показываем состав сметы, сроки и точки контроля каждого этапа.</p>
              <div className="hero-cta">
                <a className="button" href="#cost">Рассчитать стоимость <ArrowDownRight aria-hidden="true" /></a>
                <a className="button button-ghost" href="#projects">Посмотреть проекты</a>
              </div>
              <ul className="proof-list" aria-label="Принципы работы">
                {["Состав работ фиксируется в договоре", "Оплата по этапам после приемки", "Гарантийные условия без мелкого шрифта"].map((item) => (
                  <li key={item}><Check aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="hero-visual">
              <Image src="/images/hero/sever-dom-hero.webp" alt="Современный загородный дом среди сосен и берез" fill priority sizes="(max-width: 900px) 100vw, 52vw" />
              <div className="project-float">
                <span className="demo-label">Демонстрационный проект</span>
                <strong>«Северный свет»</strong>
                <div><span>186 м²</span><span>от 7–9 мес.</span><span>от 14,8 млн ₽</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="facts" aria-label="Факты о компании">
          <div className="shell">
            <div className="fact-grid">
              {siteFacts.map((fact) => <div className="fact" key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
            </div>
            <p className="demo-notice">Данные приведены для демонстрации концепции и не относятся к реальной компании.</p>
          </div>
        </section>

        <section className="section section-directions" aria-labelledby="directions-title">
          <div className="shell">
            <div className="section-heading heading-row">
              <div><p className="eyebrow eyebrow-dark">Технологии</p><h2 id="directions-title">Выбираем конструкцию под задачу</h2></div>
              <p>Не предлагаем одну технологию всем. Сравниваем сроки, особенности участка, теплотехнику и бюджет.</p>
            </div>
            <div className="direction-grid">
              {buildDirections.map((direction, index) => (
                <article className="direction-card" key={direction.title}>
                  <span className="direction-number">0{index + 1}</span>
                  <h3>{direction.title}</h3>
                  <p>{direction.fit}</p>
                  <div className="direction-values"><span><small>Срок</small>{direction.term}</span><span><small>Ориентир</small>{direction.price}</span></div>
                  <ul>{direction.benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true" />{benefit}</li>)}</ul>
                  <a className="text-link" href="#cost">Рассчитать <ArrowUpRight aria-hidden="true" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProjectsSection />
        <CalculatorSection />
        <PackagesSection />

        <section className="section section-process" id="process" aria-labelledby="process-title">
          <div className="shell">
            <div className="section-heading heading-row">
              <div><p className="eyebrow">Процесс</p><h2 id="process-title">Шесть проверяемых этапов до ключей</h2></div>
              <p>У каждого шага есть понятный результат: документ, расчет, приемка или готовая часть дома.</p>
            </div>
            <ol className="process-list">
              {processSteps.map(([title, description], index) => (
                <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <CasesSection />

        <section className="section section-benefits" aria-labelledby="benefits-title">
          <div className="shell">
            <div className="section-heading heading-row">
              <div><p className="eyebrow eyebrow-dark">Система контроля</p><h2 id="benefits-title">Доверие строится на процессе</h2></div>
              <p>Каждое обещание привязано к конкретному действию, документу или точке приемки.</p>
            </div>
            <div className="benefit-grid">
              {[
                [FileText, "Фиксируем состав", "Приложение к договору перечисляет материалы и работы, которые входят в цену."],
                [ClipboardCheck, "Принимаем по этапам", "Следующий платеж связан с результатом и актом выполненных работ."],
                [Camera, "Показываем ход работ", "Фотоотчеты и журнал помогают контролировать скрытые операции."],
                [MessageSquareText, "Один ответственный", "Менеджер собирает вопросы и координирует проектировщиков и стройку."],
                [ShieldCheck, "Описываем гарантию", "Сроки, процедура обращения и исключения указаны в договоре."],
                [WalletCards, "Платежи прозрачны", "График оплаты совпадает с календарным планом и контрольными точками."],
              ].map(([Icon, title, text]) => {
                const IconComponent = Icon as typeof FileText;
                return <article className="benefit-card" key={String(title)}><IconComponent aria-hidden="true" /><h3>{String(title)}</h3><p>{String(text)}</p></article>;
              })}
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <section className="section section-guarantee" aria-labelledby="guarantee-title">
          <div className="shell guarantee-layout">
            <div className="guarantee-copy">
              <p className="eyebrow">Договор и гарантия</p>
              <h2 id="guarantee-title">Понятные правила важнее громких обещаний</h2>
              <p>В рабочем договоре должны быть зафиксированы этапы, состав работ, график платежей, порядок приемки и гарантийного обращения.</p>
              <a className="button button-light" href="#contact">Обсудить проект</a>
            </div>
            <div className="document-card" aria-label="Состав демонстрационного договора">
              <div className="document-top"><FileText aria-hidden="true" /><span>Шаблон договора · демо</span></div>
              <ul>
                <li><Check aria-hidden="true" />Смета и спецификация приложением</li>
                <li><Check aria-hidden="true" />Календарный график и точки приемки</li>
                <li><Check aria-hidden="true" />Порядок согласования изменений</li>
                <li><Check aria-hidden="true" />Гарантийные сроки и процедура обращения</li>
              </ul>
              <p>Не является юридическим документом. Перед реальным использованием требуется проверка юристом.</p>
            </div>
          </div>
        </section>

        <FaqSection />

        <section className="section section-contact" id="contact" aria-labelledby="contact-title">
          <div className="shell contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Следующий шаг</p>
              <h2 id="contact-title">Получите персональный расчет и подборку проектов</h2>
              <p>Оставьте ориентиры по дому. В демонстрационном режиме форма вернет номер заявки, но не отправит персональные данные реальной компании.</p>
              <div className="contact-points">
                <span><HardHat aria-hidden="true" />Учтем особенности участка</span>
                <span><BadgeCheck aria-hidden="true" />Покажем состав диапазона</span>
              </div>
            </div>
            <div className="contact-form-card"><LeadForm /></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer-grid">
          <div><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true">С</span><span>Север Дом</span></a><p>Демонстрационный проект для портфолио. Компания, контакты и данные вымышлены.</p></div>
          <div><strong>Разделы</strong><a href="#projects">Проекты</a><a href="#cost">Стоимость</a><a href="#process">Как работаем</a><a href="#faq">FAQ</a></div>
          <div><strong>Контакты · демо</strong><a href="tel:+79991234567">+7 (999) 123-45-67</a><a href="mailto:hello@sever-dom.example.com">hello@sever-dom.example.com</a><span>Пн–Сб, 09:00–19:00</span><span>Москва и Московская область</span></div>
          <div><strong>Документы</strong><a href="/privacy">Политика обработки данных</a><span>© {new Date().getFullYear()} Север Дом</span></div>
        </div>
      </footer>
      <FloatingActions />
      <WebMcpTools />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
