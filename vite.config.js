import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* Gera também dist/legal.html (cópia do index.html) para que a página
   funcione em qualquer hospedagem estática, sem rewrite de rotas. */
function legalStaticPage() {
  return {
    name: "nexa-legal-static-page",
    closeBundle() {
      const dist = fileURLToPath(new URL("./dist/", import.meta.url));
      copyFileSync(dist + "index.html", dist + "legal.html");
    }
  };
}

export default defineConfig({
  plugins: [react(), legalStaticPage()],
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
    open: false,
  },
});
