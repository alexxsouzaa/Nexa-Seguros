import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { DEFAULT_SITE_URL, SITE_ROUTES } from "./site.config.js";

/* Gera robots.txt e sitemap.xml a partir da URL publica configurada.
 * Mantem uma unica fonte de verdade (VITE_SITE_URL) para canonical/OG/SEO. */
function seoFiles(siteUrl) {
  const base = siteUrl.replace(/\/+$/, "");
  const lastmod = new Date().toISOString().slice(0, 10);

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...SITE_ROUTES.map((route) => {
      const loc = base + route.path;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changefreq}</changefreq>`,
        `    <priority>${route.priority}</priority>`,
        `    <xhtml:link rel="alternate" hreflang="pt-BR" href="${loc}" />`,
        "  </url>",
      ].join("\n");
    }),
    "</urlset>",
    "",
  ].join("\n");

  const robots = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${base}/sitemap.xml`,
    "",
  ].join("\n");

  return {
    name: "nexa-seo-files",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

  return {
    plugins: [react(), seoFiles(siteUrl)],
    server: {
      port: 5173,
      open: false,
    },
    preview: {
      port: 4173,
      open: false,
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/test/setup.js",
      include: ["src/**/*.test.{js,jsx}"],
    },
  };
});
