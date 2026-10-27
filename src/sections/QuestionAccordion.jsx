import { useState } from "react";
import {
  CircleHelp,
  ArrowRight,
  BadgeCheck,
  UserRound,
  Hospital,
  FileText,
  CalendarDays,
  Bell,
  MapPin,
  Search,
  Copy
} from "lucide-react";
import { asset, WA_CTA_TEXT, waLink } from "../lib/site.js";

const OP = {
  hapvida: asset("/img/logos/hapvida.png"),
  bradesco: asset("/img/logos/bradesco.png"),
  sulamerica: asset("/img/logos/sulamerica.png"),
  amil: asset("/img/logos/amil.png"),
  unimed: asset("/img/logos/seguros-unimed.png")
};

const QA = [
  {
    id: "1",
    tab: "Idade",
    Icon: UserRound,
    mock: 1,
    q: "Pela minha idade fica muito caro?",
    a: "A idade influencia no valor, mas existem estratégias: escolher a acomodação certa, avaliar coparticipação e comparar operadoras. Mostramos o que cada caminho muda no seu caso."
  },
  {
    id: "2",
    tab: "Rede",
    Icon: Hospital,
    mock: 2,
    q: "Meus médicos atendem nesse plano?",
    a: "Verificamos a rede credenciada antes de indicar. Você confere hospitais, laboratórios e médicos da sua confiança e evita surpresa depois de contratar."
  },
  {
    id: "3",
    tab: "Por escrito",
    Icon: FileText,
    mock: 3,
    q: "Me manda por escrito?",
    a: "Enviamos o comparativo organizado pelo WhatsApp, com preços, coberturas e carências. Tudo registrado, fácil de comparar e sem enrolação."
  },
  {
    id: "4",
    tab: "Vou pensar",
    Icon: CalendarDays,
    mock: 4,
    q: "Vou pensar e te aviso.",
    a: "Sem problema. Guardamos suas preferências e retomamos quando você quiser. Nosso compromisso é te ajudar, não pressionar."
  }
];

function Mock({ type }) {
  if (type === 1) {
    return (
      <div className="qa-vcard">
        <p className="qa-vlabel">Faixa do titular</p>
        <div className="qa-vinput">
          <UserRound size={14} className="qa-vinput-ic" />
          38 anos · Enfermaria
        </div>
        <p className="qa-vlabel qa-mt">Planos mais buscados</p>
        <ul className="qa-vlist">
          <li className="qa-vrow">
            <span className="qa-vav"><img src={OP.hapvida} alt="" width="32" height="32" /></span>
            <span className="qa-vrowtxt">
              <span className="qa-vrowname">Hapvida</span>
              <span className="qa-vrowsub">a partir de R$ 398,60</span>
            </span>
          </li>
          <li className="qa-vrow">
            <span className="qa-vav"><img src={OP.bradesco} alt="" width="32" height="32" /></span>
            <span className="qa-vrowtxt">
              <span className="qa-vrowname">Bradesco Saúde</span>
              <span className="qa-vrowsub">a partir de R$ 512,90</span>
            </span>
          </li>
        </ul>
      </div>
    );
  }

  if (type === 2) {
    return (
      <div className="qa-vcard">
        <p className="qa-vlabel">Buscar na rede</p>
        <div className="qa-vinput">
          <Search size={14} className="qa-vinput-ic" />
          <span>Hospital</span>
          <span className="qa-caret" />
        </div>
        <div className="qa-vresult">
          <div className="qa-vresult-top">
            <div className="qa-vrowtxt">
              <p className="qa-vrowname">Hospital Geral de Camaçari</p>
              <p className="qa-vrowsub"><MapPin size={12} /> Av. Central · 2,3 km</p>
            </div>
            <span className="qa-vbadge qa-vbadge-ok">Na rede</span>
          </div>
          <div className="qa-vchips3">
            <span>Mapa</span>
            <span>Uber</span>
            <span>99</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 3) {
    return (
      <div className="qa-vcard">
        <div className="qa-vhead-row">
          <p className="qa-vlabel">Cotação em texto</p>
          <span className="qa-vchip"><Copy size={12} /> Copiar</span>
        </div>
        <div className="qa-bubble">
          <p className="qa-bubble-t">Cotação plano de saúde</p>
          <p>Família · 4 vidas</p>
          <p className="qa-bubble-mt">
            <strong>Hapvida</strong> · Enfermaria<br />
            R$ 1.214,60/mês
          </p>
          <p className="qa-bubble-mt">
            <strong>SulAmérica</strong> · Apartamento<br />
            R$ 2.231,60/mês
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="qa-vstack">
      <div className="qa-vcard qa-vreminder">
        <span className="qa-vbell"><Bell size={18} strokeWidth={1.8} /></span>
        <span className="qa-vrowtxt qa-flex1">
          <span className="qa-vrowname">Marina Costa</span>
          <span className="qa-vrowsub">Retornar · Quinta, 10:00</span>
        </span>
        <span className="qa-vbadge qa-vbadge-warn">Lembrete</span>
      </div>
      <div className="qa-vcard">
        <div className="qa-vhead-row">
          <p className="qa-vlabel">CRM · Cotação enviada</p>
          <span className="qa-vbadge qa-vbadge-soft">Em negociação</span>
        </div>
        <div className="qa-vperson">
          <span className="qa-vav qa-vav-lg">MC</span>
          <span className="qa-vrowtxt">
            <span className="qa-vrowname">Marina Costa</span>
            <span className="qa-vrowsub">“Vou pensar e te aviso.”</span>
          </span>
        </div>
        <div className="qa-vremind-line">
          <CalendarDays size={16} strokeWidth={1.8} className="qa-vremind-ic" />
          <span className="qa-flex1">Retornar na quinta</span>
          <span className="qa-vrowsub">10h</span>
        </div>
      </div>
    </div>
  );
}

export default function QuestionAccordion() {
  const [open, setOpen] = useState("1");

  return (
    <section className="section" id="na-conversa">
      <div className="container">
        <div className="section-head center r">
          <div className="qa-icons" aria-hidden="true">
            <span className="qa-ic-lg"><CircleHelp size={24} strokeWidth={1.5} /></span>
            <span className="qa-ic-mid"><ArrowRight size={18} strokeWidth={2} /></span>
            <span className="qa-ic-lg"><BadgeCheck size={24} strokeWidth={1.5} /></span>
          </div>
          <h2>O cliente pergunta, você tem a resposta.</h2>
          <p className="section-sub">
            Quem escolhe plano de saúde ouve as mesmas dúvidas. Veja como a Nexa resolve cada uma, sem deixar você no escuro.
          </p>
        </div>

        <ol className="qa-list">
          {QA.map((item) => {
            const active = open === item.id;
            const Icon = item.Icon;
            return (
              <li key={item.id} className={"qa-item" + (active ? " is-open" : "")}>
                <button
                  type="button"
                  className="qa-btn"
                  aria-expanded={active}
                  onClick={() => setOpen(active ? null : item.id)}
                >
                  <span className="sr-only">{item.q}</span>
                </button>

                <div className="qa-label" aria-hidden="true">
                  <span className="qa-label-top">
                    <span className="qa-ic-sm"><Icon size={18} strokeWidth={1.5} /></span>
                    <span className="qa-num">{item.id.padStart(2, "0")}</span>
                  </span>
                  <span className="qa-tab">{item.tab}</span>
                </div>

                <div className="qa-panel">
                  <div className="qa-copy">
                    <span className="qa-ic-md"><Icon size={18} strokeWidth={1.5} /></span>
                    <p className="qa-kicker">O cliente pergunta</p>
                    <h3 className="qa-q">“{item.q}”</h3>
                    <p className="qa-a">{item.a}</p>
                  </div>
                  <div className="qa-visual" aria-hidden="true">
                    <Mock type={item.mock} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="qa-cta r">
          <a className="btn btn-primary btn-slide" href={waLink(WA_CTA_TEXT)} target="_blank" rel="noopener">
            Falar no WhatsApp
            <span className="btn-slide-ic" aria-hidden="true"><ArrowRight size={18} strokeWidth={2} /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
