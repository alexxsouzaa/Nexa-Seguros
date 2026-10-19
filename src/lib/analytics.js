/* Nexa Seguros - mensuração de eventos (Google Analytics 4 + Consent Mode v2)
 *
 * PRIVACIDADE / LGPD: a tag da Google é carregada pelo index.html já com todos
 * os sinais de consentimento em "denied", então nenhum cookie é gravado e
 * nenhum identificador é usado antes do visitante aceitar o banner. O aceite é
 * aplicado aqui via gtag("consent", "update", ...).
 *
 * O modo "denied" não desliga a tag: o Google recebe apenas sinais anônimos e
 * sem cookie (cookieless pings). Isso permite a detecção da tag e a modelagem
 * de conversões sem violar a LGPD.
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
  applyGoogleConsent(value === "granted");
}

/* Reabre o banner ("Preferências de cookies" no rodapé). */
export const CONSENT_EVENT = "nexa:cookies";

export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/* ---------- Google Analytics 4 (Consent Mode v2) ---------- */

/* A tag (gtag.js) já vem do index.html com o consentimento em "denied".
 * Aqui só sincronizamos o estado salvo e liberamos o envio de eventos. */
export function initGA4() {
  if (typeof window === "undefined" || !hasGA4 || ready) return;
  ready = true;
  applyGoogleConsent(hasAnalyticsConsent());
}

/* Com "granted" o GA4 grava cookies; com "denied" segue sem cookie nenhum. */
function applyGoogleConsent(granted) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const state = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

/* Page views de SPA: chamado a cada troca de rota (App.jsx). */
export function trackPageView(path) {
  if (!ready || typeof window === "undefined") return;
  window.gtag("config", GA4_ID, { page_path: path, page_title: document.title });
}

export function sendEvent(name, payload = {}) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log("[NEXA_EVENT]", name, payload);
  }
  if (!ready || typeof window === "undefined") return;
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
