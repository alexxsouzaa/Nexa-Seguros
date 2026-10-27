import { Link } from "react-router-dom";
import {
  FOOTER_PRODUCT_LINKS,
  FOOTER_PLAN_LINKS,
  FOOTER_LEGAL_LINKS,
  WA_NUMBER,
  YEAR,
  asset,
} from "../lib/site.js";
import { openConsentPreferences } from "../lib/analytics.js";

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/nexa_seguro", icon: "M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Zm-4 12.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5Zm4.5-8a.8.8 0 1 1 .8-.8.8.8 0 0 1-.8.8Z" },
  { label: "WhatsApp", href: `https://wa.me/${WA_NUMBER}`, icon: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.54 3.7-8.24 8.24-8.24a8.19 8.19 0 0 1 8.23 8.25c0 4.54-3.69 8.21-8.24 8.21Z" }
];

export default function Footer() {
  return (
    <footer className="footer" style={{ viewTransitionName: "footer" }}>
      <div className="container footer-grid">
        <div className="footer-brand">
          <picture>
            <source src={asset("/logo_dark.webp")} type="image/webp" width="400" height="214" />
            <img
              className="brand-logo"
              src={asset("/logo_dark.png")}
              alt="Nexa Seguros"
              width="400"
              height="214"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <p>Assessoria em planos de saúde e odontológicos. Cuidando de você e da sua empresa.</p>
          <div className="footer-social">
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
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

        <nav className="footer-col" aria-label="Recursos">
          <h3>Recursos</h3>
          {FOOTER_PLAN_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Legal">
          <h3>Legal</h3>
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

        <div className="container footer-bottom">
          <div className="footer-contacts" aria-label="Contatos oficiais">
            <a href="https://wa.me/5571981494527" target="_blank" rel="noopener noreferrer">
              WhatsApp: (71) 98149-4527
            </a>
          </div>
          <p>© {YEAR} Nexa Seguros · Assessoria em planos de saúde e odontológicos · Camaçari, BA</p>
          <button type="button" className="footer-cookie" onClick={() => openConsentPreferences()}>
            Preferências de cookies
          </button>
          <a className="to-top" href="#inicio">
            Voltar ao topo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
    </footer>
  );
}
