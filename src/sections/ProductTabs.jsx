import { useState } from "react";
import { Heart, Smile, Building2, ShieldCheck, Check, Download } from "lucide-react";

const PRODUCTS = [
  {
    key: "saude",
    label: "Saúde",
    Icon: Heart,
    desc: "Compare os planos das principais operadoras lado a lado e confirme o preço direto com a operadora antes de enviar ao cliente.",
    mock: { label: "Plano ideal", price: "R$ 389/mês", old: "R$ 459/mês", pill: "Enviar proposta" }
  },
  {
    key: "odonto",
    label: "Odontológico",
    Icon: Smile,
    desc: "Planos odontológicos individuais, familiares e empresariais, com cobertura completa e preço fechado na hora.",
    mock: { label: "Cobertura total", price: "R$ 29,90/mês", old: "R$ 39,90/mês", pill: "Montar proposta" }
  },
  {
    key: "empresa",
    label: "Empresarial",
    Icon: Building2,
    desc: "Do diagnóstico à adesão: montamos o benefício de saúde certo para o tamanho e o momento da sua empresa.",
    mock: { label: "Benefício ativo", price: "30 vidas", old: "", pill: "Ver condições" }
  },
  {
    key: "operadoras",
    label: "Operadoras",
    Icon: ShieldCheck,
    desc: "As operadoras mais reconhecidas do mercado em um só lugar, para comparar cobertura, rede e preço sem viés.",
    mock: { label: "Comparativo", price: "200+ opções", old: "", pill: "Ver operadoras" }
  }
];

function MockCard({ data }) {
  return (
    <div className="mock-card">
      <div className="mock-check" aria-hidden="true">
        <span>
          <Check width={26} height={26} strokeWidth={2.5} />
        </span>
      </div>
      <p className="mock-label">{data.label}</p>
      <p className="mock-price">{data.price}</p>
      {data.old ? <p className="mock-old">{data.old}</p> : null}
      <div className="mock-pill" aria-hidden="true">
        <Download width={16} height={16} strokeWidth={1.5} />
        {data.pill}
      </div>
    </div>
  );
}

export default function ProductTabs() {
  const [active, setActive] = useState(0);
  const current = PRODUCTS[active];

  return (
    <section className="section" id="produtos">
      <div className="container r">
        <div className="pt-cards">
          {PRODUCTS.map((p) => (
            <article className="pt-card" key={p.key}>
              <div className="pt-card-head">
                <span className="pt-ic" aria-hidden="true"><p.Icon width={20} height={20} strokeWidth={1.8} /></span>
                <h3>{p.label}</h3>
                <p>{p.desc}</p>
              </div>
              <div className="pt-card-mock" aria-hidden="true">
                <MockCard data={p.mock} />
              </div>
            </article>
          ))}
        </div>

        <div className="pt-desk">
          <div className="pt-grid">
            <ol className="pt-acc">
              {PRODUCTS.map((p, i) => {
                const open = i === active;
                return (
                  <li key={p.key} className={open ? "open" : ""}>
                    <button
                      type="button"
                      className="pt-acc-btn"
                      aria-expanded={open}
                      aria-controls={`ptb-${p.key}`}
                      onClick={() => setActive(i)}
                    >
                      <span className="pt-ic" aria-hidden="true"><p.Icon width={20} height={20} strokeWidth={1.8} /></span>
                      <span className="pt-acc-title">{p.label}</span>
                    </button>
                    <div className="pt-acc-body" id={`ptb-${p.key}`}>
                      <div><p>{p.desc}</p></div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="pt-mockpanel" aria-hidden="true">
              <MockCard key={current.key} data={current.mock} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
