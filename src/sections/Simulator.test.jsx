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
  const actual = await importOriginal();
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

  it("não envia o formulário sem preencher campos obrigatórios", async () => {
    const analytics = await vi.importMock("../lib/analytics.js");
    const { trackQuoteSubmit } = analytics;
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

  it("abre a confirmação com foco no título e fecha com Escape", () => {
    render(<Simulator />);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText(/WhatsApp/i), { target: { value: "71999999999" } });
    fireEvent.change(screen.getByLabelText(/Cidade/i), { target: { value: "Camaçari" } });
    fireEvent.change(screen.getByLabelText(/Quantidade de pessoas beneficiárias/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/Idade do titular/i), { target: { value: "34" } });
    fireEvent.click(screen.getByLabelText("Saúde"));
    fireEvent.click(screen.getByLabelText("Individual/Familiar"));

    fireEvent.click(screen.getByRole("button", { name: /Quero receber opções/i }));

    const dialog = screen.getByRole("dialog", { name: /Confira antes de enviar/i });
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(dialog).toHaveTextContent("Ana");
    expect(document.activeElement).toBe(screen.getByText(/Confira antes de enviar/i));

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: /Quero receber opções/i })
    );
  });
});
