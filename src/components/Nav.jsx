import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Building2, Heart, ShieldCheck, Smile, ArrowRight, Calculator } from "lucide-react";
import { PRODUCT_LINKS, asset } from "../lib/site.js";

const ICONS = {
  saude: Heart,
  odonto: Smile,
  empresa: Building2,
  operadoras: ShieldCheck,
};

const DROP_DESC = {
  saude: "Cobertura médica para você e sua família.",
  odonto: "Planos odontológicos com rede credenciada.",
  empresa: "Seguro empresarial para proteger seu negócio.",
  operadoras: "Conheça as operadoras parceiras da Nexa.",
};

export default function Nav({ minimal = false }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mmProd, setMmProd] = useState(false);
  const dropRef = useRef(null);
  const dropTimer = useRef(null);
  const sheetRef = useRef(null);

  const openDrop = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setDrop(true);
  };
  const closeDrop = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    dropTimer.current = setTimeout(() => setDrop(false), 140);
  };

  useEffect(() => () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
  }, []);

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
              <div
                className="nav-drop"
                ref={dropRef}
                onMouseEnter={openDrop}
                onMouseLeave={closeDrop}
              >
                <button
                  type="button"
                  aria-expanded={drop}
                  aria-haspopup="true"
                  onClick={() => setDrop((v) => !v)}
                >
                  Produtos
                  <ChevronDown className="chev" />
                </button>
                {drop && (
                  <div className="nav-drop-panel">
                    <div className="dd-body">
                      <ul className="dd-list">
                        {PRODUCT_LINKS.map((p) => {
                          const Icon = ICONS[p.key];
                          return (
                            <li key={p.href}>
                              <Link
                                to={`/${p.href}`}
                                className="dd-item"
                                onClick={() => setDrop(false)}
                              >
                                <span className="dd-ic" aria-hidden="true">
                                  <Icon width={16} height={16} strokeWidth={1.8} />
                                </span>
                                <span className="dd-text">
                                  <span className="dd-name">{p.label}</span>
                                  <span className="dd-desc">{DROP_DESC[p.key] || ""}</span>
                                </span>
                                <ArrowRight className="dd-arrow" width={16} height={16} strokeWidth={2} aria-hidden="true" />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      <Link className="dd-aside" to="/#simulador" onClick={() => setDrop(false)}>
                        <span className="dd-aside-ic" aria-hidden="true">
                          <Calculator width={18} height={18} strokeWidth={1.8} />
                        </span>
                        <span className="dd-badge">Cotador</span>
                        <span className="dd-aside-title">Descubra o plano ideal em 1 minuto</span>
                        <span className="dd-aside-cta">
                          Ver o Cotador
                          <ArrowRight width={16} height={16} strokeWidth={2} aria-hidden="true" />
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/#precos" className="nav-link">Preços</Link>
              <Link to="/#duvidas" className="nav-link">Dúvidas</Link>
            </nav>
          )}

          <div className="nav-right">
            {!minimal && (
              <div className="nav-actions">
                <Link className="btn btn-primary" to="/#simulador">{minimal ? "Simular agora" : "Cotação gratuita"}</Link>
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
                    <Link key={p.href} to={`/${p.href}`} onClick={() => setOpen(false)} className="mm-link">
                      {p.label}
                    </Link>
                  ))}
                  <Link to="/privacidade" onClick={() => setOpen(false)} className="mm-link">Política de Privacidade</Link>
                  <Link to="/termos" onClick={() => setOpen(false)} className="mm-link">Termos de Uso</Link>
                  <Link to="/lgpd" onClick={() => setOpen(false)} className="mm-link">LGPD</Link>
                </div>
              )}
              <Link to="/#precos" onClick={() => setOpen(false)} className="mm-link">Preços</Link>
              <Link to="/#duvidas" onClick={() => setOpen(false)} className="mm-link">Dúvidas</Link>
              <div className="mm-actions">
                <Link className="btn btn-ghost" to="/#contato" onClick={() => setOpen(false)}>Entrar</Link>
                <Link className="btn btn-primary" to="/#simulador" onClick={() => setOpen(false)}>Criar conta grátis</Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
