import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "../components/icons.jsx";
import { WA_CTA_TEXT, WA_NUMBER } from "../lib/site.js";

function maskPhone(value) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const defaultWhatsHref = "https://wa.me/" + WA_NUMBER + "?text=" + WA_CTA_TEXT;

const TIPOS = ["Saúde", "Odontológico", "Saúde + Odontológico"];
const PERFIS = ["Individual/Familiar", "Empresarial"];

export default function Simulator() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [firstName, setFirstName] = useState("tudo certo");
  const [whatsHref, setWhatsHref] = useState(defaultWhatsHref);

  const successRef = useRef(null);

  useEffect(() => {
    if (done && successRef.current) successRef.current.focus();
  }, [done]);

  function handleFormChange(e) {
    const el = e.target;
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
    const nome = (data.get("nome") || "").toString().trim().split(" ")[0];
    const msg =
      "Olá, Nexa! Quero receber opções de plano.%0A%0A" +
      "Nome: " + encodeURIComponent((data.get("nome") || "").toString()) + "%0A" +
      "WhatsApp: " + encodeURIComponent((data.get("whatsapp") || "").toString()) + "%0A" +
      "Cidade: " + encodeURIComponent((data.get("cidade") || "").toString()) + "%0A" +
      "Idade: " + encodeURIComponent((data.get("idade") || "").toString()) + "%0A" +
      "Tipo: " + encodeURIComponent((data.get("tipo") || "").toString()) + "%0A" +
      "Perfil: " + encodeURIComponent((data.get("perfil") || "").toString());

    setFirstName(nome || "tudo certo");
    setWhatsHref("https://wa.me/" + WA_NUMBER + "?text=" + msg);
    setDone(true);
  }

  function handleReset() {
    setDone(false);
    setError("");
    setTimeout(() => {
      const first = document.getElementById("nome");
      if (first) first.focus();
    }, 0);
  }

  return (
    <section className="section section-alt" id="simulador" data-od-id="secao-simulador">
      <div className="container sim-grid">
        <div className="sim-copy r">
          <p className="eyebrow">Cotação</p>
          <h2>Encontre uma opção que faça sentido para você.</h2>
          <p className="section-sub">
            Leva menos de um minuto. Sem burocracia, sem compromisso: você recebe as opções e
            decide no seu tempo.
          </p>
          <ul className="sim-points" role="list">
            <li>
              <CheckIcon /> Resposta pelo WhatsApp
            </li>
            <li>
              <CheckIcon /> Sem custo e sem compromisso
            </li>
          </ul>
        </div>

        <div className="sim-card glass r" data-od-id="form-cotacao">
          {!done && (
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
              </div>

              <div className="field">
                <label htmlFor="idade">Idade</label>
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
                Os dados vão para o WhatsApp só quando você confirmar o envio.
              </p>
            </form>
          )}

          {done && (
            <div
              className="sim-success"
              id="simSuccess"
              ref={successRef}
              tabIndex="-1"
              data-od-id="form-cotacao-sucesso"
            >
              <span className="success-icon" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <h3>
                Tudo certo, <span id="successName">{firstName}</span>!
              </h3>
              <p>
                Seu pedido está pronto. É só enviar pelo WhatsApp para que nossa equipe comece a
                buscar as opções do seu perfil — leva menos de um minuto.
              </p>
              <a
                className="btn btn-primary btn-lg btn-block"
                id="successWhats"
                href={whatsHref}
                target="_blank"
                rel="noopener"
              >
                Enviar meu pedido pelo WhatsApp
              </a>
              <button className="btn btn-ghost btn-block" type="button" id="successReset" onClick={handleReset}>
                Enviar outro pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
