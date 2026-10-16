import { ShieldIcon, HelpIcon } from "../components/icons.jsx";

const FEATURES = [
  {
    title: "Cotador de planos",
    description:
      "Compare planos de saúde e odontológico de várias seguradoras lado a lado e confirme o preço direto com a operadora antes de enviar ao cliente.",
    icon: <ShieldIcon size={24} />,
  },
  {
    title: "Gestão de clientes",
    description:
      "Seus leads chegam unificados: criados via webhook, Meta Lead Ads ou WhatsApp. Cada contato fica registrado com status e próximo passo.",
    icon: <HelpIcon size={24} />,
  },
  {
    title: "WhatsApp integrado",
    description:
      "Converse com clientes pelo WhatsApp Business diretamente da plataforma. Cotações geradas em texto, prontas para colar no chat.",
    icon: null,
  },
  {
    title: "Comissões sob controle",
    description:
      "Contratos, recebimentos, pendências e estornos em um só lugar, com a comissão calculada na apólice. Provisão e conciliação automática.",
    icon: <ShieldIcon size={24} />,
  },
];

export default function Features() {
  return (
    <section className="section section-alt" id="produtos" data-od-id="features">
      <div className="container">
        <div className="section-head r">
          <h2>Tudo o que a corretora precisa, em um só lugar</h2>
          <p className="section-sub">
            Cotação, CRM, WhatsApp e gestão de comissões integrados para corretores de seguros de saúde e odontológico.
          </p>
        </div>

        <div className="feature-grid r">
          {FEATURES.map((f) => (
            <article key={f.title} className="feature-card r">
              <div className="feature-ic">
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
