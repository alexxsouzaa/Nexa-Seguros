# Nexa Seguros — Brand Spec

Fonte: briefing do usuário (paleta, tipografia e direção visual fornecidas integralmente).

## Cores (OKLch de referência / hex canônico)

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#FAFAFA` | Fundo principal claro |
| `--bg-2` | `#F1F3FC` | Superfícies secundárias (tinta azul) |
| `--soft` | `#DDE3FA` | Elementos suaves, backgrounds |
| `--hl` | `#AEBDF3` | Destaque secundário |
| `--pos` | `#D7E4FF` | Destaque / estado positivo |
| `--brand` | `#4260E6` | Cor de ação principal |
| `--brand-strong` | `#1B22A7` | Azul profundo institucional |
| `--inst` | `#1B22A7` | Fundo institucional / rodapé |
| `--deep` | `#101668` | Painéis escuros derivados |
| `--ink` | `#0D0D0D` | Texto / fundo escuro |
| `--surface` | `#FFFFFF` | Cards, contraste |

Paleta canônica: `#1B22A7`, `#4260E6`, `#FAFAFA`, `#0D0D0D`, `#FFFFFF`. Tons intermediários (`--bg-2`, `--soft`, `--hl`, `--pos`, `--deep`) são derivados do azul da marca. WhatsApp (`#25D366`) e estrelas (`#FBBC04`) permanecem semânticos.

Regra de equilíbrio: azul em ações e destaques, **nunca** em grandes áreas chapadas (exceto a seção institucional de empresas, que usa `#1B22A7` de propósito).

## Tipografia (Google Fonts)

- **Sora** — títulos, números, display. Tracking negativo em ≥32px (`-0.02em`).
- **Inter** — corpo, menu, formulários, botões, texto secundário.
- Escala: display 56–64 / h2 32–40 / h3 20–22 / body 16–17 / small 14 / caption 12.
- 3 pesos: Inter 400/500/600, Sora 600/700.

## Postura de layout (observadas do briefing)

1. Espaçamento generoso: seções com `padding-block: clamp(72px, 10vw, 120px)`, max-width 1160px.
2. Raio alto e consistente: cards 20–24px, botões 999px (pill) ou 14px, inputs 12px.
3. Glassmorphism controlado: `backdrop-filter: blur(14px)` só em navbar, cards de destaque e painéis flutuantes; borda 1px translúcida; sombra `0 1px 2px` / `0 8px 30px rgba(7,9,8,.06)`.
4. Acento `--brand` no máximo 2 usos visíveis por tela (CTA primário + um detalhe).
5. Sem gradientes chamativos, sem neon, sem sombras pesadas.
