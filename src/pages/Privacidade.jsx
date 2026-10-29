import SEOHead from "../components/SEOHead.jsx";
import LegalLayout from "../components/LegalLayout.jsx";

export default function Privacidade() {
  return (
    <LegalLayout>
      <SEOHead
        title="Política de Privacidade | Nexa Seguros"
        description="Saiba como a Nexa Seguros coleta, usa e protege seus dados pessoais conforme a LGPD. Assessoria em planos de saúde e odontológicos na Bahia."
        path="/privacidade"
        robots="index,follow"
      />

      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">Documentos</p>
          <h1>Política de privacidade</h1>
          <p className="legal-meta">
            Última atualização: outubro de 2026. Este documento vale para o site
            www.nexaseguros.com.br e para o atendimento realizado pela Nexa Seguros na Bahia.
          </p>
        </div>
      </section>

      <section className="legal-section" id="quem-somos">
        <div className="container">
          <h2>Quem somos</h2>
          <p>
            A Nexa Seguros faz assessoria em planos de saúde e odontológicos na Bahia.
            Atuamos como intermediários entre você e as operadoras: não fabricamos planos nem
            calculamos valores oficiais.
          </p>
        </div>
      </section>

      <section className="legal-section" id="dados-coletados">
        <div className="container">
          <h2>Dados que coletamos</h2>
          <ul>
            <li>
              No formulário de cotação: nome, WhatsApp, cidade, idade, tipo de plano e perfil
              (individual/familiar ou empresarial).
            </li>
            <li>
              Em conversas pelo WhatsApp ou e-mail: as informações que você compartilhar sobre seu
              contexto e suas necessidades.
            </li>
          </ul>
        </div>
      </section>

      <section className="legal-section" id="como-usamos">
        <div className="container">
          <h2>Como usamos seus dados</h2>
          <p>
            Usamos esses dados exclusivamente para atender à sua solicitação: montar um comparativo
            de planos, encaminhar sua cotação e acompanhar o processo de contratação. Também usamos
            métricas agregadas, sem identificação pessoal, para melhorar o atendimento.
          </p>
        </div>
      </section>

      <section className="legal-section" id="base-legal">
        <div className="container">
          <h2>Base legal e consentimento</h2>
          <p>
            Ao enviar o formulário ou iniciar uma conversa, você consente com o uso dos dados para
            essa finalidade (art. 7º, I, da LGPD). Você pode revogar o consentimento ou pedir a
            exclusão dos seus dados a qualquer momento, pelos canais abaixo.
          </p>
        </div>
      </section>

      <section className="legal-section" id="compartilhamento">
        <div className="container">
          <h2>Compartilhamento de dados</h2>
          <p>
            Não vendemos e não compartilhamos seus dados com terceiros para marketing. O acesso é
            restrito à nossa equipe. Só enviamos suas informações a uma operadora quando você pede
            uma cotação oficial com ela.
          </p>
        </div>
      </section>

      <section className="legal-section" id="guarda-dados">
        <div className="container">
          <h2>Guarda dos dados</h2>
          <p>
            Mantemos os dados apenas enquanto houver relação ativa com você ou exigência legal.
            Após esse período, são excluídos ou anonimizados. Comunicações são protegidas em
            trânsito e armazenadas de forma acessível somente à equipe.
          </p>
        </div>
      </section>

      <section className="legal-section" id="seus-direitos">
        <div className="container">
          <h2>Seus direitos</h2>
          <p>
            Você pode solicitar, a qualquer momento: acesso aos dados, correção, exclusão,
            portabilidade, informação sobre compartilhamento e revogação do consentimento. Para
            isso, fale com a gente pelos canais de contato abaixo.
          </p>
        </div>
      </section>

      <section className="legal-section" id="contato">
        <div className="container">
          <h2>Contato</h2>
          <p>
            Dúvidas sobre esta política ou sobre seus dados: WhatsApp (pelo botão do site) ou
            diretamente na nossa página inicial. Respondemos o mais rápido possível, em horário
            comercial.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
