/* Nexa Seguros - mensuração de eventos (Google Analytics 4 + Consent Mode v2)
 *
 * PRIVACIDADE / LGPD: nenhuma requisição é feita ao Google antes do visitante
 * aceitar o banner. O script gtag.js é injetado sob demanda por loadGA4(), já
 * com consentimento "granted" para analytics_storage.
 *
 * Sem aceite: nada é carregado, nada é enviado, nenhum cookie é gravado.
 *
 * Não coletamos dados sensíveis (CPF, dados médicos, documentos). Enviamos
 * apenas nome do evento, página de origem e metadados agregados (tipo de
 * plano, perfil, cidade, quantidade de vidas).
 */

import { GA4_ID } from "./site.js";

const isDev = import.meta.env.DEV;
const hasGA4 = typeof GA4_ID === "string" && GA4_ID.trim() !== "";
const CONSENT_KEY = "nexa_cookie_consent";
const SCRIPT_ID = "nexa-ga4";

/* GA4 carregado e configurado nesta sessão. */
let ready = false;
let scriptRequested = false;
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
  if (value === "granted") loadGA4();
  else applyGoogleConsent(false);
}

/* Reabre o banner ("Preferências de cookies" no rodapé). */
export const CONSENT_EVENT = "nexa:cookies";

export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/* ---------- Google Analytics 4 (Consent Mode v2) ---------- */

/* Aplica o consentimento salvo. Sem aceite, não faz nada (nem rede, nem cookie). */
export function initGA4() {
  if (typeof window === "undefined" || !hasGA4) return;
  if (!hasAnalyticsConsent()) return;
  loadGA4();
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });
  }
}

function loadGA4() {
  if (typeof window === "undefined" || typeof document === "undefined" || !hasGA4) return;
  ensureGtag();
  applyGoogleConsent(true);
  if (ready) return;
  ready = true;
  window.gtag("config", GA4_ID, { send_page_view: false });

  if (scriptRequested) return;
  scriptRequested = true;
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA4_ID);
  document.head.appendChild(script);
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
  if (!ready || !hasAnalyticsConsent() || typeof window === "undefined") return;
  window.gtag("config", GA4_ID, { page_path: path, page_title: document.title });
}

export function sendEvent(name, payload = {}) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log("[NEXA_EVENT]", name, payload);
  }
  if (!ready || !hasAnalyticsConsent() || typeof window === "undefined") return;
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
