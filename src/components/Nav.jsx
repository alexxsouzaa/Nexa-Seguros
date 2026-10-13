import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../lib/site.js";

export default function Nav({ minimal = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(Boolean(minimal));
  const burgerRef = useRef(null);

  /* Navbar transparente no topo e sólida ao rolar: IntersectionObserver no #navSentinel.
     Na página legal (sem sentinel) a nav permanece sólida. */
  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav || minimal) return;

    const sentinel = document.getElementById("navSentinel");
    if (!sentinel || !("IntersectionObserver" in window)) {
      nav.classList.add("scrolled");
      setScrolled(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const onScroll = !entries[0].isIntersecting;
        nav.classList.toggle("scrolled", onScroll);
        setScrolled(onScroll);
      },
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [minimal]);

  /* Seção ativa: destaca o link do menu correspondente. */
  useEffect(() => {
    if (minimal) return;
    const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
    const targets = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          links.forEach((a) => {
            const on = a.getAttribute("href") === id;
            a.classList.toggle("active", on);
            if (on) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [minimal]);

  /* Menu mobile */
  useEffect(() => {
    if (minimal) return;

    function onKey(e) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        if (burgerRef.current) burgerRef.current.focus();
      }
    }
    function onResize() {
      if (window.innerWidth > 1080) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, minimal]);

  /* Menu aberto: trava o scroll da página atrás do painel. */
  useEffect(() => {
    if (minimal) return;
    const body = document.body;
    if (!open) {
      body.style.overflow = "";
      body.style.paddingRight = "";
      return;
    }
    const sw = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (sw > 0) body.style.paddingRight = sw + "px";
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [open, minimal]);

  const ids = minimal
    ? { nav: "navbar-legal", logo: "logo-legal", cta: "nav-cta-legal" }
    : { nav: "navbar", logo: "logo", cta: "nav-cta" };

  return (
    <>
      {!minimal && <div id="navSentinel" aria-hidden="true" />}

      <header
        className={minimal ? "nav scrolled" : "nav"}
        id="nav"
        data-od-id={ids.nav}
      >
        <div className="nav-inner container">
          <a
            className="brand"
            href={minimal ? "/" : "#inicio"}
            aria-label="Nexa Seguros, início"
            data-od-id={ids.logo}
          >
            <img
              className="brand-logo"
              src={scrolled ? "/logo_light.png" : "/logo_dark.png"}
              alt="Nexa Seguros"
              width="400"
              height="214"
            />
          </a>

          {!minimal && (
            <nav className="nav-links" aria-label="Navegação principal">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          <div className="nav-actions">
            <a
              className="btn btn-primary nav-cta"
              href={minimal ? "/#simulador" : "#simulador"}
              data-od-id={ids.cta}
            >
              Pedir cotação
            </a>

            {!minimal && (
              <button
                ref={burgerRef}
                className="nav-burger"
                type="button"
                id="navBurger"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                aria-controls="mobileMenu"
                data-od-id="menu-hamburger"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
        </div>
      </header>

      {!minimal && (
        <div className="mobile-menu" id="mobileMenu" hidden={!open}>
          <nav aria-label="Navegação móvel">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <a className="btn btn-primary" href="#simulador" onClick={() => setOpen(false)}>
              Pedir cotação
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
