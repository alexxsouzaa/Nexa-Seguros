import { describe, it, expect, beforeEach } from "vitest";
import { REVIEWS, getRotatingReviews, getVisitorSeed } from "./reviews.js";

function clearCookies() {
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name) document.cookie = name + "=; max-age=0; path=/";
  });
}

describe("reviews (depoimentos)", () => {
  beforeEach(() => {
    clearCookies();
  });

  it("nao grava cookie de visitante (LGPD)", () => {
    getVisitorSeed();
    getRotatingReviews(12);

    expect(document.cookie).not.toMatch(/nexa_rv/);
    expect(document.cookie).toBe("");
  });

  it("mantem a mesma semente durante a sessao", () => {
    const first = getVisitorSeed();
    expect(getVisitorSeed()).toBe(first);
  });

  it("retorna a quantidade pedida sem repetir depoimentos", () => {
    const list = getRotatingReviews(12);
    expect(list).toHaveLength(12);
    expect(new Set(list.map((r) => r.name)).size).toBe(12);
  });

  it("nunca retorna mais itens do que o acervo disponivel", () => {
    expect(getRotatingReviews(999)).toHaveLength(REVIEWS.length);
  });

  it("embaralha de forma estavel para a mesma hora", () => {
    const now = new Date("2026-10-29T12:00:00Z");
    const a = getRotatingReviews(12, now).map((r) => r.name);
    const b = getRotatingReviews(12, now).map((r) => r.name);
    expect(a).toEqual(b);
  });
});
