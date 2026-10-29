import SEOHead from "../components/SEOHead.jsx";
import LegalLayout from "../components/LegalLayout.jsx";

export default function Lgpd() {
  return (
    <LegalLayout>
      <SEOHead
        title="LGPD | Nexa Seguros"
        description="Informações sobre o tratamento de dados pessoais pela Nexa Seguros em conformidade com a Lei Geral de Proteção de Dados."
        path="/lgpd"
        robots="index,follow"
      />

      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">Documentos</p>
          <h1>LGPD - Lei Geral de Proteção de Dados</h1>
          <p className="legal-meta">
            Última atualização: outubro de 2026. Este documento vale para o site
            www.nexaseguros.com.br e para o atendimento realizado pela Nexa Seguros na Bahia.
          </p>
        </div>
      </section>

      <section className="legal-section" id="sobre-lgpd">
        <div className="container">
          <h2>Sobre a LGPD</h2>
          <p>
            A Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) estabelece regras para a
            coleta, uso, armazenamento e compartilhamento de dados pessoais no Brasil. A Nexa
            Seguros está comprometida em cumprir essa legislação em todas as suas atividades.
          </p>
        </div>
      </section>

      <section className="legal-section" id="controlador-operador">
        <div className="container">
          <h2>Controlador e operador</h2>
          <p>
            A Nexa Seguros atua como controladora dos dados coletados por meio de seu site e canais
            de atendimento. Quando necessário para a cotação, suas informações são compartilhadas com
            operadoras de planos de saúde e odontológicos, que atuam como operadoras nesse contexto.
          </p>
        </div>
      </section>

      <section className="legal-section" id="direitos-titular">
        <div className="container">
          <h2>Direitos do titular</h2>
          <p>
            Você tem direito a solicitar, a qualquer momento:
          </p>
          <ul>
            <li>Confirmação da existência de tratamento de seus dados;</li>
            <li>Acesso aos dados;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
            <li>Portabilidade dos dados a outro fornecedor de serviço ou produto;</li>
            <li>Eliminação dos dados tratados com consentimento;</li>
            <li>Informação sobre entidades públicas e privadas com as quais compartilhamos dados;</li>
            <li>Informação sobre a possibilidade de não fornecer consentimento e as consequências;</li>
            <li>Revogação do consentimento.</li>
          </ul>
        </div>
      </section>

      <section className="legal-section" id="seguranca">
        <div className="container">
          <h2>Segurança dos dados</h2>
          <p>
            Adotamos medidas técnicas e administrativas adequadas para proteger seus dados contra
            acessos não autorizados, perdas, alterações ou divulgações indevidas. Comunicações são
            protegidas em trânsito e armazenadas de forma acessível somente à equipe autorizada.
          </p>
        </div>
      </section>

      <section className="legal-section" id="contato-lgpd">
        <div className="container">
          <h2>Contato sobre LGPD</h2>
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre a LGPD, fale conosco pelo WhatsApp (pelo
            botão do site) ou diretamente na nossa página inicial. Respondemos o mais rápido possível,
            em horário comercial.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
