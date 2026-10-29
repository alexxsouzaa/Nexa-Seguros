import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ChevronDown, Building2, Heart, ShieldCheck, Smile, ArrowRight, Calculator, MessageCircle } from "lucide-react";
import { PRODUCT_LINKS, asset, waLink, WA_CTA_TEXT } from "../lib/site.js";

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

const MOBILE_LEGAL = [
  { label: "Privacidade", to: "/privacidade" },
  { label: "Termos", to: "/termos" },
  { label: "LGPD", to: "/lgpd" },
];

export default function Nav({ minimal = false }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mmProd, setMmProd] = useState(false);
  const { pathname, hash } = useLocation();
  const dropRef = useRef(null);
  const dropTimer = useRef(null);
  const sheetRef = useRef(null);

  const closeMenu = () => {
    setOpen(false);
    setMmProd(false);
  };
  const onHome = pathname === "/";

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
        if (open) closeMenu();
        setDrop(false);
      }
    }
    function onClick(e) {
      if (drop && dropRef.current && !dropRef.current.contains(e.target)) setDrop(false);
    }
    function onResize() {
      if (window.innerWidth > 767) closeMenu();
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
    if (minimal || !open) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let isTracking = false;
    const onTouchStart = (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      dx = 0;
      isTracking = true;
      sheet.style.transition = "none";
    };
    const onTouchMove = (e) => {
      if (!isTracking) return;
      const t = e.touches[0];
      dx = t.clientX - startX;
      const dy = Math.abs(t.clientY - startY);
      if (dx < -10 && dy < 80) {
        sheet.style.transform = `translateX(${Math.max(dx, -160)}px)`;
      }
    };
    const onTouchEnd = () => {
      isTracking = false;
      sheet.style.transition = "";
      sheet.style.transform = "";
      if (dx < -70) closeMenu();
    };
    sheet.addEventListener("touchstart", onTouchStart, { passive: true });
    sheet.addEventListener("touchmove", onTouchMove, { passive: true });
    sheet.addEventListener("touchend", onTouchEnd);
    return () => {
      sheet.removeEventListener("touchstart", onTouchStart);
      sheet.removeEventListener("touchmove", onTouchMove);
      sheet.removeEventListener("touchend", onTouchEnd);
    };
  }, [minimal, open]);

  useEffect(() => {
    if (minimal || !open) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    const focusable = Array.from(sheet.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute("disabled"));
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const prev = document.activeElement;
    try { first.focus(); } catch {}
    function onKey(e) {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey, { passive: false });
    return () => {
      document.removeEventListener("keydown", onKey, { passive: false });
      try { if (prev && typeof prev.focus === "function") prev.focus(); } catch {}
    };
  }, [open, minimal]);

  /* Fecha o menu ao clicar em qualquer link interno ou fora do sheet. */
  useEffect(() => {
    if (minimal || !open) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    function onClick(e) {
      const target = e.target;
      if (target === sheet || target === document.querySelector(".sheet-backdrop")) {
        closeMenu();
        return;
      }
      const link = target.closest("a.mm-link, .sheet-close");
      if (link) {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          /* Clica em ancoragem: fecha o menu e rola a página */
          closeMenu();
          return;
        }
        /* Links normais: fecha o menu */
        closeMenu();
        return;
      }
      /* Clica fora de tudo dentro do menu: fecha */
      closeMenu();
    }
    document.addEventListener("click", onClick, { passive: false });
    return () => document.removeEventListener("click", onClick, { passive: false });
  }, [open, minimal]);

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
              fetchpriority="high"
            />
          </Link>

          {!minimal && (
            <nav className="nav-links" aria-label="Principal">
              <NavLink to="/" className={({isActive}) => isActive && window.location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Início</NavLink>
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
                <Link className="btn btn-primary" to="/#simulador">Cotação gratuita</Link>
              </div>
            )}
            {!minimal && (
              <Link className="btn btn-primary nav-cta-m" to="/#simulador">Cotação</Link>
            )}
            {!minimal && (
              <button
                className="nav-burger"
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                aria-controls="mobileSheet"
                aria-haspopup="dialog"
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
          <div ref={sheetRef} className="sheet" id="mobileSheet" role="dialog" aria-modal="true" aria-label="Menu principal">
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
                    <Link key={p.href} to={`/${p.href}`} onClick={closeMenu} className="mm-link">
                      {p.label}
                    </Link>
                  ))}
                  <Link to="/privacidade" onClick={closeMenu} className="mm-link">Política de Privacidade</Link>
                  <Link to="/termos" onClick={closeMenu} className="mm-link">Termos de Uso</Link>
                  <Link to="/lgpd" onClick={closeMenu} className="mm-link">LGPD</Link>
                </div>
              )}
              <Link to="/#precos" onClick={() => setOpen(false)} className="mm-link">Preços</Link>
              <Link to="/#duvidas" onClick={() => setOpen(false)} className="mm-link">Dúvidas</Link>
              <div className="mm-actions">
                <Link className="btn btn-ghost" to="/#contato" onClick={() => setOpen(false)}>Falar no WhatsApp</Link>
                <Link className="btn btn-primary" to="/#simulador" onClick={() => setOpen(false)}>Cotação gratuita</Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
