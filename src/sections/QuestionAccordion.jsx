import { useState } from "react";

const QA = [
  {
    id: "1",
    q: "Pela minha idade fica muito caro?",
    a: "A idade influencia no valor, mas existem estratégias: escolher a acomodação certa, avaliar coparticipação e comparar operadoras. Mostramos o que cada caminho muda no seu caso."
  },
  {
    id: "2",
    q: "Meus médicos atendem nesse plano?",
    a: "Verificamos a rede credenciada antes de indicar. Você confere hospitais, laboratórios e médicos da sua confiança e evita surpresa depois de contratar."
  },
  {
    id: "3",
    q: "Me manda por escrito?",
    a: "Enviamos o comparativo organizado pelo WhatsApp, com preços, coberturas e carências. Tudo registrado, fácil de comparar e sem enrolação."
  },
  {
    id: "4",
    q: "Vou pensar e te aviso.",
    a: "Sem problema. Guardamos suas preferências e retomamos quando você quiser. Nosso compromisso é te ajudar, não pressionar."
  }
];

export default function QuestionAccordion() {
  const [open, setOpen] = useState("1");

  return (
    <section className="section">
      <div className="container">
        <div className="section-head r" style={{ maxWidth: 760 }}>
          <h2>O cliente pergunta, você tem a resposta.</h2>
          <p className="section-sub">
            Quem escolhe plano de saúde ouve as mesmas dúvidas. Veja como a Nexa resolve cada uma, sem deixar você no escuro.
          </p>
        </div>

        <div className="acc-wrap">
          <div className="acc r">
            {QA.map((item) => {
              const expanded = open === item.id;
              return (
                <div className="acc-item" key={item.id}>
                  <h3 style={{ margin: 0, fontSize: "1rem" }}>
                    <button
                      className="acc-q"
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`qa-a${item.id}`}
                      id={`qa-q${item.id}`}
                      onClick={() => setOpen(expanded ? null : item.id)}
                    >
                      <span>
                        <span className="q-tag" aria-hidden="true">O cliente pergunta</span>
                        {item.q}
                      </span>
                      <span className="acc-ic" aria-hidden="true"></span>
                    </button>
                  </h3>
                  <div className={expanded ? "acc-a open" : "acc-a"} id={`qa-a${item.id}`} role="region" aria-labelledby={`qa-q${item.id}`}>
                    <div>
                      <p>{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
