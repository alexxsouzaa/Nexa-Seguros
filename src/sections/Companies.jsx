import { CheckIcon } from "../components/icons.jsx";
import { asset } from "../lib/site.js";

const ITEMS = [
  "Diagnóstico do perfil da equipe antes da indicação",
  "Comparativo claro entre condições e coberturas",
  "Acompanhamento contínuo após a contratação"
];

export default function Companies() {
  return (
    <section className="section section-inst" id="empresas" data-od-id="secao-empresas">
      <div className="container inst-grid">
        <div className="inst-copy r">
          <p className="eyebrow eyebrow-light">Para empresas</p>
          <h2>Sua empresa também merece cuidado.</h2>
          <p className="lead-dark">
            Planos de saúde e odontológicos como benefício para a sua equipe.
          </p>

          <ul className="inst-list" role="list" data-od-id="lista-empresarial">
            {ITEMS.map((item) => (
              <li key={item}>
                <CheckIcon size={17} />
                {item}
              </li>
            ))}
          </ul>

          <a className="btn btn-light btn-lg" href="#contato">
            Conhecer soluções empresariais
          </a>
        </div>

        <div className="inst-photo r">
          <img
            src={asset("/img/empresas.webp")}
            alt="Equipe corporativa em reunião de trabalho"
            width="1100"
            height="825"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
