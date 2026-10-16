/* Nexa Seguros - mensuração de eventos (privacidade por design)
 *
 * Emite eventos de conversão para console em desenvolvimento.
 * Para produção, estenda `sendEvent` para disparar para o serviço de
 * analytics desejado (GA4, Meta Pixel, endpoint próprio, etc.).
 *
 * NÃO coleta dados sensíveis (CPF, dados médicos, documentos).
 * Apenas nomes de evento, origem e metadados não identificáveis.
 */

const isDev = import.meta.env.DEV;

export function sendEvent(name, payload = {}) {
  const event = {
    event: name,
    ts: new Date().toISOString(),
    origin: typeof location !== "undefined" ? location.pathname : "",
    ...payload,
  };

  if (isDev) {
    // eslint-disable-next-line no-console
    console.log("[NEXA_EVENT]", JSON.stringify(event));
  }

  // Ponto de extensão para produção:
  // fetch("/api/analytics", { method: "POST", body: JSON.stringify(event) });
  // ou gtag("event", name, payload);  fbq("track", name);
}

export function trackCtaClick(cta, destination) {
  sendEvent("cta_click", { cta, destination });
}

export function trackQuoteStart() {
  sendEvent("quote_start");
}

export function trackQuoteSubmit(payload = {}) {
  sendEvent("quote_submit", payload);
}

export function trackWhatsAppOpen(context) {
  sendEvent("whatsapp_open", { context });
}

export default { sendEvent, trackCtaClick, trackQuoteStart, trackQuoteSubmit, trackWhatsAppOpen };
