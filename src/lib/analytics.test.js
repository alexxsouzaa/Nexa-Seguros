import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/* Recarrega o módulo com um GA4_ID controlado. */
function loadAnalytics(ga4Id) {
  vi.resetModules();
  vi.doMock("./site.js", () => ({ GA4_ID: ga4Id }));
  return import("./analytics.js");
}

/* Reproduz o que o index.html faz: cria o dataLayer e o gtag. */
function installGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
}

const calls = () => Array.from(window.dataLayer || []).map((a) => Array.from(a));
const lastConsent = () =>
  calls()
    .filter((c) => c[0] === "consent")
    .pop();

const CONSENT_KEY = "nexa_cookie_consent";

describe("analytics (GA4 + Consent Mode v2)", () => {
  beforeEach(() => {
    localStorage.clear();
    delete window.dataLayer;
    delete window.gtag;
  });

  afterEach(() => {
    vi.doUnmock("./site.js");
    vi.resetModules();
  });

  it("nao envia nada quando nao ha ID de medição", async () => {
    installGtag();
    const { initGA4, trackWhatsAppOpen } = await loadAnalytics("");
    initGA4();
    trackWhatsAppOpen("cotacao");

    expect(calls()).toHaveLength(0);
  });

  it("comeca em 'denied' quando o visitante ainda nao decidiu", async () => {
    installGtag();
    const { initGA4, hasAnalyticsConsent } = await loadAnalytics("G-TEST123");
    initGA4();

    expect(hasAnalyticsConsent()).toBe(false);
    const c = lastConsent();
    expect(c[1]).toBe("update");
    expect(c[2].analytics_storage).toBe("denied");
    expect(c[2].ad_storage).toBe("denied");
    expect(c[2].ad_user_data).toBe("denied");
    expect(c[2].ad_personalization).toBe("denied");
  });

  it("libera o GA4 quando o visitante ja havia aceitado", async () => {
    installGtag();
    const { initGA4, hasAnalyticsConsent } = await loadAnalytics("G-TEST123");
    localStorage.setItem(CONSENT_KEY, "granted");
    initGA4();

    expect(hasAnalyticsConsent()).toBe(true);
    expect(lastConsent()[2].analytics_storage).toBe("granted");
  });

  it("setConsent('granted') atualiza o consentimento na hora", async () => {
    installGtag();
    const { initGA4, setConsent, hasAnalyticsConsent } = await loadAnalytics("G-TEST123");
    initGA4();
    expect(hasAnalyticsConsent()).toBe(false);

    setConsent("granted");
    expect(hasAnalyticsConsent()).toBe(true);
    expect(lastConsent()[2].analytics_storage).toBe("granted");
  });

  it("setConsent('denied') revoga o consentimento", async () => {
    installGtag();
    const { initGA4, setConsent } = await loadAnalytics("G-TEST123");
    localStorage.setItem(CONSENT_KEY, "granted");
    initGA4();

    setConsent("denied");
    expect(lastConsent()[2].analytics_storage).toBe("denied");
  });

  it("nao envia eventos antes do initGA4", async () => {
    installGtag();
    const { trackWhatsAppOpen } = await loadAnalytics("G-TEST123");
    trackWhatsAppOpen("cotacao");

    expect(calls()).toHaveLength(0);
  });

  it("envia a conversão principal (whatsapp_open) para o dataLayer", async () => {
    installGtag();
    const { initGA4, trackWhatsAppOpen } = await loadAnalytics("G-TEST123");
    initGA4();
    trackWhatsAppOpen("cotacao");

    expect(
      calls().some(
        (c) => c[0] === "event" && c[1] === "whatsapp_open" && c[2].context === "cotacao"
      )
    ).toBe(true);
  });

  it("envia quote_start, quote_submit e cta_click para o dataLayer", async () => {
    installGtag();
    const { initGA4, trackQuoteStart, trackQuoteSubmit, trackCtaClick } =
      await loadAnalytics("G-TEST123");
    initGA4();

    trackQuoteStart();
    trackQuoteSubmit({ tipo: "saude" });
    trackCtaClick("cta_hero_principal", "#cotacao");

    const c = calls();
    expect(c.some((x) => x[0] === "event" && x[1] === "quote_start")).toBe(true);
    expect(
      c.some((x) => x[0] === "event" && x[1] === "quote_submit" && x[2].tipo === "saude")
    ).toBe(true);
    expect(
      c.some((x) => x[0] === "event" && x[1] === "cta_click" && x[2].cta === "cta_hero_principal")
    ).toBe(true);
  });

  it("registra a page_view a cada troca de rota (SPA)", async () => {
    installGtag();
    const { initGA4, trackPageView } = await loadAnalytics("G-TEST123");
    initGA4();
    trackPageView("/privacidade");

    expect(
      calls().some(
        (c) => c[0] === "config" && c[1] === "G-TEST123" && c[2].page_path === "/privacidade"
      )
    ).toBe(true);
  });
});
