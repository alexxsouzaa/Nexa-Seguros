const TESTIMONIALS = [
  {
    name: "Jade Lima",
    text: "Melhor app de cotação do Brasil!",
    source: "Avaliação no Google",
    rating: 5,
  },
  {
    name: "Gabi Marques",
    text: "Melhor plataforma de cotação! Recomendo demais!",
    source: "Avaliação no Google",
    rating: 5,
  },
  {
    name: "Beatriz David",
    text: "Top demais!",
    source: "Avaliação no Google",
    rating: 5,
  },
  {
    name: "Ian Almeida",
    text: "Sistema bem prático e dinâmico, facilitou muito a minha rotina.",
    source: "Avaliação no Google",
    rating: 5,
  },
  {
    name: "Igor Peneluc",
    text: "App de solução empresarial muito boa!",
    source: "Avaliação no Google",
    rating: 5,
  },
  {
    name: "Vandeilson Figueiredo",
    text: "Excelente aplicativo para quem quer realizar cotação de seguros.",
    source: "Avaliação no Google",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section section-alt" id="depoimentos" data-od-id="testimonials">
      <div className="container">
        <div className="section-head r">
          <h2>O que dizem os corretores que usam a Nexa</h2>
          <p className="section-sub">
            Corretores ativos: 4.500+ · Avaliação no Google: 4,9
          </p>
        </div>

        <div className="testimonial-grid r">
          {TESTIMONIALS.map((t) => (
            <article key={t.name} className="testimonial-card r">
              <div className="testimonial-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>
              <p className="testimonial-text">
                “{t.text}”
              </p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-source">{t.source}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonial-cta r">
          <a className="btn btn-primary btn-block" href="#simulador">
            Ver todas as avaliações no Google
          </a>
        </div>
      </div>
    </section>
  );
}
