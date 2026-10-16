import { Heart, Smile, Building2, ShieldCheck, Users, RefreshCw, LayoutGrid } from "lucide-react";

const ITEMS = [
  {
    title: "Preço real das operadoras.",
    desc: "Cotamos direto com as operadoras parceiras, sem tabelas genéricas ou valores que mudam na assinatura.",
    Icon: RefreshCw
  },
  {
    title: "Seu perfil, suas opções.",
    desc: "Idade, região e tipo de contratação: mostramos apenas o que faz sentido para o seu caso.",
    Icon: Users
  },
  {
    title: "Comparativo lado a lado.",
    desc: "Cobertura, rede, acomodação e carências organizados para você decidir com clareza.",
    Icon: LayoutGrid
  },
  {
    title: "Atualizado, sem retrabalho.",
    desc: "Quando a operadora reajusta, a próxima cotação já sai com o valor novo. Você não precisa pedir de novo.",
    Icon: RefreshCw
  }
];

export default function ValueProps() {
  return (
    <section className="section section-alt" id="produtos">
      <div className="container">
        <div className="split">
          <div className="split-copy r">
            <p className="eyebrow">Cotações</p>
            <h2>Precificação real, direto da operadora.</h2>
            <p className="section-sub">
              Mais de 200 operadoras de saúde com condições atualizadas pelo nosso time. Você recebe o
              comparativo certo, sem surpresa na hora de assinar.
            </p>
            <p className="section-sub" style={{ marginTop: 16 }}>
              Saúde e odontológico, pessoa física e empresarial.
            </p>
          </div>

          <ul className="value-grid r" role="list">
            {ITEMS.map((it) => {
              const Icon = it.Icon;
              return (
                <li className="value-item" key={it.title}>
                  <span className="vi-ic" aria-hidden="true">
                    <Icon width={18} height={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3>{it.title}</h3>
                    <p>{it.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
