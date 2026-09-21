"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { cases } from "@/content/site-data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function CasesSection() {
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const move = (direction: number) => {
    if (activeCase === null) return;
    setActiveImage((current) => (current + direction + cases[activeCase].gallery.length) % cases[activeCase].gallery.length);
  };

  const openGallery = (caseIndex: number) => {
    setActiveCase(caseIndex);
    setActiveImage(0);
  };

  return (
    <section className="section section-cases" id="cases" aria-labelledby="cases-title">
      <div className="shell">
        <div className="section-heading heading-row">
          <div><p className="eyebrow eyebrow-dark">Концепт-кейсы</p><h2 id="cases-title">Как задача превращается в решение</h2></div>
          <p>AI-изображения и показатели ниже созданы для демонстрации структуры кейса и не изображают реальные построенные объекты.</p>
        </div>
        <div className="case-grid">
          {cases.map((item, index) => (
            <article className={index === 0 ? "case-card featured" : "case-card"} key={item.title}>
              <button className="case-image" type="button" onClick={() => openGallery(index)} aria-label={"Открыть галерею кейса «" + item.title + "»"}>
                <Image src={item.image} alt={"Концептуальная визуализация: " + item.title} fill sizes={index === 0 ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 900px) 100vw, 33vw"} />
                <span><Expand aria-hidden="true" /> Открыть</span>
              </button>
              <div className="case-body">
                <span className="demo-label">Демонстрационный кейс</span>
                <h3>{item.title}</h3>
                <div className="case-meta"><span>{item.tech}</span><span>{item.area}</span><span>{item.term}</span><span>{item.price}</span></div>
                <p><strong>Задача:</strong> {item.task}</p>
                <p><strong>Результат:</strong> {item.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Dialog open={activeCase !== null} onOpenChange={(open) => !open && setActiveCase(null)}>
        <DialogContent className="lightbox-dialog">
          {activeCase !== null && (
            <>
              <div className="lightbox-image"><Image src={cases[activeCase].gallery[activeImage]} alt={"Кадр " + (activeImage + 1) + " из концептуальной галереи «" + cases[activeCase].title + "»"} fill sizes="min(92vw, 1080px)" /></div>
              <DialogHeader>
                <DialogTitle>{cases[activeCase].title}</DialogTitle>
                <DialogDescription>Демонстрационный AI-концепт, не фотография построенного объекта. {cases[activeCase].result}</DialogDescription>
              </DialogHeader>
              <div className="lightbox-controls">
                <button type="button" onClick={() => move(-1)} aria-label="Предыдущее изображение"><ArrowLeft aria-hidden="true" /></button>
                <span>{activeImage + 1} / {cases[activeCase].gallery.length}</span>
                <button type="button" onClick={() => move(1)} aria-label="Следующее изображение"><ArrowRight aria-hidden="true" /></button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
