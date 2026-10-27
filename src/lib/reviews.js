export const REVIEWS = [
  { text: "Melhor assessoria que já contratei! Acharam um plano que caberia no meu bolso.", name: "Jade Lima" },
  { text: "Atendimento rápido e sem enrolação. Recomendo demais!", name: "Gabi Marques" },
  { text: "Simples e prático, me ajudaram a entender cada detalhe do plano.", name: "Beatriz David" },
  { text: "Processo bem simples e dinâmico, facilitou muito a minha decisão.", name: "Ian Almeida" },
  { text: "Solução empresarial muito boa! Cuidaram de toda a equipe.", name: "Igor Peneluc" },
  { text: "Excelente consultoria para quem quer contratar um bom plano de saúde.", name: "Vandeilson Figueiredo" },
  { text: "Melhor atendimento do mercado! Explicaram tudo com paciência.", name: "Isabella Guimarães" },
  { text: "Não consigo imaginar contratar plano sem a Nexa, tornou tudo mais fácil.", name: "Wesley Gama" },
  { text: "Equipe incrível, recomendo para todos que precisam de plano de saúde.", name: "Raissa Chaves" },
  { text: "Resolveram tudo em poucas horas. Super indico a Nexa!", name: "Camila Rocha" },
  { text: "Atendimeto nota 10, resolveram tudo pra mim.", name: "Diego Nascimento" },
  { text: "Consegui um plano ótimo com um preço que cabia no orçamento.", name: "Larissa Prado" },
  { text: "otimo atendimento, super atenciosos do começo ao fim", name: "Matheus Barbosa" },
  { text: "Me ajudaram a encontrar o plano ideal para a minha família. Gratidão!", name: "Fernanda Lima" },
  { text: "Melhor assessoria, recomendo de mais!", name: "Paulo Henrique" },
  { text: "Muito atenciosos, explicaram cada detalhe sem pressa.", name: "Tatiane Souza" },
  { text: "Rapidez no atendimento e uma cotação muito justa. Recomendo!", name: "Rodrigo Alves" },
  { text: "Conseguiram um plano bom e barato pra mim e minha esposa", name: "Juliana Castro", rating: 4 },
  { text: "Profissionais que realmente entendem de plano de saúde.", name: "Bruno Menezes" },
  { text: "muito bom, atendimento rapido e sem enrolação", name: "Aline Cardoso", rating: 4 },
  { text: "Fechei meu plano no mesmo dia. Tudo muito prático!", name: "Felipe Andrade" },
  { text: "Tiraram todas as minhas dúvidas com muita paciência. Amo!", name: "Patrícia Gomes" },
  { text: "Recomendo! Me ajudaram a escolher o plano ideal pra minha familia", name: "Gustavo Ribeiro" },
  { text: "Atendimento humanizado e valores muito competitivos.", name: "Marina Teixeira" },
  { text: "Excelente! Tudo muito rapido e sem enrolaçao", name: "André Luiz" },
  { text: "Nunca pensei que contratar plano fosse tão simples. Obrigada, Nexa!", name: "Carolina Dias" },
  { text: "Compararam as melhores operadoras e me economizaram um tempão.", name: "Vinícius Moreira" },
  { text: "Equipe muito educada e prestativa. Super recomendo.", name: "Sabrina Nogueira" },
  { text: "atenderam super bem, tiraram todas as minhas duvidas", name: "Everton Silva", rating: 4 },
  { text: "Achei o plano perfeito pro meu perfil. Atendimento impecável!", name: "Débora Ramos" }
];

const COOKIE = "nexa_rv";
const COOKIE_DAYS = 30;

function readCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name, value, days) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + maxAge + "; path=/; SameSite=Lax";
}

export function getVisitorSeed() {
  let seed = readCookie(COOKIE);
  if (!seed) {
    seed = Math.random().toString(36).slice(2) + Date.now().toString(36);
    writeCookie(COOKIE, seed, COOKIE_DAYS);
  }
  return seed;
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getRotatingReviews(count = 12, now = new Date()) {
  const hourBucket = Math.floor(now.getTime() / 3600000);
  const dayBucket = now.getFullYear() * 1000 + Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const rand = mulberry32(hashString(getVisitorSeed() + "|" + dayBucket + "|" + hourBucket));
  const pool = REVIEWS.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = pool[i];
    pool[i] = pool[j];
    pool[j] = tmp;
  }
  return pool.slice(0, Math.min(count, pool.length));
}
