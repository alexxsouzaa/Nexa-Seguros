import { Link } from "react-router-dom";
import {
  FOOTER_PRODUCT_LINKS,
  FOOTER_PLAN_LINKS,
  FOOTER_INST_LINKS,
  FOOTER_LEGAL_LINKS,
  WA_NUMBER,
  YEAR,
  asset,
} from "../lib/site.js";

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
          <p>A ferramenta do corretor de seguros.</p>
          <div className="footer-apps">
            <a href="https://play.google.com/store/apps/details?id=app.koter.pwa" target="_blank" rel="noopener">
              Google Play
            </a>
            <a href="https://apps.apple.com/br/app/koter-cotador-mkt-e-mais/id6466230392" target="_blank" rel="noopener">
              App Store
            </a>
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com/koterapp/" target="_blank" rel="noopener" aria-label="Instagram">Instagram</a>
            <a href="https://www.linkedin.com/company/koterapp/" target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://www.youtube.com/@koterapp" target="_blank" rel="noopener" aria-label="YouTube">YouTube</a>
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener" aria-label="WhatsApp">WhatsApp</a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Produtos">
          <h3>Produtos</h3>
          {FOOTER_PRODUCT_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Planos">
          <h3>Planos</h3>
          {FOOTER_PLAN_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Empresa">
          <h3>Empresa</h3>
          {FOOTER_INST_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Legal">
          <h3>Legal</h3>
          {FOOTER_LEGAL_LINKS.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener">
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>
          © <span id="year">{YEAR}</span> Nexa Seguros · CNPJ 64.010.597/0001-38 ·
          Assessoria em planos de saúde e odontológicos em Camaçari, BA.
        </p>
        <div className="footer-legal">
          <Link to="/legal.html#privacidade">Política de privacidade</Link>
          <Link to="/legal.html#termos">Termos de uso</Link>
        </div>
      </div>
    </footer>
  );
}
