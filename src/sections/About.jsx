import ImgSlot from "../components/ImgSlot.jsx";
import { asset } from "../lib/site.js";

const POINTS = [
  {
    title: "Atendimento próximo",
    text: "Uma equipe pequena, que responde rápido e pelo nome."
  },
  {
    title: "Clareza",
    text: "Você entende o que está contratando antes de assinar."
  },
  {
    title: "Acompanhamento",
    text: "Seguimos com você em renovações, dúvidas e sinistros."
  }
];

export default function About() {
  return (
    <section className="section" id="sobre" data-od-id="secao-sobre">
      <div className="container split">
        <div className="split-media r">
          <ImgSlot label="Imagem sobre a Nexa" decorative={false}>
            <img
              src={asset("/img/sobre.jpg")}
              alt="Consultora da Nexa Seguros atendendo um cliente em uma conversa sobre planos de saúde"
              width="1400"
              height="1045"
              loading="lazy"
              decoding="async"
            />
          </ImgSlot>
        </div>

        <div className="split-copy r">
          <p className="eyebrow">Sobre a Nexa</p>
          <h2>Mais do que encontrar um plano. Ajudamos você a escolher.</h2>
          <p>
            Primeiro entendemos como você vive e o que não pode faltar. Só então mostramos caminhos,
            com uma pessoa do início ao fim — inclusive depois da contratação.
          </p>

          <ul className="sobre-points" role="list" data-od-id="pilares-sobre">
            {POINTS.map((point) => (
              <li key={point.title}>
                <strong>{point.title}</strong>
                <span>{point.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
