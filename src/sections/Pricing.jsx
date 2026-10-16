export default function Pricing() {
  const plans = [
    {
      name: "Saúde Individual",
      price: "R$ 39,90",
      period: "/mês",
      users: "1 usuário",
      featured: false,
      features: [
        "Cotação de planos de saúde",
        "Comparativo lado a lado",
        "Envio por WhatsApp",
        "Suporte por e-mail",
      ],
    },
    {
      name: "Saúde + Odontológico",
      price: "R$ 59,90",
      period: "/mês",
      users: "1 usuário",
      featured: true,
      features: [
        "Cotação saúde e odontológico",
        "Comparativo lado a lado",
        "Envio por WhatsApp",
        "CRM de leads incluído",
        "Suporte prioritário",
      ],
    },
    {
      name: "Corretora (PME)",
      price: "R$ 249,90",
      period: "/mês",
      users: "Equipe completa",
      featured: false,
      features: [
        "Cotação ilimitada",
        "CRM avançado",
        "KoterZap (WhatsApp Business)",
        "Gestão de comissões",
        "Conciliação Open Finance",
        "Suporte prioritário",
      ],
    },
  ];

  return (
    <section className="section" id="precos" data-od-id="pricing">
      <div className="container">
        <div className="section-head r">
          <h2>Escolha o plano que cabe na sua corretora</h2>
          <p className="section-sub">
            Comece sozinho e convide a equipe quando quiser. Você pode adicionar usuários a qualquer momento.
          </p>
        </div>

        <div className="plan-grid r">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`plan-card ${plan.featured ? "plan-card-dest" : ""}`}
            >
              <header>
                <h3>{plan.name}</h3>
                {plan.featured && (
                  <span className="tag tag-pos">Mais popular</span>
                )}
              </header>
              <div className="plan-price">
                <span className="plan-price-main">{plan.price}</span>
                <span className="plan-price-period">{plan.period}</span>
              </div>
              <p className="plan-count">{plan.users}</p>
              <ul className="plan-list">
                {plan.features.map((f) => (
                  <li key={f} className="plan-op">
                    <div className="plan-op-head">
                      <span className="plan-op-name">{f}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"} btn-block`}
                href="#simulador"
              >
                {plan.featured ? "Escolher este plano" : "Escolher plano"}
              </a>
            </article>
          ))}
        </div>

        <p className="plan-note">
          Preços para corretores de seguros de saúde e odontológico. Adicione usuários conforme sua equipe cresce.
        </p>
      </div>
    </section>
  );
}
