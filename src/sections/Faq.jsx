import { useState } from "react";

const FAQS = [
  {
    id: "1",
    q: "Qual a diferença entre plano individual e empresarial?",
    a: "O plano individual é contratado por você, com cobertura para você ou sua família. O empresarial é contratado pela empresa em benefício da equipe, com regras e valores definidos conforme o perfil do grupo."
  },
  {
    id: "2",
    q: "Como funciona a cotação?",
    a: "Você preenche um formulário curto com seu perfil. Nós analisamos as opções disponíveis, montamos um comparativo simples e enviamos pelo WhatsApp. É gratuito e não gera compromisso."
  },
  {
    id: "3",
    q: "Posso contratar um plano de saúde e odontológico juntos?",
    a: 'Sim. Muitos clientes combinam os dois na mesma negociação, o que costuma simplificar a gestão e, dependendo da operadora, melhorar as condições. Na cotação, marque "Saúde + Odontológico".'
  },
  {
    id: "4",
    q: "Existe carência?",
    a: "Na maioria dos planos, sim. O período varia conforme a operadora, o tipo de procedimento e a modalidade. Existem casos com carência reduzida ou isenta, e sempre explicamos isso antes da contratação."
  },
  {
    id: "5",
    q: "O valor depende da idade?",
    a: "Sim. A idade é um dos fatores que influenciam o valor, junto com a região, o tipo de plano e o perfil (individual ou empresarial). Por isso trabalhamos com cotação por pessoa, não com preço fixo."
  },
  {
    id: "6",
    q: "Vocês atendem empresas?",
    a: "Atendemos. Fazemos o diagnóstico do perfil da equipe, apresentamos alternativas comparáveis e acompanhamos a implantação junto ao RH ou à gestão da empresa."
  }
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section section-alt" id="duvidas" data-od-id="secao-faq">
      <div className="container faq-wrap">
        <div className="section-head r">
          <h2>Perguntas que todo mundo faz</h2>
        </div>

        <div className="faq r" data-od-id="accordion-faq">
          {FAQS.map((item) => {
            const expanded = open === item.id;
            return (
              <div className="faq-item" key={item.id}>
                <h3>
                  <button
                    className="faq-q"
                    type="button"
                    aria-expanded={expanded}
                    id={`faq-q${item.id}`}
                    aria-controls={`faq-a${item.id}`}
                    onClick={() => setOpen(expanded ? null : item.id)}
                  >
                    {item.q}
                    <span className="faq-ic" aria-hidden="true"></span>
                  </button>
                </h3>
                <div
                  className={expanded ? "faq-a open" : "faq-a"}
                  id={`faq-a${item.id}`}
                  aria-labelledby={`faq-q${item.id}`}
                  role="region"
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
