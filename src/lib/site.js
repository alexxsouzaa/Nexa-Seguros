/* Nexa Seguros - dados compartilhados do site */

/* Número oficial da Nexa (formato 55 + DDD + número) */
export const WA_NUMBER = "5571981494527";

export const WA_CTA_TEXT = "Ol%C3%A1%2C%20quero%20falar%20com%20a%20Nexa%20Seguros";
export const WA_FLOAT_TEXT = "Ol%C3%A1%2C%20quero%20ajuda%20para%20escolher%20meu%20plano";

export function waLink(text) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + text;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
export const asset = (p) => BASE + p;

export const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#produtos", label: "Produtos" },
  { href: "#precos", label: "Preços" },
  { href: "#duvidas", label: "Dúvidas" }
];

export const FOOTER_PRODUCT_LINKS = [
  { href: "#cotador", label: "Cotador" },
  { href: "#crm", label: "CRM" },
  { href: "#koterzap", label: "WhatsApp" },
  { href: "#gestao", label: "Gestão" }
];

export const FOOTER_PLAN_LINKS = [
  { href: "#solucoes", label: "Saúde" },
  { href: "#odontologico", label: "Odontológico" },
  { href: "#empresas", label: "Empresarial" },
  { href: "#planos", label: "Operadoras" }
];

export const FOOTER_INST_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Avaliações" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
  { href: "#ajuda", label: "Central de ajuda" }
];

export const FOOTER_LEGAL_LINKS = [
  { href: "/legal.html#privacidade", label: "Termos de Uso" },
  { href: "/legal.html#termos", label: "Política de Privacidade" }
];

export const YEAR = new Date().getFullYear();
