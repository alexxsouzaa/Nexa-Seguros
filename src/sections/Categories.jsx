import ImgSlot from "../components/ImgSlot.jsx";

export default function Categories() {
  return (
    <section className="section" id="solucoes" data-od-id="secao-solucoes">
      <div className="container">
        <div className="section-head r">
          <h2>Um plano para cada momento</h2>
          <p className="section-sub">
            Saúde, odontológico ou empresarial: veja as opções de cada caminho.
          </p>
        </div>

        <div className="cat-grid">
          <article className="cat-card r" data-od-id="card-saude">
            <ImgSlot>
              <img
                className="cat-img"
                src="/img/plano-saude.webp"
                alt="Atendimento de saúde e cuidado com o paciente"
                width="640"
                height="400"
                loading="lazy"
                decoding="async"
              />
              <span className="cat-icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </span>
            </ImgSlot>
            <h3>Plano de Saúde</h3>
            <p>Para cuidar da sua saúde com mais segurança e tranquilidade.</p>
            <a className="link-arrow" href="#planos">
              Ver opções de saúde<span aria-hidden="true"> →</span>
            </a>
          </article>

          <article className="cat-card r" id="odontologico" data-od-id="card-odontologico">
            <ImgSlot>
              <img
                className="cat-img"
                src="/img/plano-odontologico.webp"
                alt="Consulta e cuidado odontológico"
                width="640"
                height="400"
                loading="lazy"
                decoding="async"
              />
              <span className="cat-icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5.5c-1.5-1.2-3.2-1.8-5-1.5C4.7 4.4 3.5 6.3 3.5 9c0 4.5 2.2 8 3.7 10.5.6 1 1.5 1.6 2.4 1.6 1.3 0 2-1.4 2.4-3.4.4-2 1.1-3.4 2-3.4s1.6 1.4 2 3.4c.4 2 1.1 3.4 2.4 3.4.9 0 1.8-.6 2.4-1.6C22.3 17 24.5 13.5 24.5 9c0-2.7-1.2-4.6-3.5-5-1.8-.3-3.5.3-5 1.5" />
                </svg>
              </span>
            </ImgSlot>
            <h3>Plano Odontológico</h3>
            <p>Cuidados odontológicos para você, sua família ou sua empresa.</p>
            <a className="link-arrow" href="#planos">
              Ver opções odontológicas<span aria-hidden="true"> →</span>
            </a>
          </article>

          <article className="cat-card r" data-od-id="card-empresarial">
            <ImgSlot>
              <img
                className="cat-img"
                src="/img/planos-empresariais.webp"
                alt="Equipe de trabalho em ambiente corporativo"
                width="640"
                height="400"
                loading="lazy"
                decoding="async"
              />
              <span className="cat-icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="7" width="18" height="14" rx="2" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
                </svg>
              </span>
            </ImgSlot>
            <h3>Planos Empresariais</h3>
            <p>Soluções para empresas que querem cuidar das pessoas que fazem parte do negócio.</p>
            <a className="link-arrow" href="#empresas">
              Ver soluções empresariais<span aria-hidden="true"> →</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
