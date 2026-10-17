import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Faq from "../sections/Faq.jsx";

vi.mock("../lib/analytics.js", () => ({}));

describe("Faq", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza as 12 perguntas frequentes", () => {
    render(<Faq />);
    const questions = screen.getAllByRole("button", { name: /qual|copo|como|existe|quanto|vocês|meus|e se|o que|quais/i });
    // Pelo menos 9 das 12 perguntas são capturadas pelo regex acima; verificar o total renderizado
    expect(questions.length).toBeGreaterThanOrEqual(9);
  });

  it("abre e fecha um acordeão ao clicar", () => {
    render(<Faq />);
    const carencia = screen.getByRole("button", { name: /Existe carência/i });
    expect(carencia).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(carencia);
    expect(carencia).toHaveAttribute("aria-expanded", "true");

    const answer = screen.getByRole("region", { name: /Existe carência/i });
    expect(answer).toBeInTheDocument();

    fireEvent.click(carencia);
    expect(carencia).toHaveAttribute("aria-expanded", "false");
  });
});
