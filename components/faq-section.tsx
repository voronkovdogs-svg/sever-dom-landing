"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/content/site-data";
import { trackEvent } from "@/lib/analytics";

export function FaqSection() {
  return (
    <section className="section section-faq" id="faq" aria-labelledby="faq-title">
      <div className="shell faq-layout">
        <div className="section-heading">
          <p className="eyebrow eyebrow-dark">FAQ</p>
          <h2 id="faq-title">Коротко о важном до начала проекта</h2>
          <p>Если вашего вопроса нет в списке, его можно оставить в форме — для демонстрационного проекта ответ не отправляется реальной компании.</p>
        </div>
        <Accordion type="single" collapsible className="faq-list" onValueChange={(value) => value && trackEvent("faq_open", { item: value })}>
          {faqItems.map(([question, answer], index) => (
            <AccordionItem value={"item-" + index} key={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent><p>{answer}</p></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
