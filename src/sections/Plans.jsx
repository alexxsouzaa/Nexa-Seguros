import { asset } from "../lib/site.js";

const PLANS = [
  {
    od: "plano-saude",
    title: "Plano de Saúde",
    tag: "Saúde",
    tagClass: "tag",
    dest: false,
    btnClass: "btn btn-ghost btn-block",
    groups: [
      { op: "Hapvida", logo: "/img/logos/hapvida.png", tipos: ["Individual/Familiar", "Coletivo por adesão", "Empresarial"] },
      { op: "Seguros Unimed", logo: "/img/logos/seguros-unimed.png", tipos: ["Adesão", "Empresarial"] },
      { op: "SulAmérica", logo: "/img/logos/sulamerica.png", tipos: ["Adesão", "Empresarial", "PME"] },
      { op: "Bradesco Saúde", logo: "/img/logos/bradesco.png", tipos: ["Empresarial"] },
      { op: "Amil", logo: "/img/logos/amil.png", tipos: ["Empresarial"] }
    ]
  },
  {
    od: "plano-odontologico",
    title: "Plano Odontológico",
    tag: "Odontológico",
    tagClass: "tag tag-alt",
    dest: false,
    btnClass: "btn btn-ghost btn-block",
    groups: [
      { op: "Hapvida +Odonto", logo: "/img/logos/hapvida-odonto.png", tipos: ["Individual/Familiar", "Empresarial"] },
      { op: "Bradesco Dental", logo: "/img/logos/bradesco-dental.png", tipos: ["Individual", "Individual/Familiar"] },
      { op: "SulAmérica Odonto", logo: "/img/logos/sulamerica-odonto.png", tipos: ["Sob consulta"] },
      { op: "Amil Dental", logo: "/img/logos/amil-dental.png", tipos: ["Sob consulta"] }
    ]
  },
  {
    od: "plano-combinado",
    title: "Saúde + Odontológico",
    tag: "Combinado",
    tagClass: "tag tag-pos",
    dest: true,
    btnClass: "btn btn-primary btn-block",
    groups: [
      { op: "Hapvida", logo: "/img/logos/hapvida.png", tipos: ["Individual/Familiar", "Coletivo por adesão", "Empresarial"] },
      { op: "Seguros Unimed", logo: "/img/logos/seguros-unimed.png", tipos: ["Adesão", "Empresarial"] },
      { op: "SulAmérica", logo: "/img/logos/sulamerica.png", tipos: ["Adesão", "Empresarial", "PME"] },
      { op: "Bradesco", logo: "/img/logos/bradesco.png", tipos: ["Empresarial"] },
      { op: "Amil", logo: "/img/logos/amil.png", tipos: ["Empresarial"] }
    ]
  }
];

function PlanCard({ plan }) {
  return (
    <article
      className={plan.dest ? "plan-card r plan-card-dest" : "plan-card r"}
      data-od-id={plan.od}
    >
      <header>
        <h3>{plan.title}</h3>
        <span className={plan.tagClass}>{plan.tag}</span>
      </header>

      <p className="plan-count">
        {plan.groups.length} {plan.groups.length === 1 ? "operadora" : "operadoras"} · tipos de
        adesão disponíveis
      </p>

      <ul className="plan-list">
        {plan.groups.map((group) => (
          <li className="plan-op" key={group.op}>
            <div className="plan-op-head">
              <img
                className="plan-logo"
                src={asset(group.logo)}
                alt=""
                width="34"
                height="34"
                loading="lazy"
                decoding="async"
              />
              <span className="plan-op-name">{group.op}</span>
            </div>
            <ul className="plan-types">
              {group.tipos.map((tipo) => (
                <li className={tipo === "Sob consulta" ? "plan-type muted" : "plan-type"} key={tipo}>
                  {tipo}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <a className={plan.btnClass} href="#simulador">
        Solicitar cotação
      </a>
    </article>
  );
}

export default function Plans() {
  return (
    <section className="section" id="planos" data-od-id="secao-planos">
      <div className="container">
        <div className="section-head r">
          <h2>Operadoras de saúde e odontológico que atendemos</h2>
          <p className="section-sub">
            Hapvida, Seguros Unimed, SulAmérica, Bradesco Saúde e Amil — veja os tipos de adesão de
            cada uma.
          </p>
        </div>

        <div className="plan-grid">
          {PLANS.map((plan) => (
            <PlanCard plan={plan} key={plan.od} />
          ))}
        </div>

        <p className="plan-note r">
          Condições e valores seguem a tabela comercial vigente de cada operadora e são confirmados
          na cotação.
        </p>
      </div>
    </section>
  );
}
