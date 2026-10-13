import { QuoteIcon, ShieldIcon, HelpIcon, WhatsAppIcon } from "../components/icons.jsx";
import { WA_CTA_TEXT, waLink } from "../lib/site.js";

const LINKS = [
  {
    label: "Pedir cotação",
    hint: "receba sua proposta",
    href: "#simulador",
    icon: <QuoteIcon />
  },
  {
    label: "Falar no WhatsApp",
    hint: "atendimento direto",
    href: waLink(WA_CTA_TEXT),
    external: true,
    icon: <WhatsAppIcon />,
    iconClass: "quick-ic-wa"
  },
  {
    label: "Comparar planos",
    hint: "veja as operadoras",
    href: "#planos",
    icon: <ShieldIcon />
  },
  {
    label: "Tirar dúvidas",
    hint: "perguntas frequentes",
    href: "#duvidas",
    icon: <HelpIcon />
  }
];

export default function QuickLinks() {
  return (
    <section className="quick r" id="atalhos" aria-label="Atalhos" data-od-id="atalhos-rapidos">
      <div className="container">
        <div className="quick-strip">
          {LINKS.map((link) => (
            <a
              key={link.label}
              className="quick-link"
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              <span className={"quick-ic" + (link.iconClass ? " " + link.iconClass : "")} aria-hidden="true">
                {link.icon}
              </span>
              <span>
                {link.label}
                <small>{link.hint}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}