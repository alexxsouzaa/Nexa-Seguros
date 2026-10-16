import { useEffect, useRef, useState } from "react";
import { ChevronDown, Building2, Heart, ShieldCheck, Smile, Moon, Sun } from "lucide-react";
import { PRODUCT_LINKS, asset } from "../lib/site.js";

const ICONS = {
  saude: Heart,
  odonto: Smile,
  empresa: Building2,
  operadoras: ShieldCheck,
};

export default function Nav({ minimal = false }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mmProd, setMmProd] = useState(false);
  const [theme, setTheme] = useState("light");
  const dropRef = useRef(null);

  useEffect(() => {
    if (minimal) return;
    const nav = document.getElementById("nav");
    if (!nav) return;
    const onScroll = () => {
      const on = window.scrollY > 8;
      nav.classList.toggle("scrolled", on);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [minimal]);

  useEffect(() => {
    const stored = localStorage.getItem("nexa-theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const next = stored || prefers;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.setAttribute("color-scheme", next);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("color-scheme", theme);
    localStorage.setItem("nexa-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    if (minimal) return;
    function onKey(e) {
      if (e.key === "Escape") {
        if (open) setOpen(false);
        setDrop(false);
      }
    }
    function onClick(e) {
      if (drop && dropRef.current && !dropRef.current.contains(e.target)) setDrop(false);
    }
    function onResize() {
      if (window.innerWidth > 767) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [open, drop, minimal]);

  useEffect(() => {
    if (minimal) return;
    const body = document.body;
    if (!open) {
      body.style.overflow = "";
      return;
    }
    body.style.overflow = "hidden";
    return () => { body.style.overflow = ""; };
  }, [open, minimal]);

  return (
    <>
      <header className="nav" id="nav">
        <div className="nav-inner">
          <a className="brand" href={minimal ? "/" : "#inicio"} aria-label="Nexa Seguros, início">
            <img
              className="brand-logo"
              src={asset("/logo_light.png")}
              alt="Nexa Seguros"
              width="400"
              height="214"
            />
          </a>

          {!minimal && (
            <nav className="nav-links" aria-label="Principal">
              <a href="#inicio">Início</a>
              <div className="nav-drop" ref={dropRef}>
                <button
                  type="button"
                  aria-expanded={drop}
                  aria-haspopup="true"
                  onMouseEnter={() => setDrop(true)}
                  onMouseLeave={() => setDrop(false)}
                  onClick={() => setDrop((v) => !v)}
                >
                  Produtos
                  <ChevronDown className="chev" />
                </button>
                {drop && (
                  <div className="nav-drop-panel" role="menu">
                    {PRODUCT_LINKS.map((p) => {
                      const Icon = ICONS[p.key] || Heart;
                      return (
                        <a key={p.href} href={p.href} role="menuitem" onClick={() => setDrop(false)}>
                          <span className="dd-ic" aria-hidden="true">
                            <Icon width={18} height={18} strokeWidth={1.8} />
                          </span>
                          <span>
                            <strong>{p.label}</strong>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
              <a href="#precos">Preços</a>
              <a href="#duvidas">Dúvidas</a>
            </nav>
          )}

          <div className="nav-right">
            {!minimal && (
              <div className="nav-actions">
                <button
                  type="button"
                  className="btn btn-ghost theme-toggle"
                  onClick={toggleTheme}
                  aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
                >
                  {theme === "light" ? (
                    <Moon width={18} height={18} strokeWidth={1.8} />
                  ) : (
                    <Sun width={18} height={18} strokeWidth={1.8} />
                  )}
                </button>
                <a className="btn btn-primary" href="#simulador">{minimal ? "Simular agora" : "Criar conta grátis"}</a>
              </div>
            )}
            {!minimal && (
              <button
                className="nav-burger"
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                aria-controls="mobileSheet"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" color="currentColor" aria-hidden="true">
                  <path d="M4 5L16 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M4 12L20 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d="M4 19L12 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {!minimal && open && (
        <>
          <div className="sheet-backdrop" onClick={() => setOpen(false)} />
          <div className="sheet" id="mobileSheet" role="dialog" aria-modal="true">
            <div className="sheet-head">
              <img className="brand-logo" src={asset("/logo_light.png")} alt="Nexa Seguros" width="400" height="214" />
              <button className="sheet-close" onClick={() => setOpen(false)} aria-label="Fechar menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav aria-label="Navegação móvel">
              <a href="#inicio" onClick={() => setOpen(false)}>Início</a>
              <button type="button" className="mm-btn" aria-expanded={mmProd} onClick={() => setMmProd((v) => !v)}>
                Produtos
                <ChevronDown style={{ width: "14px", height: "14px", transform: mmProd ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
              </button>
              {mmProd && (
                <div className="mm-sub">
                  {PRODUCT_LINKS.map((p) => (
                    <a key={p.href} href={p.href} onClick={() => setOpen(false)}>
                      {p.label}
                    </a>
                  ))}
                </div>
              )}
              <a href="#precos" onClick={() => setOpen(false)}>Preços</a>
              <a href="#duvidas" onClick={() => setOpen(false)}>Dúvidas</a>
              <div className="mm-actions">
                <button type="button" className="btn btn-ghost theme-toggle" onClick={toggleTheme} aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}>
                  {theme === "light" ? "Tema escuro" : "Tema claro"}
                </button>
                <a className="btn btn-ghost" href="#contato" onClick={() => setOpen(false)}>Entrar</a>
                <a className="btn btn-primary" href="#simulador" onClick={() => setOpen(false)}>Criar conta grátis</a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
