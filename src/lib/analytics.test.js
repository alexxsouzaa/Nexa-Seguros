import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/* Recarrega o módulo com um GA4_ID controlado. */
function loadAnalytics(ga4Id) {
  vi.resetModules();
  vi.doMock("./site.js", () => ({ GA4_ID: ga4Id }));
  return import("./analytics.js");
}

const CONSENT_KEY = "nexa_cookie_consent";
const GA_SCRIPT = 'script[src*="googletagmanager"]';
const dataLayerCalls = () => Array.from(window.dataLayer).map((a) => Array.from(a));

describe("analytics (GA4 + consentimento LGPD)", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    localStorage.clear();
    delete window.dataLayer;
    delete window.gtag;
  });

  afterEach(() => {
    vi.doUnmock("./site.js");
    vi.resetModules();
  });

  it("nao carrega o gtag.js quando nao ha ID de medição", async () => {
    const { initGA4, trackWhatsAppOpen } = await loadAnalytics("");
    localStorage.setItem(CONSENT_KEY, "granted");
    initGA4();
    trackWhatsAppOpen("cotacao");

    expect(document.querySelector(GA_SCRIPT)).toBeNull();
    expect(window.gtag).toBeUndefined();
  });

  it("NAO carrega o GA4 sem consentimento do visitante", async () => {
    const { initGA4, trackWhatsAppOpen } = await loadAnalytics("G-TEST123");
    initGA4();
    trackWhatsAppOpen("cotacao");

    expect(document.querySelector(GA_SCRIPT)).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it("carrega o script do GA4 quando ha consentimento", async () => {
    const { initGA4 } = await loadAnalytics("G-TEST123");
    localStorage.setItem(CONSENT_KEY, "granted");
    initGA4();

    const s = document.querySelector(GA_SCRIPT);
    expect(s).not.toBeNull();
    expect(s.async).toBe(true);
    expect(s.src).toContain("G-TEST123");
  });

  it("nao duplica o script se initGA4 for chamado duas vezes", async () => {
    const { initGA4 } = await loadAnalytics("G-TEST123");
    localStorage.setItem(CONSENT_KEY, "granted");
    initGA4();
    initGA4();

    expect(document.querySelectorAll(GA_SCRIPT).length).toBe(1);
  });

  it("setConsent('granted') libera o GA4 imediatamente", async () => {
    const { initGA4, setConsent, hasAnalyticsConsent } = await loadAnalytics("G-TEST123");

    initGA4();
    expect(hasAnalyticsConsent()).toBe(false);
    expect(document.querySelector(GA_SCRIPT)).toBeNull();

    setConsent("granted");
    initGA4();
    expect(hasAnalyticsConsent()).toBe(true);
    expect(document.querySelector(GA_SCRIPT)).not.toBeNull();
  });

  it("setConsent('denied') mantem o GA4 desligado", async () => {
    const { initGA4, setConsent, hasAnalyticsConsent } = await loadAnalytics("G-TEST123");
    setConsent("denied");
    initGA4();

    expect(hasAnalyticsConsent()).toBe(false);
    expect(document.querySelector(GA_SCRIPT)).toBeNull();
  });

  it("envia a conversão principal (whatsapp_open) para o dataLayer", async () => {
    const { initGA4, trackWhatsAppOpen } = await loadAnalytics("G-TEST123");
    localStorage.setItem(CONSENT_KEY, "granted");
    initGA4();
    trackWhatsAppOpen("cotacao");

    expect(
      dataLayerCalls().some(
        (c) => c[0] === "event" && c[1] === "whatsapp_open" && c[2].context === "cotacao"
      )
    ).toBe(true);
  });

  it("envia quote_start, quote_submit e cta_click para o dataLayer", async () => {
    const { initGA4, trackQuoteStart, trackQuoteSubmit, trackCtaClick } =
      await loadAnalytics("G-TEST123");
    localStorage.setItem(CONSENT_KEY, "granted");
    initGA4();

    trackQuoteStart();
    trackQuoteSubmit({ tipo: "saude" });
    trackCtaClick("cta_hero_principal", "#cotacao");

    const calls = dataLayerCalls();
    expect(calls.some((c) => c[0] === "event" && c[1] === "quote_start")).toBe(true);
    expect(
      calls.some((c) => c[0] === "event" && c[1] === "quote_submit" && c[2].tipo === "saude")
    ).toBe(true);
    expect(
      calls.some(
        (c) => c[0] === "event" && c[1] === "cta_click" && c[2].cta === "cta_hero_principal"
      )
    ).toBe(true);
  });

  it("registra a page_view a cada troca de rota (SPA)", async () => {
    const { initGA4, trackPageView } = await loadAnalytics("G-TEST123");
    localStorage.setItem(CONSENT_KEY, "granted");
    initGA4();
    trackPageView("/privacidade");

    expect(
      dataLayerCalls().some(
        (c) => c[0] === "config" && c[1] === "G-TEST123" && c[2].page_path === "/privacidade"
      )
    ).toBe(true);
  });
});
