import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/* Recarrega o módulo com um GA4_ID controlado. */
function loadAnalytics(ga4Id) {
  vi.resetModules();
  vi.doMock("./site.js", () => ({ GA4_ID: ga4Id }));
  return import("./analytics.js");
}

const calls = () => Array.from(window.dataLayer || []).map((a) => Array.from(a));
const lastConsent = () => calls().filter((c) => c[0] === "consent").pop();
const script = () => document.getElementById("nexa-ga4");
const events = (name) => calls().filter((c) => c[0] === "event" && (!name || c[1] === name));

const CONSENT_KEY = "nexa_cookie_consent";

describe("analytics (GA4 + Consent Mode v2)", () => {
  beforeEach(() => {
    localStorage.clear();
    delete window.dataLayer;
    delete window.gtag;
    document.querySelectorAll("#nexa-ga4").forEach((el) => el.remove());
  });

  afterEach(() => {
    vi.doUnmock("./site.js");
    vi.resetModules();
  });

  it("nao carrega o GA4 nem cria cookie antes do consentimento", async () => {
    const { initGA4, trackWhatsAppOpen, hasAnalyticsConsent } = await loadAnalytics("G-TEST123");

    initGA4();
    trackWhatsAppOpen("cotacao");

    expect(hasAnalyticsConsent()).toBe(false);
    expect(script()).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it("nao faz nada quando nao ha ID de medicao", async () => {
    const { setConsent, trackWhatsAppOpen } = await loadAnalytics("");

    setConsent("granted");
    trackWhatsAppOpen("cotacao");

    expect(script()).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it("carrega o gtag.js sob demanda quando o visitante aceita", async () => {
    const { setConsent, hasAnalyticsConsent } = await loadAnalytics("G-TEST123");

    setConsent("granted");

    expect(hasAnalyticsConsent()).toBe(true);
    expect(script()).not.toBeNull();
    expect(script().src).toContain("googletagmanager.com/gtag/js?id=G-TEST123");
    expect(script().async).toBe(true);
  });

  it("configura o GA4 com page_view manual apos o aceite", async () => {
    const { setConsent } = await loadAnalytics("G-TEST123");
    setConsent("granted");

    const config = calls().find((c) => c[0] === "config");
    expect(config).toBeDefined();
    expect(config[1]).toBe("G-TEST123");
    expect(config[2].send_page_view).toBe(false);
  });

  it("envia consent update 'granted' ao aceitar", async () => {
    const { setConsent } = await loadAnalytics("G-TEST123");
    setConsent("granted");

    const c = lastConsent();
    expect(c[1]).toBe("update");
    expect(c[2].analytics_storage).toBe("granted");
    expect(c[2].ad_storage).toBe("granted");
    expect(c[2].ad_user_data).toBe("granted");
    expect(c[2].ad_personalization).toBe("granted");
  });

  it("carrega o GA4 quando o aceite ja estava salvo", async () => {
    localStorage.setItem(CONSENT_KEY, "granted");
    const { initGA4, hasAnalyticsConsent } = await loadAnalytics("G-TEST123");

    initGA4();

    expect(hasAnalyticsConsent()).toBe(true);
    expect(script()).not.toBeNull();
    expect(lastConsent()[2].analytics_storage).toBe("granted");
  });

  it("setConsent('denied') revoga e interrompe o envio de eventos", async () => {
    const { setConsent, trackWhatsAppOpen } = await loadAnalytics("G-TEST123");
    setConsent("granted");
    setConsent("denied");

    expect(lastConsent()[2].analytics_storage).toBe("denied");

    const before = events("whatsapp_open").length;
    trackWhatsAppOpen("cotacao");
    expect(events("whatsapp_open")).toHaveLength(before);
  });

  it("nao envia eventos antes do consentimento", async () => {
    const { trackWhatsAppOpen } = await loadAnalytics("G-TEST123");
    trackWhatsAppOpen("cotacao");
    expect(window.dataLayer).toBeUndefined();
  });

  it("envia a conversao principal (whatsapp_open) apos o aceite", async () => {
    const { setConsent, trackWhatsAppOpen } = await loadAnalytics("G-TEST123");
    setConsent("granted");
    trackWhatsAppOpen("cotacao");

    expect(events("whatsapp_open").some((c) => c[2].context === "cotacao")).toBe(true);
  });

  it("envia quote_start, quote_submit e cta_click apos o aceite", async () => {
    const { setConsent, trackQuoteStart, trackQuoteSubmit, trackCtaClick } =
      await loadAnalytics("G-TEST123");
    setConsent("granted");

    trackQuoteStart();
    trackQuoteSubmit({ tipo: "saude" });
    trackCtaClick("cta_hero_principal", "#cotacao");

    expect(events("quote_start")).toHaveLength(1);
    expect(events("quote_submit")[0][2].tipo).toBe("saude");
    expect(events("cta_click")[0][2].cta).toBe("cta_hero_principal");
  });

  it("registra a page_view a cada troca de rota (SPA)", async () => {
    const { setConsent, trackPageView } = await loadAnalytics("G-TEST123");
    setConsent("granted");
    trackPageView("/privacidade");

    expect(
      calls().some((c) => c[0] === "config" && c[1] === "G-TEST123" && c[2].page_path === "/privacidade")
    ).toBe(true);
  });
});
