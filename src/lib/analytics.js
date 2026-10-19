/* Nexa Seguros - mensuração de eventos (Google Analytics 4)
 *
 * PRIVACIDADE / LGPD: o GA4 só é carregado DEPOIS que o visitante aceita o
 * banner de cookies. Sem consentimento nenhum script externo é injetado e
 * nenhum evento é enviado.
 *
 * Não coletamos dados sensíveis (CPF, dados médicos, documentos). Enviamos
 * apenas nome do evento, página de origem e metadados agregados (tipo de
 * plano, perfil, cidade, quantidade de vidas).
 */

import { GA4_ID } from "./site.js";

const isDev = import.meta.env.DEV;
const hasGA4 = typeof GA4_ID === "string" && GA4_ID.trim() !== "";
const CONSENT_KEY = "nexa_cookie_consent";

let ready = false;
/* Fallback em memória para navegadores que bloqueiam o localStorage. */
let consentMemory = null;

/* ---------- Consentimento de cookies (LGPD) ---------- */

export function getConsent() {
  if (consentMemory) return consentMemory;
  try {
    return typeof localStorage !== "undefined" ? localStorage.getItem(CONSENT_KEY) : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  return getConsent() === "granted";
}

export function setConsent(value) {
  consentMemory = value;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage indisponível: a escolha vale pelo menos nesta sessão */
  }
  if (value !== "granted") disableGA4();
}

/* Desliga a medição e impede novos envios (recusa ou revogação do consentimento). */
function disableGA4() {
  ready = false;
  if (typeof window !== "undefined" && hasGA4) {
    /* Opt-out oficial do gtag: o Google para de coletar imediatamente. */
    window["ga-disable-" + GA4_ID] = true;
  }
}

/* Reabre o banner ("Preferências de cookies" no rodapé). */
export const CONSENT_EVENT = "nexa:cookies";

export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/* ---------- Google Analytics 4 ---------- */

export function initGA4() {
  if (typeof window === "undefined" || !hasGA4 || ready) return;
  if (!hasAnalyticsConsent()) return;
  ready = true;
  if (hasGA4) window["ga-disable-" + GA4_ID] = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
  document.head.appendChild(s);
}

/* Page views de SPA: chamado a cada troca de rota (App.jsx). */
export function trackPageView(path) {
  if (!ready) return;
  window.gtag("config", GA4_ID, { page_path: path, page_title: document.title });
}

export function sendEvent(name, payload = {}) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log("[NEXA_EVENT]", name, payload);
  }
  if (!ready) return;
  window.gtag("event", name, payload);
}

/* Cliques em botões de ação ("Simular grátis", "Cotação gratuita"...). */
export function trackCtaClick(cta, destination) {
  sendEvent("cta_click", { cta, destination });
}

/* Visitante começou a preencher o simulador. */
export function trackQuoteStart() {
  sendEvent("quote_start");
}

/* Visitante validou o formulário e foi para a etapa de confirmação. */
export function trackQuoteSubmit(payload = {}) {
  sendEvent("quote_submit", payload);
}

/* CONVERSÃO PRINCIPAL: clique que abre o WhatsApp com a cotação pronta. */
export function trackWhatsAppOpen(context) {
  sendEvent("whatsapp_open", { context });
}

export default {
  getConsent,
  hasAnalyticsConsent,
  setConsent,
  initGA4,
  trackPageView,
  sendEvent,
  trackCtaClick,
  trackQuoteStart,
  trackQuoteSubmit,
  trackWhatsAppOpen,
  openConsentPreferences,
  CONSENT_EVENT,
};
