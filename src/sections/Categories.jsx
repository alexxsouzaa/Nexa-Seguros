import { asset } from "../lib/site.js";
import { Heart, Smile, Building2, ArrowRight } from "lucide-react";

const CARDS = [
  {
    id: "solucoes",
    img: "/img/plano-saude.webp",
    alt: "Atendimento de saúde e cuidado com o paciente",
    title: "Plano de Saúde",
    desc: "Para cuidar da sua saúde com mais segurança e tranquilidade, com rede e cobertura que fazem sentido para você.",
    href: "#simulador",
    Icon: Heart
  },
  {
    id: "odontologico",
    img: "/img/plano-odontologico.webp",
    alt: "Consulta e cuidado odontológico",
    title: "Plano Odontológico",
    desc: "Cuidados odontológicos para você, sua família ou sua empresa, com preços acessíveis e cobertura completa.",
    href: "#simulador",
    Icon: Smile
  },
  {
    id: "empresas",
    img: "/img/planos-empresariais.webp",
    alt: "Equipe de trabalho em ambiente corporativo",
    title: "Planos Empresariais",
    desc: "Soluções para empresas que querem cuidar das pessoas que fazem parte do negócio, do diagnóstico ao pós-venda.",
    href: "#simulador",
    Icon: Building2
  }
];

export default function Categories() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center r">
          <p className="eyebrow">Soluções</p>
          <h2>Um plano para cada momento</h2>
          <p className="section-sub">
            Saúde, odontológico ou empresarial: veja as opções de cada caminho.
          </p>
        </div>

        <div className="grid-3">
          {CARDS.map((c) => {
            const Icon = c.Icon;
            return (
              <article className="card r" id={c.id} key={c.id} style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ position: "relative" }}>
                  <img
                    src={asset(c.img)}
                    alt={c.alt}
                    width="640"
                    height="400"
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: 210, objectFit: "cover" }}
                  />
                  <span className="card-ic brand" aria-hidden="true" style={{ position: "absolute", left: 20, bottom: -22, boxShadow: "var(--shadow-md)" }}>
                    <Icon width={22} height={22} strokeWidth={1.7} />
                  </span>
                </div>
                <div style={{ padding: "30px 24px 26px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <h3>{c.title}</h3>
                  <p style={{ flex: 1 }}>{c.desc}</p>
                  <a className="link-arrow" href={c.href}>
                    Ver opções<span aria-hidden="true"><ArrowRight width={16} height={16} /></span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
