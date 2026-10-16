import { useState } from "react";
import { waLink } from "../lib/site.js";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const AVATARS = [
  { init: "JS", bg: "#1AA077" },
  { init: "RM", bg: "#1A4738" },
  { init: "CL", bg: "#92D8BE" }
];

const MOCKS = {
  saude: {
    title: "Encontre o plano de saúde ideal",
    desc: "Comparamos as principais operadoras do Brasil para o seu perfil e enviamos as melhores opções direto no WhatsApp.",
    rows: [
      { name: "Operadora A — Enfermaria", sub: "Acomodação enfermaria · regional", price: "R$ 389/mês" },
      { name: "Operadora B — Apartamento", sub: "Apartamento · nacional", price: "R$ 512/mês" },
      { name: "Operadora C — Enfermaria", sub: "Enfermaria · nacional", price: "R$ 447/mês" }
    ]
  },
  odonto: {
    title: "Cuidado odontológico completo",
    desc: "Planos odontológicos individuais, familiares e empresariais com cobertura para consultas, exames e procedimentos.",
    rows: [
      { name: "Odonto Individual", sub: "Consultas, limpeza e exames", price: "R$ 29,90/mês" },
      { name: "Odonto Família", sub: "Até 4 pessoas", price: "R$ 79,90/mês" },
      { name: "Odonto Empresa", sub: "A partir de 2 vidas", price: "R$ 19,90/vida" }
    ]
  },
  empresa: {
    title: "Saúde como benefício para a equipe",
    desc: "Do diagnóstico ao pós-venda: montamos o benefício certo para o tamanho e o momento da sua empresa.",
    rows: [
      { name: "Equipe até 29 vidas", sub: "Operadora parceira", price: "Sob consulta" },
      { name: "Equipe 30 a 99 vidas", sub: "Condições corporativas", price: "Sob consulta" },
      { name: "Equipe 100+ vidas", sub: "Gestão dedicada", price: "Sob consulta" }
    ]
  },
  operadoras: {
    title: "As maiores operadoras em um só lugar",
    desc: "Trabalhamos com as operadoras mais reconhecidas do mercado para comparar cobertura, rede e preço sem viés.",
    rows: [
      { name: "Amil", sub: "Saúde e odontológico", price: "Cotar" },
      { name: "Bradesco Saúde", sub: "Saúde e odontológico", price: "Cotar" },
      { name: "SulAmérica", sub: "Saúde e odontológico", price: "Cotar" }
    ]
  }
};

const TAB_ICONS = {
  saude: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
  odonto: "M12 5.5c-1.5-1.2-3.2-1.8-5-1.5C4.7 4.4 3.5 6.3 3.5 9c0 4.5 2.2 8 3.7 10.5.6 1 1.5 1.6 2.4 1.6 1.3 0 2-1.4 2.4-3.4.4-2 1.1-3.4 2-3.4s1.6 1.4 2 3.4",
  empresa: "M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01",
  operadoras: "M12 3 5 6v5c0 4.2 2.9 7.7 7 9 4.1-1.3 7-4.8 7-9V6l-7-3Z"
};

const TABS = [
  { key: "saude", label: "Saúde" },
  { key: "odonto", label: "Odontológico" },
  { key: "empresa", label: "Empresarial" },
  { key: "operadoras", label: "Operadoras" }
];

export default function Hero() {
  const [tab, setTab] = useState("saude");
  const mock = MOCKS[tab];

  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="container">
        <div className="hero-copy">
          <div className="hero-proof r">
            <div className="avatar-stack" aria-hidden="true">
              {AVATARS.map((a) => (
                <span
                  key={a.init}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: a.bg,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    border: "2px solid var(--bg)",
                    marginLeft: a.init === "JS" ? 0 : -12
                  }}
                >
                  {a.init}
                </span>
              ))}
            </div>
            <p>
              <span className="hl">+3.500</span> clientes
              <br />atendidos em todo o Brasil.
            </p>
          </div>

          <h1 className="r">
            O plano de saúde certo para você e sua família.
          </h1>
          <p className="lead r">
            Economia real, atendimento humano e as melhores operadoras de saúde do mercado em um só lugar.
          </p>

          <div className="hero-ctas r">
            <a className="btn btn-primary btn-lg btn-slide" href="#simulador">
              Simular grátis
              <span className="btn-slide-ic" aria-hidden="true"><ArrowIcon /></span>
            </a>
            <a className="btn btn-ghost btn-lg" href={waLink("Olá, quero ajuda para escolher meu plano")} target="_blank" rel="noopener">
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-tabs r">
          <div className="tabs-panel">
            <div className="tabs-grid">
              <div className="tab-list" role="tablist" aria-label="Produtos Nexa">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    className="tab-btn"
                    role="tab"
                    aria-selected={tab === t.key}
                    onClick={() => setTab(t.key)}
                  >
                    <span className="tab-ic" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d={TAB_ICONS[t.key]} />
                      </svg>
                    </span>
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="tab-content" role="tabpanel">
                <h3>{mock.title}</h3>
                <p>{mock.desc}</p>
                <div className="tab-mock" aria-hidden="true">
                  {mock.rows.map((row) => (
                    <div className="mock-row" key={row.name}>
                      <div>
                        <div className="mr-name">{row.name}</div>
                        <div className="mr-sub">{row.sub}</div>
                      </div>
                      <div className="mr-price">{row.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
