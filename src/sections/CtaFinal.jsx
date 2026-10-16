import { WA_CTA_TEXT, waLink } from "../lib/site.js";

export default function CtaFinal() {
  return (
    <section className="section" id="contato">
      <div className="container">
        <div className="cta-final r">
          <div className="cta-inner">
            <h2>Comece pela sua próxima cotação.</h2>
            <p>
              Fale com a Nexa e receba um comparativo com as melhores opções para o seu perfil — ainda hoje.
            </p>
            <div className="cta-actions">
              <a className="btn btn-light btn-lg" href="#simulador">
                Simular grátis
              </a>
              <a className="btn btn-outline-light btn-lg" href={waLink(WA_CTA_TEXT)} target="_blank" rel="noopener">
                Falar no WhatsApp
              </a>
            </div>
            <div className="cta-badges">
              <span>4,9 no Google</span>
              <span aria-hidden="true">·</span>
              <span>Atendimento humano</span>
              <span aria-hidden="true">·</span>
              <span>Sem compromisso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
