import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Simulator from "../sections/Simulator.jsx";

vi.mock("../lib/analytics.js", () => ({
  trackQuoteStart: vi.fn(),
  trackQuoteSubmit: vi.fn(),
  trackCtaClick: vi.fn(),
  trackWhatsAppOpen: vi.fn(),
}));

vi.mock("../sections/Simulator.jsx", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../sections/Simulator.jsx")>();
  return {
    ...actual,
    useFrameScale: vi.fn(),
  };
});

describe("Simulator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza o formulário de cotação com todos os campos obrigatórios", () => {
    render(<Simulator />);
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantidade de pessoas beneficiárias/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Idade do titular/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Quero receber opções/i })).toBeInTheDocument();
  });

  it("não envia o formulário sem preencher campos obrigatórios", () => {
    const { trackQuoteSubmit } = vi.importMock("../lib/analytics.js");
    render(<Simulator />);
    const button = screen.getByRole("button", { name: /Quero receber opções/i });
    fireEvent.click(button);
    // Nenhum envio deve acontecer: trackQuoteSubmit não chamado
    expect(trackQuoteSubmit).not.toHaveBeenCalled();
    // Mensagem de erro deve aparecer
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("marca campos inválidos com aria-invalid", () => {
    render(<Simulator />);
    const button = screen.getByRole("button", { name: /Quero receber opções/i });
    fireEvent.click(button);
    const nomeInput = screen.getByLabelText(/Nome/i);
    expect(nomeInput).toHaveAttribute("aria-invalid", "true");
  });
});
