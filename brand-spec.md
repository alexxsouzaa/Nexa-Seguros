# Nexa Seguros — Brand Spec

Fonte: briefing do usuário (paleta, tipografia e direção visual fornecidas integralmente).

## Cores (OKLch de referência / hex canônico)

| Token | Hex | Uso |
|-------|-----|-----|
| `--bg` | `#FAFDF7` | Fundo principal claro |
| `--bg-2` | `#F2FAEA` | Superfícies secundárias |
| `--soft` | `#D0EDE3` | Elementos suaves, backgrounds |
| `--hl` | `#92D8BE` | Destaque secundário |
| `--pos` | `#B2F9CA` | Destaque / estado positivo |
| `--brand` | `#1AA077` | Cor de ação principal |
| `--inst` | `#1A4738` | Verde escuro institucional |
| `--ink` | `#070908` | Texto / fundo escuro |
| `--surface` | `#FFFFFF` | Cards, contraste |

Dark: `#070908` (bg) + `#1A4738` (institucional) com superfícies um pouco mais claras; elementos em `#1AA077`, `#92D8BE`, `#B2F9CA`. Nunca misturar tokens entre temas.

Regra de equilíbrio: verde em ações e destaques, **nunca** em grandes áreas chapadas (exceto a seção institucional de empresas, que usa `#1A4738` de propósito).

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
