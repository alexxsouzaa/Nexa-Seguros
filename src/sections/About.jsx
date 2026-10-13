import ImgSlot from "../components/ImgSlot.jsx";

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
          <ImgSlot label="Imagem sobre a Nexa" />
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
