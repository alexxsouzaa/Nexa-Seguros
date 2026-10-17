import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Building2, Heart, ShieldCheck, Smile } from "lucide-react";
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
  const dropRef = useRef(null);
  const sheetRef = useRef(null);

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

  useEffect(() => {
    if (minimal) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    let startX = 0;
    let startY = 0;
    let isTracking = false;
    const onTouchStart = (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      isTracking = true;
    };
    const onTouchMove = (e) => {
      if (!isTracking) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = Math.abs(t.clientY - startY);
      if (dx < -30 && dy < 80) {
        sheet.style.transform = `translateX(${Math.max(dx, -120)}px)`;
        sheet.style.transition = "none";
      }
    };
    const onTouchEnd = () => {
      isTracking = false;
      sheet.style.transition = "";
      sheet.style.transform = "";
    };
    sheet.addEventListener("touchstart", onTouchStart, { passive: true });
    sheet.addEventListener("touchmove", onTouchMove, { passive: true });
    sheet.addEventListener("touchend", onTouchEnd);
    return () => {
      sheet.removeEventListener("touchstart", onTouchStart);
      sheet.removeEventListener("touchmove", onTouchMove);
      sheet.removeEventListener("touchend", onTouchEnd);
    };
  }, [minimal]);

  return (
    <>
      <header className="nav" id="nav">
        <div className="nav-inner">
          <Link to="/" className="brand" aria-label="Nexa Seguros, início">
              <img
                className="brand-logo"
                src={asset("/logo_light.png")}
                alt="Nexa Seguros"
                width="400"
                height="214"
                decoding="async"
              />
            </Link>

          {!minimal && (
            <nav className="nav-links" aria-label="Principal">
              <Link to="/" className="nav-link">Início</Link>
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
                    {PRODUCT_LINKS.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        role="menuitem"
                        onClick={() => setDrop(false)}
                      >
                        <span className="dd-ic" aria-hidden="true">
                          <Icon width={18} height={18} strokeWidth={1.8} />
                        </span>
                        <span>
                          <strong>{p.label}</strong>
                        </span>
                      </a>
                    ))}
                    <div style={{ borderTop: "1px solid var(--border-soft)", marginTop: 8, paddingTop: 8 }} />
                    <Link to="/privacidade" role="menuitem" onClick={() => setDrop(false)}>
                      <span className="dd-ic" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--brand-text)" }}><path d="M8 8h12v12H8z" /><path d="M8 8L12 12" /><path d="M12 12L16 8" /></svg>
                      </span>
                      <span>Política de Privacidade</span>
                    </Link>
                    <Link to="/termos" role="menuitem" onClick={() => setDrop(false)}>
                      <span className="dd-ic" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--brand-text)" }}><path d="M8 8h12v12H8z" /><path d="M8 8L12 12" /><path d="M12 12L16 8" /></svg>
                      </span>
                      <span>Termos de Uso</span>
                    </Link>
                    <Link to="/lgpd" role="menuitem" onClick={() => setDrop(false)}>
                      <span className="dd-ic" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--brand-text)" }}><path d="M8 8h12v12H8z" /><path d="M8 8L12 12" /><path d="M12 12L16 8" /></svg>
                      </span>
                      <span>LGPD</span>
                    </Link>
                  </div>
                )}
              </div>
              <a href="#precos" className="nav-link">Preços</a>
              <a href="#duvidas" className="nav-link">Dúvidas</a>
            </nav>
          )}

          <div className="nav-right">
            {!minimal && (
              <div className="nav-actions">
                <a className="btn btn-primary" href="#simulador">{minimal ? "Simular agora" : "Cotação gratuita"}</a>
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
          <div ref={sheetRef} className="sheet" id="mobileSheet" role="dialog" aria-modal="true">
            <div className="sheet-head">
              <img className="brand-logo" src={asset("/logo_light.png")} alt="Nexa Seguros" width="400" height="214" decoding="async" />
              <button className="sheet-close" onClick={() => setOpen(false)} aria-label="Fechar menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav aria-label="Navegação móvel">
              <Link to="/" onClick={() => setOpen(false)} className="mm-link">Início</Link>
              <button type="button" className="mm-btn" aria-expanded={mmProd} onClick={() => setMmProd((v) => !v)}>
                Produtos
                <ChevronDown style={{ width: "14px", height: "14px", transform: mmProd ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
              </button>
              {mmProd && (
                <div className="mm-sub">
                  {PRODUCT_LINKS.map((p) => (
                    <a key={p.href} href={p.href} onClick={() => setOpen(false)} className="mm-link">
                      {p.label}
                    </a>
                  ))}
                  <Link to="/privacidade" onClick={() => setOpen(false)} className="mm-link">Política de Privacidade</Link>
                  <Link to="/termos" onClick={() => setOpen(false)} className="mm-link">Termos de Uso</Link>
                  <Link to="/lgpd" onClick={() => setOpen(false)} className="mm-link">LGPD</Link>
                </div>
              )}
              <a href="#precos" onClick={() => setOpen(false)} className="mm-link">Preços</a>
              <a href="#duvidas" onClick={() => setOpen(false)} className="mm-link">Dúvidas</a>
              <div className="mm-actions">
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
