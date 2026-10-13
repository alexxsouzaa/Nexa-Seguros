const STEPS = [
  { num: "01", id: "passo-1", title: "Conte o que você precisa", text: "Informe seu perfil e o que procura." },
  { num: "02", id: "passo-2", title: "Analisamos as opções", text: "Buscamos alternativas compatíveis com seu perfil." },
  { num: "03", id: "passo-3", title: "Você compara", text: "Apresentamos as opções de forma simples e transparente." },
  { num: "04", id: "passo-4", title: "Escolha com segurança", text: "Você decide e nós acompanhamos o processo." }
];

export default function Process() {
  return (
    <section className="section" id="processo" data-od-id="secao-processo">
      <div className="container">
        <div className="section-head r">
          <h2>Do primeiro contato à sua escolha</h2>
        </div>
        <ol className="steps" role="list">
          {STEPS.map((step) => (
            <li className="step r" key={step.num} data-od-id={step.id}>
              <span className="step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
