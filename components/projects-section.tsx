"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, BedDouble, Bath, Layers3 } from "lucide-react";
import { projects, type Project, type Technology } from "@/content/site-data";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice } from "@/config/calculator";
import { trackEvent } from "@/lib/analytics";

type TechFilter = "Все" | Technology;
const filters: TechFilter[] = ["Все", "Каркас", "Газобетон", "Керамический блок"];

export function ProjectsSection() {
  const [filter, setFilter] = useState<TechFilter>("Все");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(
    () => filter === "Все" ? projects : projects.filter((project) => project.technology === filter),
    [filter],
  );

  return (
    <section className="section section-projects" id="projects" aria-labelledby="projects-title">
      <div className="shell">
        <div className="section-heading heading-row">
          <div>
            <p className="eyebrow eyebrow-dark">Каталог</p>
            <h2 id="projects-title">Проекты, которые можно адаптировать</h2>
          </div>
          <p>Все карточки — демонстрационные концепты. Площадь, материалы и планировку можно менять под участок.</p>
        </div>
        <div className="filter-list" role="group" aria-label="Фильтр проектов по технологии">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={filter === item ? "filter-chip active" : "filter-chip"}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {visible.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-image">
                <Image src={project.image} alt={"Концепт дома «" + project.title + "»"} fill sizes="(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 33vw" />
                <span className="demo-badge">Демо-проект</span>
              </div>
              <div className="project-body">
                <div className="project-title-row">
                  <div><span>{project.technology}</span><h3>{project.title}</h3></div>
                  <strong>от {formatPrice(project.price)}</strong>
                </div>
                <div className="project-meta" aria-label="Характеристики проекта">
                  <span><Layers3 aria-hidden="true" />{project.area} м² · {project.floors} эт.</span>
                  <span><BedDouble aria-hidden="true" />{project.bedrooms}</span>
                  <span><Bath aria-hidden="true" />{project.bathrooms}</span>
                </div>
                <p>{project.summary}</p>
                <button className="text-link" type="button" onClick={() => { trackEvent("project_view", { project: project.id }); setSelected(project); }}>
                  Подробнее <ArrowUpRight aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="project-dialog">
          {selected && (
            <>
              <div className="dialog-image">
                <Image src={selected.image} alt={"Демонстрационный проект «" + selected.title + "»"} fill sizes="min(92vw, 760px)" />
              </div>
              <DialogHeader>
                <span className="demo-label">Демонстрационный проект</span>
                <DialogTitle>{selected.title} · {selected.area} м²</DialogTitle>
                <DialogDescription>{selected.summary}</DialogDescription>
              </DialogHeader>
              <div className="dialog-columns">
                <div>
                  <h4>Планировочные решения</h4>
                  <ul>{selected.layouts.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h4>Ориентир стоимости</h4>
                  <strong>от {formatPrice(selected.price)}</strong>
                  <p>Предварительно, не публичная оферта. Точная цена зависит от участка и комплектации.</p>
                </div>
              </div>
              <a className="button" href="#cost" onClick={() => setSelected(null)}>Рассчитать этот проект</a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
