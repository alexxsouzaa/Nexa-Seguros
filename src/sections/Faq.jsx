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
    a: "Sim. A idade é um dos fatores que influenciam no valor, junto com a região, o tipo de plano e o perfil (individual ou empresarial). Por isso trabalhamos com cotação por pessoa, não com preço fixo."
  },
  {
    id: "6",
    q: "Vocês atendem empresas?",
    a: "Atendemos. Fazemos o diagnóstico do perfil da equipe, apresentamos alternativas comparáveis e acompanhamos a implantação junto ao RH ou à gestão da empresa."
  },
  {
    id: "7",
    q: "Quanto tempo leva para receber as opções?",
    a: "Na maioria dos casos, no mesmo dia. Depois de enviar seus dados, nossa equipe monta o comparativo e retorna pelo WhatsApp com as opções que fazem sentido para o seu perfil."
  },
  {
    id: "8",
    q: "Meus dados ficam seguros?",
    a: "Sim. Usamos seus dados apenas para montar a cotação e não compartilhamos com terceiros fora do processo de contratação. Você pode solicitar a exclusão quando quiser."
  },
  {
    id: "9",
    q: "E se eu já tiver um plano?",
    a: "Podemos avaliar seu plano atual, comparar com outras opções e indicar se vale a pena migrar. Sem custo e sem compromisso de troca."
  }
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section" id="duvidas">
      <div className="container">
        <div className="section-head center r">
          <h2>Perguntas frequentes</h2>
        </div>

        <div className="acc-wrap">
          <div className="acc r">
            {FAQS.map((item) => {
              const expanded = open === item.id;
              return (
                <div className="acc-item" key={item.id}>
                  <h3 style={{ margin: 0, fontSize: "1rem" }}>
                    <button
                      className="acc-q"
                      type="button"
                      aria-expanded={expanded}
                      id={`faq-q${item.id}`}
                      aria-controls={`faq-a${item.id}`}
                      onClick={() => setOpen(expanded ? null : item.id)}
                    >
                      {item.q}
                      <span className="acc-ic" aria-hidden="true"></span>
                    </button>
                  </h3>
                  <div className={expanded ? "acc-a open" : "acc-a"} id={`faq-a${item.id}`} role="region" aria-labelledby={`faq-q${item.id}`}>
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
