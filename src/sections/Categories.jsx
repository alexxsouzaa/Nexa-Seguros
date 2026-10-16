import { Heart, Smile, Building2, UserRound, Users, Plus, MessageCircle, Hospital, FlaskConical, Stethoscope, Check } from "lucide-react";

const CARDS = [
  {
    id: "solucoes",
    Icon: Heart,
    title: "Plano de Saúde",
    desc: "Para cuidar da sua saúde com mais segurança e tranquilidade, com rede e cobertura que fazem sentido para você.",
    Mock: () => (
      <div className="cat-mock cat-mock--phone">
        <span className="cat-handle" />
        <p className="cat-m-label">Seu comparativo</p>
        <p className="cat-m-value">3 opções</p>
        <p className="cat-m-sub">atualizado hoje</p>
        <div className="cat-m-row">
          <span className="cat-m-av"><MessageCircle size={14} strokeWidth={1.5} /></span>
          <span className="cat-m-txt">
            <span className="cat-m-t1">Comparativo enviado</span>
            <span className="cat-m-t2">pelo WhatsApp</span>
          </span>
        </div>
      </div>
    )
  },
  {
    id: "odontologico",
    Icon: Smile,
    title: "Plano Odontológico",
    desc: "Cuidados odontológicos para você, sua família ou sua empresa, com preços acessíveis e cobertura completa.",
    Mock: () => (
      <div className="cat-mock">
        <div className="cat-m-top">
          <p className="cat-m-title">Rede credenciada</p>
          <p className="cat-m-cap">Cobertura</p>
        </div>
        <ul className="cat-m-bars">
          {[
            { n: 1, label: "Hospitais", pct: 100, Icon: Hospital },
            { n: 2, label: "Laboratórios", pct: 100, Icon: FlaskConical },
            { n: 3, label: "Clínicas", pct: 80, Icon: Stethoscope }
          ].map((r) => (
            <li key={r.label}>
              <span className="cat-m-num">{r.n}</span>
              <span className="cat-m-av"><r.Icon size={14} strokeWidth={1.5} /></span>
              <span className="cat-m-bar"><span style={{ width: `${r.pct}%` }} /></span>
              <span className="cat-m-count">{r.pct}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    id: "empresas",
    Icon: Building2,
    title: "Planos Empresariais",
    desc: "Soluções para empresas que querem cuidar das pessoas que fazem parte do negócio, do diagnóstico ao pós-venda.",
    Mock: () => (
      <div className="cat-mock">
        <p className="cat-m-title">Implantação da equipe</p>
        <div className="cat-m-checklist">
          <div className="cat-m-chip">
            <span className="cat-m-chip-l">
              <span className="cat-m-chip-ic cat-m-check"><Check size={10} strokeWidth={3} /></span>Cadastradas
            </span>
            <span className="cat-m-chip-v">42</span>
          </div>
          <div className="cat-m-chip">
            <span className="cat-m-chip-l">
              <span className="cat-m-chip-ic cat-m-ring" />Pendências
            </span>
            <span className="cat-m-chip-v">3</span>
          </div>
        </div>
        <span className="cat-m-btn">Acompanhar</span>
      </div>
    )
  }
];

export default function Categories() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center r">
          <div className="cat-icons" aria-hidden="true">
            <span className="qa-ic-lg"><UserRound size={24} strokeWidth={1.5} /></span>
            <span className="qa-ic-mid"><Plus size={18} strokeWidth={2} /></span>
            <span className="qa-ic-lg"><Users size={24} strokeWidth={1.5} /></span>
          </div>
          <h2>Um plano para cada momento</h2>
          <p className="section-sub">
            Saúde, odontológico ou empresarial: veja as opções de cada caminho.
          </p>
        </div>

        <ul className="cat-grid">
          {CARDS.map((c, i) => {
            const Icon = c.Icon;
            const Mock = c.Mock;
            return (
              <li className={`cat-card cat-card--${i + 1} r`} id={c.id} key={c.id}>
                <div className="cat-vis" aria-hidden="true">
                  <Mock />
                </div>
                <div className="cat-body">
                  <div className="cat-head">
                    <span className="cat-ic"><Icon size={16} strokeWidth={1.5} /></span>
                    <h3>{c.title}</h3>
                  </div>
                  <p>{c.desc}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="cat-note">Fale com a Nexa e receba as opções que fazem sentido para você.</p>
      </div>
    </section>
  );
}
