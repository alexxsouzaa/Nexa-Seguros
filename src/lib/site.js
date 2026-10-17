/* Nexa Seguros - dados compartilhados do site */

/* Número oficial da Nexa (formato 55 + DDD + número) */
export const WA_NUMBER = "5571981494527";

export const WA_CTA_TEXT = "Ol%C3%A1%2C%20quero%20falar%20com%20a%20Nexa%20Seguros";
export const WA_FLOAT_TEXT = "Ol%C3%A1%2C%20quero%20ajuda%20para%20escolher%20meu%20plano";

export function waLink(text) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + text;
}

export const YEAR = new Date().getFullYear();

export const PRODUCT_LINKS = [
  { key: "saude", label: "Plano de saúde", href: "#plano-saude" },
  { key: "odonto", label: "Plano odontológico", href: "#plano-odontologico" },
  { key: "empresa", label: "Plano empresarial", href: "#plano-empresarial" },
  { key: "operadoras", label: "Operadoras", href: "#operadoras" },
];

export const FOOTER_PRODUCT_LINKS = [
  { label: "Plano de saúde individual", href: "#plano-saude-individual" },
  { label: "Plano de saúde familiar", href: "#plano-saude-familiar" },
  { label: "Plano de saúde empresarial", href: "#plano-saude-empresarial" },
  { label: "Plano odontológico", href: "#plano-odontologico" },
];

export const FOOTER_PLAN_LINKS = [
  { label: "Amil", href: "#amil" },
  { label: "Bradesco Seguros", href: "#bradesco" },
  { label: "SulAmérica", href: "#sulamerica" },
  { label: "Porto Seguro", href: "#porto" },
  { label: "Intermédica", href: "#intermedica" },
  { label: "NotreDame Intermédica", href: "#notredame" },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos de Uso", href: "/termos" },
  { label: "LGPD", href: "/lgpd" },
];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const asset = (p) => BASE + p;

/* Canonical e URLs públicas */
export const CANONICAL_BASE = "https://www.nexaseguros.com.br";

/* SEO helpers */
export function seoTitle(pageTitle) {
  return pageTitle + " | Nexa Seguros";
}

export function seoDescription(desc) {
  return desc;
}

export const SITE_NAME = "Nexa Seguros";
export const SITE_DESCRIPTION =
  "Assessoria em planos de saúde e odontológicos em Camaçari, BA. Compare opções de planos de saúde e odontológicos com orientação personalizada. Solicite uma cotação gratuita.";

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nexa Seguros",
  "url": CANONICAL_BASE,
  "logo": CANONICAL_BASE + "/logo.png",
  "sameAs": [
    "https://www.instagram.com/nexaseguros",
    "https://www.youtube.com/@nexaseguros",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+5571981494527",
    "contactType": "customer service",
    "availableLanguage": "Portuguese",
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Camaçari",
    "addressRegion": "BA",
    "addressCountry": "BR",
  },
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nexa Seguros",
  "image": CANONICAL_BASE + "/og-image.png",
  "url": CANONICAL_BASE,
  "telephone": "+5571981494527",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "Camaçari",
    "addressRegion": "BA",
    "postalCode": "",
    "addressCountry": "BR",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -12.6867,
    "longitude": -38.3288,
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00",
  },
  "areaServed": {
    "@type": "City",
    "name": "Camaçari",
    "addressRegion": "BA",
    "addressCountry": "BR",
  },
  "knowsAbout": [
    "Plano de saúde",
    "Plano odontológico",
    "Plano empresarial",
    "Cotação de planos de saúde",
    "Assessoria de seguros",
  ],
};
