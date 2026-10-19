import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent, initGA4, CONSENT_EVENT } from "../lib/analytics.js";

/* Banner de consentimento de cookies (LGPD).
 * Sem decisão registrada, o GA4 permanece totalmente desativado.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(() => getConsent() === null);

  useEffect(() => {
    function reopen() {
      setVisible(true);
      /* Ao abrir preferências, considera-se que não há consentimento ativo.
       * Isso força o visitante a reescolher (e, no caso de revogar, já desativamos). */
    }
    if (typeof window !== "undefined") {
      window.addEventListener(CONSENT_EVENT, reopen);
      return () => window.removeEventListener(CONSENT_EVENT, reopen);
    }
  }, []);

  if (!visible) return null;

  function decide(value) {
    setConsent(value);
    if (value === "granted") initGA4();
    setVisible(false);
  }

  return (
    <div className="cookie" role="region" aria-label="Preferências de cookies">
      <h2>Cookies e privacidade</h2>
      <p>
        Usamos o Google Analytics para medir visitas e cliques em cotação — sempre de forma
        agregada, sem dados médicos ou pessoais sensíveis.{" "}
        <Link to="/privacidade">Saiba como tratamos seus dados</Link>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-ghost" onClick={() => decide("denied")}>
          Só essenciais
        </button>
        <button type="button" className="btn btn-primary" onClick={() => decide("granted")}>
          Aceitar medição
        </button>
      </div>
    </div>
  );
}
