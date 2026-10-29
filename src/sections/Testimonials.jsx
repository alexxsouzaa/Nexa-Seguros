import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { getRotatingReviews } from "../lib/reviews.js";

const STAR_PATH =
  "M13.73 3.44l1.76 3.55c.24.5.88.97 1.42 1.06l3.19.53c2.04.34 2.52 1.83 1.05 3.3l-2.48 2.5c-.42.43-.65 1.24-.52 1.83l.71 3.1c.56 2.45-.73 3.4-2.88 2.12l-3-1.79c-.54-.32-1.43-.32-1.98 0l-3 1.79c-2.14 1.28-3.44.33-2.88-2.12l.71-3.1c.13-.6-.1-1.4-.52-1.83l-2.48-2.5c-1.46-1.47-.99-2.96 1.05-3.3l3.19-.53c.54-.09 1.18-.56 1.42-1.06l1.76-3.55c.96-1.93 2.52-1.93 3.48 0Z";

function Stars({ rating = 5 }) {
  const label = rating + " estrelas de 5";

  return (
    <div className="stars" aria-label={label} title={label}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? (
          <svg key={i} viewBox="0 0 24 24" aria-hidden="true">
            <path d={STAR_PATH} />
          </svg>
        ) : (
          <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="star-empty">
            <path d={STAR_PATH} />
          </svg>
        )
      )}
    </div>
  );
}

export default function Testimonials() {
  const [reviews] = useState(() => getRotatingReviews(12));
  const [paused, setPaused] = useState(false);

  return (
    <section className="section" id="depoimentos">
      <div className="container">
        <div className="section-head center r" style={{ maxWidth: 640 }}>
          <h2>4,9 de satisfação.</h2>
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
            <dt>Avaliação pelo WhatsApp</dt>
            <dd>4,9</dd>
          </div>
        </dl>

        <div className={"marquee-wrap r" + (paused ? " is-paused" : "")}>
          <div className="marquee">
            {[...reviews, ...reviews].map((r, i) => (
              <article className="review-card" key={i} aria-hidden={i >= reviews.length}>
                <Stars rating={r.rating} />
                <p>“{r.text}”</p>
                <div>
                  <div className="r-author">{r.name}</div>
                  <div className="r-src">Avaliação pelo WhatsApp</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="anim-bar">
          <button
            type="button"
            className="anim-btn"
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
          >
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            {paused ? "Retomar movimento" : "Pausar movimento"}
          </button>
        </div>
      </div>
    </section>
  );
}
