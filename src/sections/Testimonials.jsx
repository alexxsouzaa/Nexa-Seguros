const REVIEWS = [
  { text: "Melhor assessoria que já contratei! Acharam um plano que caberia no meu bolso.", name: "Jade Lima" },
  { text: "Atendimento rápido e sem enrolação. Recomendo demais!", name: "Gabi Marques" },
  { text: "Simples e prático, me ajudaram a entender cada detalhe do plano.", name: "Beatriz David" },
  { text: "Processo bem simples e dinâmico, facilitou muito a minha decisão.", name: "Ian Almeida" },
  { text: "Solução empresarial muito boa! Cuidaram de toda a equipe.", name: "Igor Peneluc" },
  { text: "Excelente consultoria para quem quer contratar um bom plano de saúde.", name: "Vandeilson Figueiredo" },
  { text: "Melhor atendimento do mercado! Explicaram tudo com paciência.", name: "Isabella Guimarães" },
  { text: "Não consigo imaginar contratar plano sem a Nexa, tornou tudo mais fácil.", name: "Wesley Gama" },
  { text: "Equipe incrível, recomendo para todos que precisam de plano de saúde.", name: "Raissa Chaves" }
];

function Stars() {
  return (
    <div className="stars" aria-label="5 estrelas de 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.73 3.44l1.76 3.55c.24.5.88.97 1.42 1.06l3.19.53c2.04.34 2.52 1.83 1.05 3.3l-2.48 2.5c-.42.43-.65 1.24-.52 1.83l.71 3.1c.56 2.45-.73 3.4-2.88 2.12l-3-1.79c-.54-.32-1.43-.32-1.98 0l-3 1.79c-2.14 1.28-3.44.33-2.88-2.12l.71-3.1c.13-.6-.1-1.4-.52-1.83l-2.48-2.5c-1.46-1.47-.99-2.96 1.05-3.3l3.19-.53c.54-.09 1.18-.56 1.42-1.06l1.76-3.55c.96-1.93 2.52-1.93 3.48 0Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section" id="depoimentos">
      <div className="container">
        <div className="section-head center r" style={{ maxWidth: 640 }}>
          <h2>4,9 no Google.</h2>
          <p className="section-sub">
            O que dizem os clientes que confiaram na Nexa para escolher o plano certo.
          </p>
        </div>

        <dl className="stat-grid r">
          <div className="stat">
            <dt>Clientes atendidos</dt>
            <dd>3.500+</dd>
          </div>
          <div className="stat">
            <dt>Cotações por mês</dt>
            <dd>1.200+</dd>
          </div>
          <div className="stat">
            <dt>Avaliação no Google</dt>
            <dd>4,9</dd>
          </div>
        </dl>

        <div className="marquee-wrap r">
          <div className="marquee">
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <article className="review-card" key={i} aria-hidden={i >= REVIEWS.length}>
                <Stars />
                <p>“{r.text}”</p>
                <div>
                  <div className="r-author">{r.name}</div>
                  <div className="r-src">Avaliação no Google</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
