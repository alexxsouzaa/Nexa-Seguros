import { Users, UserCheck, Building2 } from "lucide-react";

const ROLES = [
  {
    title: "Você e sua família",
    desc: "Escolha o plano com calma, entenda a cobertura e contrate com quem responde às suas dúvidas depois também.",
    Icon: Users
  },
  {
    title: "Autônomos e MEI",
    desc: "Plano acessível para quem cuida da própria proteção, com orientação clara e sem burocracia.",
    Icon: UserCheck
  },
  {
    title: "Empresas",
    desc: "Saúde como benefício para a equipe, com diagnóstico, implantação e acompanhamento contínuo.",
    Icon: Building2
  }
];

export default function Roles() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head center r">
          <h2>Do cuidado individual à equipe inteira.</h2>
          <p className="section-sub">
            Cada pessoa tem uma necessidade. A Nexa atende todas elas com o mesmo cuidado.
          </p>
        </div>

        <div className="grid-3 roles">
          {ROLES.map((r) => {
            const Icon = r.Icon;
            return (
              <article className="role-card r" key={r.title}>
                <span className="role-ic" aria-hidden="true">
                  <Icon width={24} height={24} strokeWidth={1.7} />
                </span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </article>
            );
          })}
        </div>

        <p className="trust-line r" style={{ marginTop: 32 }}>
          Comece sozinho e inclua a equipe quando quiser.
        </p>
      </div>
    </section>
  );
}
