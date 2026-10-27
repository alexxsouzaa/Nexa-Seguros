# Nexa Seguros — Brand Spec

Fonte: briefing do usuário (paleta, tipografia e direção visual fornecidas integralmente).

## Cores (hex canônico)

| Token | Hex | Uso |
|-------|-----|-----|
| `--brand` | `#1B22A7` | Ação primária, botões, ícones de destaque |
| `--brand-strong` | `#4260E6` | Hover, estados ativos, destaques secundários |
| `--brand-hover` | `#15198E` | Hover escuro, bordas focadas |
| `--bg` | `#FAFAFA` | Fundo principal claro |
| `--bg-2` | `#F2F2F2` | Superfícies secundárias |
| `--surface` | `#FFFFFF` | Cards, contraste |
| `--ink` | `#0D0D0D` | Texto principal, fundos escuros (apenas base, nunca destaque) |
| `--white` | `#FFFFFF` | Branco puro |

## Variações de opacidade da marca (suavização)

| Token | Valor | Uso |
|-------|-------|-----|
| `--brand-45` | `rgba(27, 34, 167, 0.45)` | Gradientes, overlays suaves |
| `--brand-30` | `rgba(27, 34, 167, 0.30)` | Badges, fundos leves |
| `--brand-24` | `rgba(27, 34, 167, 0.24)` | Borda de marca, foco |
| `--brand-16` | `rgba(27, 34, 167, 0.16)` | Sombras coloridas, inputs focados |
| `--brand-12` | `rgba(27, 34, 167, 0.12)` | Elementos suaves, backgrounds |
| `--brand-08` | `rgba(27, 34, 167, 0.08)` | Borda translúcida |
| `--brand-06` | `rgba(27, 34, 167, 0.06)` | Sombra suave |
| `--brand-04` | `rgba(27, 34, 167, 0.04)` | Fundo bem claro |

## Escuro institucional (apenas fundo e texto)

| Token | Valor | Uso |
|-------|-------|-----|
| `--ink` | `#0D0D0D` | Texto principal |
| `--ink-2` | `#262626` | Texto secundário escuro |
| `--ink-muted` | `#666666` | Texto muted |
| `--ink-40` | `rgba(13, 13, 13, 0.40)` | Scrim, backdrop |
| `--ink-30` | `rgba(13, 13, 13, 0.30)` | Overlay escuro |
| `--ink-24` | `rgba(13, 13, 13, 0.24)` | Sombra média |
| `--ink-16` | `rgba(13, 13, 13, 0.16)` | Sombra leve |
| `--ink-08` | `rgba(13, 13, 13, 0.08)` | Borda padrão |
| `--ink-04` | `rgba(13, 13, 13, 0.04)` | Borda suave, sombra mínima |

Regras:
- **Azul (`#1B22A7` / `#4260E6`)**: ações, botões, ícones, destaques. Nunca use preto puro como destaque.
- **Preto (`#0D0D0D`)**: apenas texto e fundos escuros (footer, seção institucional, palco do simulador). Nunca como cor de ação.
- **Branco (`#FFFFFF`)**: superfície, cards, texto sobre fundo escuro.
- Suavize com opacidade (`rgba`) em vez de criar novas cores hex.

## Tipografia (Google Fonts)

- **Sora** — títulos, números, display. Tracking negativo em ≥32px (`-0.02em`).
- **Inter** — corpo, menu, formulários, botões, texto secundário.
- Escala: display 56–64 / h2 32–40 / h3 20–22 / body 16–17 / small 14 / caption 12.
- 3 pesos: Inter 400/500/600, Sora 600/700.

## Postura de layout (observadas do briefing)

1. Espaçamento generoso: seções com `padding-block: clamp(72px, 10vw, 120px)`, max-width 1160px.
2. Raio alto e consistente: cards 20–24px, botões 999px (pill) ou 14px, inputs 12px.
3. Glassmorphism controlado: `backdrop-filter: blur(14px)` só em navbar, cards de destaque e painéis flutuantes; borda 1px translúcida; sombra `0 1px 2px` / `0 8px 30px rgba(13,13,13,.06)`.
4. Acento `--brand` no máximo 2 usos visíveis por tela (CTA primário + um detalhe).
5. Sem gradientes chamativos, sem neon, sem sombras pesadas.
