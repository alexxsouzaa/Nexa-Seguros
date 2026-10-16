import { waLink } from "../lib/site.js";

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.5 12L4.99997 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

const AVATARS = [
  { init: "JS", bg: "var(--brand)" },
  { init: "RM", bg: "var(--inst)" },
  { init: "CL", bg: "var(--hl)" }
];

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-proof r">
            <div className="avatar-stack" aria-hidden="true">
              {AVATARS.map((a) => (
                <span key={a.init} style={{ background: a.bg }}>{a.init}</span>
              ))}
            </div>
            <p>
              <span className="hl">+3.500</span> clientes
              <br />atendidos em todo o Brasil.
            </p>
          </div>

          <h1 className="r">
            O plano de saúde certo para você<span className="hidden-mobile"> e sua família</span>.
          </h1>

          <p className="lead r">
            Economia real, atendimento humano e as melhores operadoras de saúde do mercado em um só lugar.
          </p>

          <div className="hero-ctas r">
            <a className="btn btn-primary btn-slide" href="#simulador">
              Simular grátis
              <span className="btn-slide-ic" aria-hidden="true"><ArrowIcon /></span>
            </a>
            <a className="btn btn-ghost" href={waLink("Olá, quero ajuda para escolher meu plano")} target="_blank" rel="noopener">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
