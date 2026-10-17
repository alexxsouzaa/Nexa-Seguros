import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "../sections/Hero.jsx";

vi.mock("../lib/analytics.js", () => ({
  trackCtaClick: vi.fn(),
  trackWhatsAppOpen: vi.fn(),
}));

describe("Hero", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o H1 com a proposta de valor", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain(
      "O plano de saúde certo para você, sua família ou empresa."
    );
  });

  it("renderiza o CTA de cotação gratuita apontando para #cotacao", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /Solicitar cotação gratuita/i });
    expect(link).toHaveAttribute("href", "#cotacao");
  });

  it("renderiza o botão WhatsApp", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /Falar no WhatsApp/i });
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("chama trackCtaClick ao clicar no CTA de cotação", () => {
    const { trackCtaClick } = vi.importMock("../lib/analytics.js");
    render(<Hero />);
    const link = screen.getByRole("link", { name: /Solicitar cotação gratuita/i });
    fireEvent.click(link);
    expect(trackCtaClick).toHaveBeenCalledWith("cta_hero_principal", "#cotacao");
  });
});
