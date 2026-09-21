"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/content/site-data";

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.82, 420), behavior: "smooth" });
  };

  return (
    <section className="section section-reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="shell">
        <div className="section-heading heading-row">
          <div><p className="eyebrow eyebrow-dark">Отзывы</p><h2 id="reviews-title">Демонстрационные отзывы для макета</h2></div>
          <div className="carousel-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Предыдущие отзывы"><ArrowLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Следующие отзывы"><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
        <div className="testimonial-track" ref={trackRef} tabIndex={0} aria-label="Лента демонстрационных отзывов">
          {testimonials.map(([name, text], index) => (
            <blockquote className="testimonial-card" key={name}>
              <Quote aria-hidden="true" />
              <p>«{text}»</p>
              <footer><strong>{name}</strong><span>Вымышленный автор · демо {index + 1}</span></footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
