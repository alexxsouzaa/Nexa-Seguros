import { waLink } from "../lib/site.js";
import { trackCtaClick, trackWhatsAppOpen } from "../lib/analytics.js";

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
            O plano de saúde certo para você, sua família ou empresa.
          </h1>

          <p className="lead r">
            Compare opções de planos de saúde e odontológicos com orientação personalizada, de acordo com suas necessidades e seu orçamento.
          </p>

          <div className="hero-ctas r">
            <a
              className="btn btn-primary btn-slide"
              href="#cotacao"
              onClick={() => trackCtaClick("cta_hero_principal", "#cotacao")}
            >
              Solicitar cotação gratuita
              <span className="btn-slide-ic" aria-hidden="true"><ArrowIcon /></span>
            </a>
            <a
              className="btn btn-ghost"
              href={waLink(encodeURIComponent("Olá, quero ajuda para escolher meu plano"))}
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsAppOpen("hero")}
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
