const FEATURES = [
  "Cotação em várias operadoras",
  "Comparativo de cobertura e rede",
  "Atendimento humano pelo WhatsApp",
  "Suporte após a contratação"
];

const ADDONS = [
  { name: "Odontológico", desc: "Consultas, exames e procedimentos", price: "a partir de R$ 19,90" },
  { name: "Empresarial", desc: "Condições para a sua equipe", price: "sob consulta" },
  { name: "Pessoa física", desc: "Planos individuais e familiares", price: "sob consulta" }
];

export default function Pricing() {
  return (
    <section className="section section-alt" id="precos">
      <div className="container">
        <div className="section-head center r">
          <h2>Sua primeira cotação hoje.</h2>
          <p className="section-sub">
            Gratuita e sem compromisso. Você recebe as opções e decide com calma.
          </p>
        </div>

        <div className="grid-2" style={{ maxWidth: 900, marginInline: "auto", alignItems: "start" }}>
          <article className="price-card featured r">
            <span className="tag">Mais procurado</span>
            <h3>Consultoria de planos</h3>
            <p className="p-desc">Para você, sua família ou sua empresa.</p>
            <div className="price-amount">
              <span className="cur">R$</span>
              <span className="val">0</span>
              <span className="per">/cotação</span>
            </div>
            <ul className="price-features">
              {FEATURES.map((f) => (
                <li key={f}>
                  <svg className="pf-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a className="btn btn-primary btn-lg btn-block" href="#simulador" style={{ marginTop: "auto" }}>
              Quero minha cotação
            </a>
          </article>

          <div className="r">
            <p className="eyebrow" style={{ marginBottom: 12 }}>Adicione quando precisar</p>
            <div className="addons">
              {ADDONS.map((a) => (
                <div className="addon" key={a.name}>
                  <div>
                    <div className="a-name">{a.name}</div>
                    <div className="a-desc">{a.desc}</div>
                  </div>
                  <div className="a-price">{a.price}</div>
                </div>
              ))}
            </div>
            <a className="btn btn-ghost btn-block" href="#contato" style={{ marginTop: 16 }}>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
