import { useLayoutEffect, useRef, useState } from "react";
import { UserRound, Plus, MessageCircleQuestion, ChevronDown } from "lucide-react";

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
  },
  {
    id: "10",
    q: "O que é coparticipação?",
    a: "É um valor que você pode pagar cada vez que usar determinado serviço, como consulta ou exame. Nem todo plano tem coparticipação, e o percentual varia conforme a operadora e o tipo de procedimento."
  },
  {
    id: "11",
    q: "O que é rede credenciada?",
    a: "É o conjunto de hospitais, laboratórios, clínicas e profissionais que têm acordo com a operadora. Quanto maior e mais próxima a rede, mais fácil é usar o plano no dia a dia."
  },
  {
    id: "12",
    q: "Quais modalidades de plano existem?",
    a: "As mais comuns são individual/familiar (para você ou sua família) e empresarial (contratada pela empresa para a equipe). Cada uma tem regras, valores e coberturas diferentes. Na cotação, indicamos a que faz sentido para o seu perfil."
  }
];

function FaqItem({ item, open, onToggle }) {
  const inner = useRef(null);
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const update = () => setH(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={open ? "faq-item is-open" : "faq-item"}>
      <h3 className="faq-h">
        <button
          className="faq-q"
          type="button"
          aria-expanded={open}
          id={`faq-q${item.id}`}
          aria-controls={`faq-a${item.id}`}
          onClick={onToggle}
        >
          <span>{item.q}</span>
          <ChevronDown className="faq-chev" size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </h3>
      <div
        className="faq-a"
        id={`faq-a${item.id}`}
        role="region"
        aria-labelledby={`faq-q${item.id}`}
        style={{ height: open ? h : 0 }}
      >
        <div className="faq-a-inner" ref={inner}>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openLeft, setOpenLeft] = useState(null);
  const [openRight, setOpenRight] = useState(null);
  const left = FAQS.slice(0, 5);
  const right = FAQS.slice(5);

  return (
    <section className="section" id="duvidas">
      <div className="container">
        <div className="section-head center r">
          <div className="faq-icons" aria-hidden="true">
            <span className="qa-ic-lg"><UserRound size={24} strokeWidth={1.5} /></span>
            <span className="qa-ic-mid"><Plus size={18} strokeWidth={2} /></span>
            <span className="qa-ic-lg"><MessageCircleQuestion size={24} strokeWidth={1.5} /></span>
          </div>
          <h2>Perguntas frequentes</h2>
        </div>

        <div className="faq-grid r">
          <div className="faq-col">
            {left.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                open={openLeft === item.id}
                onToggle={() => setOpenLeft(openLeft === item.id ? null : item.id)}
              />
            ))}
          </div>
          <div className="faq-col">
            {right.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                open={openRight === item.id}
                onToggle={() => setOpenRight(openRight === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
