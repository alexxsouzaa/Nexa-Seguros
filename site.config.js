/* =========================================================
   Nexa Seguros - configuracao publica do site
   Fonte unica da URL canonica: usada pelo app (site.js),
   pelo index.html (%VITE_SITE_URL%) e pelos arquivos de SEO
   gerados no build (robots.txt / sitemap.xml).

   Para publicar em um dominio proprio, troque VITE_SITE_URL
   no arquivo .env (sem barra no final). Nada mais muda.
   ========================================================= */

export const DEFAULT_SITE_URL = "https://alexxsouzaa.github.io/Nexa-Seguros";

/* Rotas indexaveis (o /legal.html legado fica de fora de proposito). */
export const SITE_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/privacidade", changefreq: "monthly", priority: "0.4" },
  { path: "/termos", changefreq: "monthly", priority: "0.4" },
  { path: "/lgpd", changefreq: "monthly", priority: "0.4" },
];
