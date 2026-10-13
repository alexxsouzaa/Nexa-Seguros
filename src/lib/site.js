/* Nexa Seguros - dados compartilhados do site */

/* Número oficial da Nexa (formato 55 + DDD + número) */
export const WA_NUMBER = "5571981494527";

export const WA_CTA_TEXT = "Ol%C3%A1%2C%20quero%20falar%20com%20a%20Nexa%20Seguros";
export const WA_FLOAT_TEXT = "Ol%C3%A1%2C%20quero%20ajuda%20para%20escolher%20meu%20plano";

export function waLink(text) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + text;
}

export const NAV_LINKS = [
  { href: "#planos", label: "Planos" },
  { href: "#empresas", label: "Para empresas" },
  { href: "#processo", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" }
];

export const FOOTER_PLAN_LINKS = [
  { href: "#solucoes", label: "Saúde" },
  { href: "#odontologico", label: "Odontológico" },
  { href: "#empresas", label: "Empresarial" },
  { href: "#planos", label: "Operadoras" }
];

export const FOOTER_INST_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" }
];

export const YEAR = new Date().getFullYear();
