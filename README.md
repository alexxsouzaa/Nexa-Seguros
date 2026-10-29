# Nexa Seguros

Site institucional da **Nexa Seguros** (assessoria em planos de saúde e odontológicos na Bahia). Fiel ao layout original, com foco em conversão para cotação via WhatsApp e conformidade com LGPD.

## Tecnologias

- [Vite 8](https://vitejs.dev/) + [React 19](https://react.dev/) + [React Router DOM 7](https://reactrouter.com/)
- [Tailwind-like CSS custom](src/styles.css) com CSS Variables e Lightning CSS
- [Lucide React](https://lucide.dev/)
- [@fontsource/poppins](https://fontsource.org/fonts/poppins)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- Google Analytics 4 com Consent Mode v2 (LGPD)

## Scripts

```bash
npm install
npm run dev        # Desenvolvimento
npm run build      # Build produção
npm run build:pages # Build para GitHub Pages (base /Nexa-Seguros/)
npm run preview    # Preview do build
npm test           # Testes (Vitest)
npm run start      # Alias para preview
```

## Estrutura

```
src/
├── components/    # Nav, Footer, CookieConsent, SEOHead, WhatsAppFloat...
├── hooks/         # useReveal
├── lib/           # site.js, analytics.js, wa.js
├── pages/         # Home, Legal, Termos, Privacidade, Lgpd
├── sections/      # Hero, Categories, Simulator, Faq, etc.
└── styles.css     # Estilos globais
```

## Deploy

Publicado via GitHub Pages com workflow `.github/workflows/deploy.yml`. Push para `master` dispara `npm run build:pages`.

- Produção: [https://alexxsouzaa.github.io/Nexa-Seguros/](https://alexxsouzaa.github.io/Nexa-Seguros/)

## Privacidade & Analytics

- Consent Mode v2 com padrão `denied`. Banner LGPD permite aceitar/recusar.
- Eventos: `whatsapp_open`, `quote_start`, `quote_submit`, `cta_click`.
- Conversão principal: `whatsapp_open` (marcar como conversão no GA4).

## Licença

Projeto proprietário. Todos os direitos reservados.
