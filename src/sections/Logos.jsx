import { asset } from "../lib/site.js";
import { HeartPulse, Stethoscope, Plus, Check, Clock, LoaderCircle, ShieldCheck } from "lucide-react";

const LOGOS = [
  "/img/logos/amil.png",
  "/img/logos/bradesco.png",
  "/img/logos/sulamerica.png",
  "/img/logos/hapvida.png",
  "/img/logos/seguros-unimed.png",
  "/img/logos/amil-dental.png",
  "/img/logos/bradesco-dental.png",
  "/img/logos/sulamerica-odonto.png",
  "/img/logos/hapvida-odonto.png"
];

const ROWS = [
  { dur: "60s", dir: "normal" },
  { dur: "75s", dir: "reverse" },
  { dur: "90s", dir: "normal", hideSm: true }
];

const OVERLAY_ROWS = [
  { age: "62 anos", badge: "59+", price: "R$ 2.062,37" },
  { age: "38 anos", price: "R$ 811,30" },
  { age: "7 anos", badge: "0 a 18", price: "R$ 437,85" }
];

const CARDS = [
  {
    mock: 1,
    hd: "Preço da operadora, não da tabela.",
    p: "Eu consulto o valor atualizado direto na operadora parceira, sem surpresa na hora de contratar."
  },
  {
    mock: 2,
    hd: "Todas as faixas de idade.",
    p: "Criança, adulto e 59+ com o preço real de cada faixa, do jeito que a operadora calcula."
  },
  {
    mock: 3,
    hd: "Tabela sempre atualizada.",
    p: "Quando a operadora reajusta, a sua próxima cotação já sai com o valor novo."
  },
  {
    mock: 4,
    hd: "Proposta salva para você.",
    p: "Guardo a cotação e retomo quando você decidir, sem precisar recomeçar."
  }
];

function LogoPill({ src }) {
  return (
    <div className="oper-pill">
      <picture>
        <source src={asset(src.replace(".png", ".webp"))} type="image/webp" width="160" height="48" />
        <img src={asset(src)} alt="" loading="lazy" decoding="async" width="160" height="48" aria-hidden="true" />
      </picture>
    </div>
  );
}

function OverlayCard() {
  return (
    <div className="oper-ov" aria-hidden="true">
      <div className="oper-ov-head">
        <span className="oper-ov-logo">
            <picture>
              <source src={asset("/img/logos/bradesco.webp")} type="image/webp" width="160" height="48" />
              <img src={asset("/img/logos/bradesco.png")} alt="" loading="lazy" decoding="async" width="160" height="48" />
            </picture>
        </span>
        <span className="oper-ov-ctx">PME · 3 vidas</span>
      </div>

      <ul className="oper-ov-rows">
        {OVERLAY_ROWS.map((r) => (
          <li key={r.age}>
            <span className="oper-ov-age">{r.age}</span>
            {r.badge && <span className="oper-ov-tag">{r.badge}</span>}
            <span className="oper-ov-price">{r.price}</span>
          </li>
        ))}
      </ul>

      <div className="oper-ov-total">
        <div>
          <p className="oper-ov-label">Total mensal</p>
          <p className="oper-ov-sum">R$ 3.311,52</p>
        </div>
        <span className="oper-ov-old">R$ 3.368,40</span>
      </div>

      <div className="oper-status">
        <span className="st st-1"><Clock size={15} strokeWidth={1.8} /> Tabela do dia</span>
        <span className="st st-2"><LoaderCircle size={15} strokeWidth={1.8} /> Consultando operadora…</span>
        <span className="st st-3"><Check size={15} strokeWidth={2} /> Confirmado na operadora</span>
      </div>
    </div>
  );
}

function CardMock({ type }) {
  if (type === 1) {
    return (
      <div className="oper-mock mock-1">
        <div className="mock-conn">
          <span className="mc-badge"><ShieldCheck size={16} strokeWidth={1.8} /></span>
          <span className="mc-link">
            <em>API</em>
            <i><b /><b /><b /></i>
          </span>
          <span className="mc-op">
            <picture>
              <source src={asset("/img/logos/bradesco.webp")} type="image/webp" width="160" height="48" />
              <img src={asset("/img/logos/bradesco.png")} alt="" loading="lazy" decoding="async" width="160" height="48" />
            </picture>
          </span>
        </div>
        <span className="mc-price">
          <i><Check size={11} strokeWidth={3} /></i>
          <span>R$ 2.062,37</span>
        </span>
      </div>
    );
  }

  if (type === 2) {
    return (
      <div className="oper-mock mock-2">
        <div className="mock-ages">
          <span className="mc-age on">0 a 18</span>
          <span className="mc-age">19 a 23</span>
          <span className="mc-age">24 a 28</span>
          <span className="mc-age">…</span>
          <span className="mc-age">54 a 58</span>
          <span className="mc-age on">59+</span>
        </div>
      </div>
    );
  }

  if (type === 3) {
    return (
      <div className="oper-mock mock-3">
        <span className="mc-date">
          <span className="d-today">Hoje</span>
          <span className="d-day">11 out</span>
        </span>
        <span className="mc-change">
          <span className="old">R$ 762,40</span>
          <span className="arrow">→</span>
          <span className="new">R$ 781,10</span>
        </span>
      </div>
    );
  }

  return (
    <div className="oper-mock mock-4">
      <div className="mc-proposal">
        <div className="p-head">
          <span>Proposta</span>
          <span className="p-saved"><Check size={9} strokeWidth={3} />Salvo</span>
        </div>
        <div className="p-lines"><span /><span /></div>
        <p className="p-sum">R$ 3.311,52</p>
      </div>
    </div>
  );
}

export default function Logos() {
  return (
    <section className="section oper" id="operadoras">
      <div className="container">
        <div className="oper-head r">
          <div className="oper-icons" aria-hidden="true">
            <span className="oper-ic"><HeartPulse size={24} strokeWidth={1.5} /></span>
            <span className="oper-plus"><Plus size={18} strokeWidth={2} /></span>
            <span className="oper-ic"><Stethoscope size={24} strokeWidth={1.5} /></span>
          </div>
          <h2>Trabalhamos com as principais operadoras de saúde e odontologia do Brasil.</h2>
          <p className="oper-lead">
            As principais operadoras do país com tabelas atualizadas. Eu comparo os planos e encontro a melhor
            opção para saúde e odontológico, pessoa física, PME e adesão.
          </p>
        </div>

        <div className="oper-panel r">
          <div className="oper-rows" aria-hidden="true">
            {ROWS.map((row, ri) => (
              <div key={ri} className={"oper-row" + (row.hideSm ? " hide-sm" : "")}>
                <div
                  className="oper-marquee"
                  style={{ "--marquee-duration": row.dur, animationDirection: row.dir }}
                >
                  {[...LOGOS, ...LOGOS].map((src, i) => (
                    <LogoPill key={i} src={src} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="oper-overlay">
            <OverlayCard />
          </div>
        </div>

        <p className="oper-caption r">Saúde e odontológico, pessoa física, PME e adesão.</p>

        <ul className="oper-cards">
          {CARDS.map((c) => (
            <li key={c.mock} className="oper-card r">
              <CardMock type={c.mock} />
              <div className="oper-card-body">
                <h3>{c.hd}</h3>
                <p>{c.p}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
