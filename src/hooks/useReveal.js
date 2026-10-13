import { useEffect } from "react";

/* Reveals (.r -> .v) com IntersectionObserver e stagger de 80ms.
   Respeita prefers-reduced-motion. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".r"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("v"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add("v"), i * 80);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => {
      if (!el.classList.contains("v")) io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}
