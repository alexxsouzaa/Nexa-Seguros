import { Heart, Smile, Building2, FileText, Search, ArrowRight } from "lucide-react";

const LINKS = [
  { label: "Plano de saúde", Icon: Heart },
  { label: "Odontológico", Icon: Smile },
  { label: "Empresarial", Icon: Building2 },
  { label: "Carências", Icon: FileText }
];

export default function HelpCenter() {
  return (
    <section className="section section-alt" id="ajuda">
      <div className="container">
        <div className="section-head center r" style={{ maxWidth: 640 }}>
          <h2>Central de ajuda</h2>
          <p className="section-sub">
            Dúvidas rápidas sobre planos de saúde e odontológicos, carências, rede credenciada e contratação.
          </p>
          <a className="help-search" href="#contato">
            <Search width={18} height={18} />
            Buscar na central de ajuda
            <ArrowRight width={16} height={16} style={{ marginLeft: "auto" }} />
          </a>
        </div>

        <div className="help-links r">
          {LINKS.map((l) => {
            const Icon = l.Icon;
            return (
              <a href="#contato" key={l.label}>
                <Icon width={18} height={18} />
                {l.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
