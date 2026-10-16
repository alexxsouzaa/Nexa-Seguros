import ImgSlot from "../components/ImgSlot.jsx";
import { asset, waLink } from "../lib/site.js";

export default function Hero() {
  return (
    <section className="hero" id="inicio" data-od-id="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light r">4500+ Corretores e Consultores</p>
          <h1 className="r">A ferramenta definitiva do corretor de seguros.</h1>
          <p className="lead lead-dark r">
            Da cotação à comissão no caixa, todo o trabalho da corretora em uma só plataforma.
          </p>

          <div className="hero-ctas r">
            <a className="btn btn-primary btn-lg" href="#simulador">
              Criar conta grátis
            </a>
            <a className="btn btn-light btn-lg" href={waLink("Olá, quero ajuda para escolher meu plano")} target="_blank" rel="noopener">
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-media r">
          <ImgSlot label="Imagem principal" decorative={false}>
            <img
              src={asset("/img/hero.jpg")}
              alt="Consultora da Nexa Seguros orientando uma cliente na escolha do plano de saúde"
              width="1400"
              height="1045"
              decoding="async"
              fetchPriority="high"
            />
          </ImgSlot>
        </div>
      </div>
    </section>
  );
}
