import { WA_CTA_TEXT, waLink } from "../lib/site.js";

export default function CtaFinal() {
  return (
    <section className="section cta-final" id="contato" data-od-id="secao-cta-final">
      <div className="container cta-inner r">
        <div>
          <h2>Vamos encontrar o plano certo para você?</h2>
          <p>Converse com a Nexa e receba orientação para escolher uma opção adequada ao seu perfil.</p>
        </div>
        <div className="cta-actions">
          <a className="btn btn-light btn-lg" href={waLink(WA_CTA_TEXT)} target="_blank" rel="noopener">
            Falar com a Nexa
          </a>
          <a className="btn btn-outline-light btn-lg" href="#simulador">
            Solicitar cotação
          </a>
        </div>
      </div>
    </section>
  );
}
