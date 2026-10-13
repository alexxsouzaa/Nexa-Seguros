import { WA_FLOAT_TEXT, waLink } from "../lib/site.js";
import { WhatsAppIcon } from "./icons.jsx";

export default function WhatsAppFloat() {
  return (
    <aside aria-label="Atalho de contato">
      <a
        className="wa-float"
        href={waLink(WA_FLOAT_TEXT)}
        target="_blank"
        rel="noopener"
        aria-label="Falar com a Nexa no WhatsApp"
        data-od-id="whatsapp-flutuante"
      >
        <WhatsAppIcon />
      </a>
    </aside>
  );
}
