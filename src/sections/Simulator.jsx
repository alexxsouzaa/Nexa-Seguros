import { useState, useEffect } from "react";
import { asset, WA_NUMBER } from "../lib/site.js";
import { trackQuoteStart, trackQuoteSubmit, trackWhatsAppOpen } from "../lib/analytics.js";
import {
  Sparkles, Plus, MessageCircle, ArrowUp, Check, FileText, Link2,
  LayoutList, Banknote, MessageSquareText, Brain, UserCheck
} from "lucide-react";

function maskPhone(value) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const TIPOS = ["Saúde", "Odontológico", "Saúde + Odontológico"];
const PERFIS = ["Individual/Familiar", "Empresarial"];

const CHAT = [
  { role: "user", text: "Quais planos cobrem Camaçari?" },
  { role: "bot", text: "Encontrei 12 planos de 6 operadoras para Camaçari." },
  { role: "user", text: "Qual a carência do plano da Amil?" },
  { role: "bot", text: "Na Amil, a carência é de 180 dias, com redução em urgência e emergência." },
  { role: "user", text: "Monta uma cotação: família, 4 vidas." },
  { role: "bot", text: "Separei 3 opções, do menor ao maior preço. Já deixei tudo pronto pra você." }
];

const QUOTE = [
  { logo: "/img/logos/amil.png", name: "Amil", sub: "Enfermaria · Regional", price: "R$ 1.712,50", badge: "Menor preço" },
  { logo: "/img/logos/bradesco.png", name: "Bradesco Saúde", sub: "Apartamento · Nacional", price: "R$ 2.231,60", badge: "Melhor rede" },
  { logo: "/img/logos/sulamerica.png", name: "SulAmérica", sub: "Apartamento · Nacional", price: "R$ 2.588,10" }
];

const FEATURES = [
  { Icon: Sparkles, h: "Cotação no chat.", p: '"Plano família, 4 vidas em Camaçari" vira 3 opções comparadas, prontas para enviar.' },
  { Icon: LayoutList, h: "Comparativo lado a lado.", p: "Preço, rede e carência de cada operadora na mesma tela, sem planilha." },
  { Icon: Banknote, h: "Preço direto da operadora.", p: "O valor vem atualizado da operadora parceira, sem surpresa na contratação." },
  { Icon: MessageSquareText, h: "Explico cada detalhe.", p: "Carência, coparticipação e rede em linguagem simples, sem letras miúdas." },
  { Icon: Brain, h: "Lembro do seu perfil.", p: "Guardo o que você procura para não repetir tudo na próxima cotação." },
  { Icon: UserCheck, h: "Você aprova cada envio.", p: "A Nexa propõe, você confirma antes de qualquer coisa ir para a frente." }
];

function Brand() {
  return (
    <div className="sim-top">
      <span className="sim-brand">
        <span className="sim-brand-ic"><Sparkles size={14} strokeWidth={1.5} /></span>
        <span className="sim-brand-t">Nexa</span>
      </span>
      <span className="sim-live">
        <span className="sim-live-dot" />
        No seu WhatsApp
      </span>
    </div>
  );
}

function Chat() {
  return (
    <div className="sim-chat">
      <div className="sim-chat-in">
        {CHAT.map((m, i) =>
          m.role === "user" ? (
            <div className="sim-bubble" style={{ "--i": i }} key={i}>
              <div>
                <div className="sim-urow">
                  <div className="sim-umsg">{m.text}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="sim-bubble" style={{ "--i": i }} key={i}>
              <div>
                <div className="sim-brow">
                  <span className="sim-avatar"><Sparkles size={14} strokeWidth={1.5} /></span>
                  <p className="sim-bmsg">{m.text}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Quote() {
  return (
    <div className="sim-quote-in">
      <div className="sim-qhead">
        <p className="sim-qtitle">Plano família · 4 vidas</p>
        <p className="sim-qcity">Camaçari</p>
      </div>

      <div className="sim-qrows">
        {QUOTE.map((r) => (
          <div className="sim-qrow" key={r.name}>
            <span className="sim-qlogo">
              <img src={asset(r.logo)} alt="" loading="lazy" decoding="async" />
            </span>
            <span className="sim-qmeta">
              <span className="sim-qname">{r.name}</span>
              <span className="sim-qsub">{r.sub}</span>
            </span>
            <span className="sim-qval">
              <span className="sim-qprice">{r.price}</span>
              {r.badge && <span className="sim-qbadge">{r.badge}</span>}
            </span>
          </div>
        ))}
      </div>

      <div className="sim-chips">
        <span className="sim-chip"><FileText size={14} strokeWidth={1.5} />Comparativo em PDF</span>
        <span className="sim-chip"><Link2 size={14} strokeWidth={1.5} />Link da cotação</span>
      </div>

      <div className="sim-send">
        <span className="sim-send-txt">
          <span>Pronto para enviar</span>
          <span>Para você, no WhatsApp</span>
        </span>
        <a className="sim-send-btn" href="#cotacao" tabIndex={-1} onClick={() => trackCtaClick("cta_aprovar_enviar", "#cotacao")}>
          <span className="sim-send-ic"><Check size={20} strokeWidth={2.5} /></span>
          <span className="sim-send-label">Aprovar e enviar</span>
        </a>
      </div>
    </div>
  );
}

function InputBar() {
  return (
    <div className="sim-input-wrap">
      <div className="sim-input">
        <span className="sim-input-t">Peça à Nexa…</span>
        <span className="sim-input-btn"><ArrowUp size={18} strokeWidth={1.5} /></span>
      </div>
    </div>
  );
}

/* Escala o frame (design fixo) para a largura disponivel, como o Koter faz. */
function useFrameScale() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll(".sim-scale"))
      .map((sc) => {
        const frame = sc.querySelector(".sim-frame");
        return frame ? { sc, frame, design: parseFloat(frame.dataset.w) } : null;
      })
      .filter(Boolean);
    if (!items.length) return;

    const update = () => {
      items.forEach(({ sc, frame, design }) => {
        const w = sc.clientWidth;
        if (w > 0) frame.style.setProperty("--sim-scale", String(w / design));
      });
    };

    update();
    const ro = new ResizeObserver(update);
    items.forEach(({ sc }) => ro.observe(sc));
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
}

function Demo() {
  return (
    <div className="sim-stage-in" aria-hidden="true">
      <div className="sim-demo sim-demo-mobile">
        <div className="sim-scale">
          <div className="sim-frame" data-w="440">
            <div className="sim-phone">
              <Brand />
              <Chat />
              <div className="sim-quote"><Quote /></div>
              <InputBar />
            </div>
          </div>
        </div>
      </div>

      <div className="sim-demo sim-demo-desktop">
        <div className="sim-scale">
          <div className="sim-frame" data-w="1040">
            <div className="sim-win">
              <div className="sim-chat-col">
                <Brand />
                <Chat />
                <InputBar />
              </div>
              <div className="sim-quote-col">
                <Quote />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sim-toast">
        <span className="sim-toast-pill">
          <span className="sim-toast-ic"><MessageCircle size={14} strokeWidth={1.5} /></span>
          Cotação enviada para você
        </span>
      </div>
    </div>
  );
}

export default function Simulator() {
  const [error, setError] = useState("");
  const [quoteStarted, setQuoteStarted] = useState(false);
  useFrameScale();

  function handleFormChange(e) {
    const el = e.target;
    if (!quoteStarted) {
      setQuoteStarted(true);
      trackQuoteStart();
    }
    el.removeAttribute("aria-invalid");
    el.removeAttribute("aria-describedby");
    const fs = el.closest && el.closest("fieldset");
    if (fs) {
      fs.removeAttribute("aria-invalid");
      fs.removeAttribute("aria-describedby");
      fs.querySelectorAll("input").forEach((r) => r.removeAttribute("aria-invalid"));
    }
    setError("");
  }

  function handlePhoneChange(e) {
    e.target.value = maskPhone(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const missing = [];

    form.querySelectorAll("input[required]").forEach((input) => {
      if (input.type === "radio") return;
      const ok = input.value.trim() !== "" && input.checkValidity();
      input.setAttribute("aria-invalid", String(!ok));
      if (ok) input.removeAttribute("aria-describedby");
      else {
        input.setAttribute("aria-describedby", "formError");
        const lbl = form.querySelector(`label[for="${input.id}"]`);
        missing.push(lbl ? lbl.textContent.trim() : input.name);
      }
    });

    ["tipo", "perfil"].forEach((name) => {
      const group = form.querySelectorAll(`input[name="${name}"]`);
      const checked = Array.prototype.some.call(group, (r) => r.checked);
      const fieldset = group[0] && group[0].closest("fieldset");
      if (fieldset) {
        fieldset.setAttribute("aria-invalid", String(!checked));
        if (checked) fieldset.removeAttribute("aria-describedby");
        else fieldset.setAttribute("aria-describedby", "formError");
      }
      if (!checked && fieldset) {
        const legend = fieldset.querySelector("legend");
        missing.push(legend ? legend.textContent.trim() : name);
      }
    });

    if (missing.length) {
      setError("Faltou preencher: " + missing.join(", ") + ".");
      const firstBad =
        form.querySelector('input[aria-invalid="true"]') || form.querySelector("input:invalid");
      if (firstBad) firstBad.focus();
      return;
    }

    const data = new FormData(form);
    trackQuoteSubmit({
      tipo: data.get("tipo") || "",
      perfil: data.get("perfil") || "",
      cidade: data.get("cidade") || "",
      quantidade: data.get("quantidade") || "",
    });

    const msg =
      "Olá, Nexa! Quero receber opções de plano.%0A%0A" +
      "Nome: " + encodeURIComponent((data.get("nome") || "").toString()) + "%0A" +
      "WhatsApp: " + encodeURIComponent((data.get("whatsapp") || "").toString()) + "%0A" +
      "Cidade: " + encodeURIComponent((data.get("cidade") || "").toString()) + "%0A" +
      "Quantidade de pessoas: " + encodeURIComponent((data.get("quantidade") || "").toString()) + "%0A" +
      "Idade: " + encodeURIComponent((data.get("idade") || "").toString()) + "%0A" +
      "Tipo: " + encodeURIComponent((data.get("tipo") || "").toString()) + "%0A" +
      "Perfil: " + encodeURIComponent((data.get("perfil") || "").toString());

    const href = "https://wa.me/" + WA_NUMBER + "?text=" + msg;
    window.location.href = href;
  }

  return (
    <section className="section sim" id="simulador" data-od-id="secao-simulador">
      <div className="container">
        <div className="sim-head r">
          <div className="sim-icons" aria-hidden="true">
            <span className="sim-ic"><Sparkles size={24} strokeWidth={1.5} /></span>
            <span className="sim-ic-mid"><Plus size={18} strokeWidth={2} /></span>
            <span className="sim-ic"><MessageCircle size={24} strokeWidth={1.5} /></span>
          </div>
          <h2>Encontre uma opção que faça sentido para você.</h2>
          <p className="section-sub">
            A Nexa entende o seu perfil, compara as operadoras e monta a cotação no WhatsApp.
            Nada vai para a frente sem você aprovar.
          </p>
        </div>

        <div className="sim-stage r">
          <Demo />
        </div>

        <div className="sim-grid2">
          <ul className="sim-features" role="list">
            {FEATURES.map((f) => {
              const Icon = f.Icon;
              return (
                <li className="sim-feat r" key={f.h}>
                  <Icon className="sim-feats-ic" size={20} strokeWidth={1.5} />
                  <h3>{f.h}</h3>
                  <p>{f.p}</p>
                </li>
              );
            })}
          </ul>

          <div className="sim-formcard r" id="cotacao" data-od-id="form-cotacao">
            <div className="sim-fc-head" aria-hidden="true">
              <span className="sim-fc-logos">
                {QUOTE.map((r) => (
                  <span className="sim-fc-logo" key={r.name}>
                    <img src={asset(r.logo)} alt="" loading="lazy" decoding="async" />
                  </span>
                ))}
              </span>
              <span className="sim-fc-flow">
                <span className="sim-flow-dot" />
                <span className="sim-flow-dot" />
                <span className="sim-flow-dot" />
              </span>
              <span className="sim-fc-badge"><Sparkles size={20} strokeWidth={1.5} /></span>
            </div>

            <h3 className="sim-fc-title">Receba as opções no seu WhatsApp.</h3>
            <p className="sim-fc-lead">
              Preencha em menos de um minuto. Eu comparo as operadoras e te envio a cotação pronta,
              sem custo e sem compromisso.
            </p>

            <form id="quoteForm" noValidate onSubmit={handleSubmit} onChange={handleFormChange}>
              <div className="field">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  maxLength="70"
                  required
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="whatsapp">WhatsApp</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    autoComplete="tel"
                    inputMode="numeric"
                    placeholder="(71) 99999-9999"
                    maxLength="15"
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    autoComplete="address-level2"
                    placeholder="Camaçari"
                    maxLength="60"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="quantidade">Quantidade de pessoas beneficiárias</label>
                  <input
                    type="number"
                    id="quantidade"
                    name="quantidade"
                    inputMode="numeric"
                    min="1"
                    max="100"
                    placeholder="Ex.: 4"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="idade">Idade do titular / média dos beneficiários</label>
                <input
                  type="number"
                  id="idade"
                  name="idade"
                  min="0"
                  max="120"
                  inputMode="numeric"
                  placeholder="Ex.: 34"
                  maxLength="3"
                  required
                />
              </div>

              <fieldset className="field">
                <legend>Tipo de plano</legend>
                <div className="chips">
                  {TIPOS.map((tipo, i) => (
                    <label className="chip" key={tipo}>
                      <input type="radio" name="tipo" value={tipo} required={i === 0} />
                      <span>{tipo}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="field">
                <legend>Perfil</legend>
                <div className="chips">
                  {PERFIS.map((perfil, i) => (
                    <label className="chip" key={perfil}>
                      <input type="radio" name="perfil" value={perfil} required={i === 0} />
                      <span>{perfil}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <p className="form-error" id="formError" role="alert" hidden={!error}>
                {error || "Preencha os campos obrigatórios para continuar."}
              </p>

              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Quero receber opções
              </button>

              <p className="form-legal">
                Ao enviar, você será direto ao WhatsApp da Nexa com os dados preenchidos.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
