import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("../lib/analytics.js", () => ({
  getConsent: vi.fn(),
  setConsent: vi.fn(),
  initGA4: vi.fn(),
  CONSENT_EVENT: "nexa:cookies",
}));

import CookieConsent from "./CookieConsent.jsx";
import { getConsent, setConsent, initGA4 } from "../lib/analytics.js";

const renderBanner = () =>
  render(
    <MemoryRouter>
      <CookieConsent />
    </MemoryRouter>
  );

describe("CookieConsent (banner de cookies - LGPD)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("nao exibe o banner quando ja ha decisao registrada", () => {
    getConsent.mockReturnValue("granted");
    renderBanner();
    expect(screen.queryByText(/cookies e privacidade/i)).toBeNull();
  });

  it("exibe o banner quando ainda nao ha decisao", () => {
    getConsent.mockReturnValue(null);
    renderBanner();
    expect(screen.getByText(/cookies e privacidade/i)).toBeInTheDocument();
  });

  it("registra a recusa e NAO inicializa o GA4", () => {
    getConsent.mockReturnValue(null);
    renderBanner();

    fireEvent.click(screen.getByRole("button", { name: /s[oó] essenciais/i }));

    expect(setConsent).toHaveBeenCalledWith("denied");
    expect(initGA4).not.toHaveBeenCalled();
  });

  it("registra o aceite e inicializa o GA4", () => {
    getConsent.mockReturnValue(null);
    renderBanner();

    fireEvent.click(screen.getByRole("button", { name: /aceitar medi[cç][aã]o/i }));

    expect(setConsent).toHaveBeenCalledWith("granted");
    expect(initGA4).toHaveBeenCalledTimes(1);
  });

  it("esconde o banner apos a decisao", () => {
    getConsent.mockReturnValue(null);
    renderBanner();

    fireEvent.click(screen.getByRole("button", { name: /aceitar medi[cç][aã]o/i }));

    expect(screen.queryByText(/cookies e privacidade/i)).toBeNull();
  });

  it("link de saiba mais aponta para a politica de privacidade", () => {
    getConsent.mockReturnValue(null);
    renderBanner();

    expect(
      screen.getByRole("link", { name: /saiba como tratamos seus dados/i })
    ).toHaveAttribute("href", "/privacidade");
  });

  it("reabre o banner quando o rodape pede as preferencias (revogacao)", () => {
    getConsent.mockReturnValue("granted");
    renderBanner();
    expect(screen.queryByText(/cookies e privacidade/i)).toBeNull();

    fireEvent(window, new Event("nexa:cookies"));

    expect(screen.getByText(/cookies e privacidade/i)).toBeInTheDocument();
  });
});
