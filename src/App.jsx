import { lazy, Suspense, useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Privacidade from "./pages/Privacidade.jsx";
import Termos from "./pages/Termos.jsx";
import Lgpd from "./pages/Lgpd.jsx";
import CookieConsent from "./components/CookieConsent.jsx";
import { trackPageView } from "./lib/analytics.js";

const Legal = lazy(() => import("./pages/Legal.jsx"));

/* Registra uma page_view do GA4 a cada troca de rota (SPA). */
function PageViewTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    trackPageView(pathname + search);
  }, [pathname, search]);

  return null;
}

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    let cancelled = false;
    let tries = 0;
    let timer;

    const focusHash = () => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const el = document.getElementById(id);
      if (!el) {
        /* Rota com lazy chunk: o alvo ainda pode não estar no DOM. */
        if (!cancelled && tries++ < 60) timer = setTimeout(focusHash, 50);
        return;
      }
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.focus({ preventScroll: true });
    };

    if (hash) {
      focusHash();
    } else if (!first.current) {
      window.scrollTo(0, 0);
      const main = document.getElementById("conteudo");
      if (main) main.focus({ preventScroll: true });
    }

    first.current = false;
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <PageViewTracker />
        <ScrollManager />
        <CookieConsent />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home viewTransition />} />
          <Route path="/legal" element={<Legal viewTransition />} />
          <Route path="/legal.html" element={<Legal viewTransition />} />
          <Route path="/privacidade" element={<Privacidade viewTransition />} />
          <Route path="/termos" element={<Termos viewTransition />} />
          <Route path="/lgpd" element={<Lgpd viewTransition />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
