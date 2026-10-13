import { Link } from "react-router-dom";
import { FOOTER_INST_LINKS, FOOTER_PLAN_LINKS, WA_NUMBER, YEAR, asset } from "../lib/site.js";

export default function Footer() {
  return (
    <footer className="footer" data-od-id="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            className="brand-logo"
            src={asset("/logo_dark.png")}
            alt="Nexa Seguros"
            width="400"
            height="214"
            loading="lazy"
            decoding="async"
          />
          <p>Seu cuidado, nossa conexão.</p>
        </div>

        <nav className="footer-col" aria-label="Planos">
          <h3>Planos</h3>
          {FOOTER_PLAN_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Institucional">
          <h3>Nexa</h3>
          {FOOTER_INST_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-col">
          <h3>Contato</h3>
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a href="https://instagram.com/nexa_seguro" target="_blank" rel="noopener">
            Instagram
          </a>
          <a href="mailto:contato@nexaseguros.com.br">E-mail</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © <span id="year">{YEAR}</span> Nexa Seguros - Assessoria em planos de saúde e
          odontológicos em Camaçari, BA.
        </p>
        <div className="footer-legal">
          <Link to="/legal.html#privacidade">Política de privacidade</Link>
          <Link to="/legal.html#termos">Termos de uso</Link>
        </div>
      </div>
    </footer>
  );
}
