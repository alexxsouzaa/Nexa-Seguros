import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Termos from "./Termos.jsx";
import Privacidade from "./Privacidade.jsx";
import Lgpd from "./Lgpd.jsx";

function renderPage(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("Paginas legais (layout replicado do Koter)", () => {
  it.each([
    ["Termos", Termos, /termos de uso/i, 6],
    ["Privacidade", Privacidade, /privacidade/i, 8],
    ["Lgpd", Lgpd, /lgpd/i, 5],
  ])("%s: hero + secoes numeradas + rodape", (_nome, Page, h1, secoes) => {
    renderPage(<Page />);

    // Hero centralizado do Koter
    expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeInTheDocument();
    expect(document.querySelector(".legal-hero > .container")).toBeInTheDocument();
    expect(document.querySelector(".legal-meta")).toBeInTheDocument();

    // Coluna de secoes com borda superior
    expect(document.querySelectorAll(".legal-section").length).toBe(secoes);
    document.querySelectorAll(".legal-section").forEach((s) => {
      expect(s.querySelector(":scope > .container")).toBeInTheDocument();
      expect(s.querySelector("h2")).toBeInTheDocument();
    });

    // Navbar completo (igual a Home e ao Koter)
    expect(document.querySelector(".nav-links")).toBeInTheDocument();
    expect(document.querySelectorAll(".nav-links .nav-link").length).toBe(3);
    expect(document.querySelector(".nav-drop")).toBeInTheDocument();
    expect(document.querySelector(".nav-actions")).toBeInTheDocument();
    expect(document.querySelector(".nav-burger")).toBeInTheDocument();

    // Rodape (novo nestas paginas) e alvo do "Voltar ao topo"
    expect(document.querySelector(".footer")).toBeInTheDocument();
    expect(document.querySelector(".to-top")).toHaveAttribute("href", "#inicio");
    expect(document.getElementById("inicio")).toBeInTheDocument();
  });

  it("o alvo #inicio fica antes do conteudo, dentro do main", () => {
    renderPage(<Termos />);
    const main = document.getElementById("conteudo");
    const alvo = document.getElementById("inicio");
    expect(main.contains(alvo)).toBe(true);
    expect(main.firstElementChild).toBe(alvo);
  });
});
