import ImgSlot from "../components/ImgSlot.jsx";
import { asset } from "../lib/site.js";

export default function Hero() {
  return (
    <section className="hero" id="inicio" data-od-id="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light r">Assessoria em planos de saúde e odontológicos</p>
          <h1 className="r">Seu cuidado começa com a escolha certa.</h1>
          <p className="lead lead-dark r">
            Compare planos de saúde e odontológicos para você, sua família ou sua empresa.
          </p>

          <div className="hero-ctas r">
            <a className="btn btn-light btn-lg" href="#simulador">
              Encontrar meu plano
            </a>
            <a className="btn btn-outline-light btn-lg" href="#contato">
              Falar com um especialista
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