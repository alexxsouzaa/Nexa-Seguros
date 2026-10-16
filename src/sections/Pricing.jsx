import {
  UserRoundPlus,
  ArrowRight,
  CalendarDays,
  Smile,
  Building2,
  UserRound,
  Plus
} from "lucide-react";
import { WA_CTA_TEXT, waLink } from "../lib/site.js";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.5 12L4.99997 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

const ADDONS = [
  { name: "Odontológico", desc: "Consultas, exames e procedimentos", price: "a partir de R$ 19,90", Icon: Smile },
  { name: "Empresarial", desc: "Condições para a sua equipe", price: "sob consulta", Icon: Building2 },
  { name: "Pessoa física", desc: "Planos individuais e familiares", price: "sob consulta", Icon: UserRound }
];

export default function Pricing() {
  return (
    <section className="section" id="precos">
      <div className="container">
        <div className="section-head center r">
          <div className="cot-icons" aria-hidden="true">
            <span className="qa-ic-lg"><UserRoundPlus size={24} strokeWidth={1.5} /></span>
            <span className="qa-ic-mid"><ArrowRight size={18} strokeWidth={2} /></span>
            <span className="qa-ic-lg"><CalendarDays size={24} strokeWidth={1.5} /></span>
          </div>
          <h2>Sua primeira cotação hoje.</h2>
        </div>

        <div className="cot-grid r">
          <article className="cot-main">
            <div>
              <span className="cot-main-ic"><CalendarDays size={20} strokeWidth={1.5} /></span>
              <h3 className="cot-main-h">Consultoria de planos</h3>
              <p className="cot-main-sub">Inclui cotação e comparativo.</p>
            </div>
            <p className="cot-price">R$ 0<span>/cotação</span></p>
          </article>

          <div className="cot-add">
            <p className="cot-add-lead">Adicione quando precisar</p>
            <ul className="cot-list">
              {ADDONS.map((a) => (
                <li className="cot-row" key={a.name}>
                  <span className="cot-row-ic"><a.Icon size={18} strokeWidth={1.5} /></span>
                  <span className="cot-name">
                    {a.name}
                    <span className="cot-name-sub">{a.desc}</span>
                  </span>
                  <span className="cot-val">
                    <Plus size={14} strokeWidth={1.5} />
                    {a.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cot-cta r">
          <a className="btn btn-primary btn-slide" href="#simulador">
            Quero minha cotação
            <span className="btn-slide-ic" aria-hidden="true"><ArrowIcon /></span>
          </a>
          <a className="btn btn-ghost" href={waLink(WA_CTA_TEXT)} target="_blank" rel="noopener">
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
