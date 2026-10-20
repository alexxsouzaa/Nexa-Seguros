import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal.js";
import SEOHead from "../components/SEOHead.jsx";
import Nav from "../components/Nav.jsx";
import { YEAR } from "../lib/site.js";

export default function Legal() {
  useReveal();

  return (
    <>
      <SEOHead
        title="PolÃ­tica de privacidade e Termos de uso | Nexa Seguros"
        description="Documentos legais da Nexa Seguros: polÃ­tica de privacidade e termos de uso para cotaÃ§Ãµes de planos de saÃºde e odontolÃ³gicos em CamaÃ§ari, BA."
        path="/legal"
      />
      <Nav minimal />

      <main id="conteudo" tabIndex={-1}>
        <section className="legal-hero" data-od-id="legal-hero">
          <div className="container">
            <p className="eyebrow">Documentos</p>
            <h1>PolÃ­tica de privacidade e Termos de uso</h1>
            <p className="legal-meta">
              Ãšltima atualizaÃ§Ã£o: outubro de 2026. Estes documentos valem para o site
              www.nexaseguros.com.br e para o atendimento realizado pela Nexa Seguros em CamaÃ§ari,
              BA.
            </p>
          </div>
        </section>

        <section className="legal-section" id="privacidade" data-od-id="legal-privacidade">
          <div className="container">
            <h2>PolÃ­tica de privacidade</h2>
            <p>
              A Nexa Seguros respeita sua privacidade. Esta polÃ­tica explica, em linguagem simples,
              quais dados coletamos e como usamos, conforme a Lei Geral de ProteÃ§Ã£o de Dados (LGPD).
            </p>

            <h3>Quem somos</h3>
            <p>
              A Nexa Seguros faz assessoria em planos de saÃºde e odontolÃ³gicos em CamaÃ§ari, BA.
              Atuamos como intermediÃ¡rios entre vocÃª e as operadoras: nÃ£o fabricamos planos nem
              calculamos valores oficiais.
            </p>

            <h3>Dados que coletamos</h3>
            <ul>
              <li>
                No formulÃ¡rio de cotaÃ§Ã£o: nome, WhatsApp, cidade, idade, tipo de plano e perfil
                (individual/familiar ou empresarial).
              </li>
              <li>
                Em conversas pelo WhatsApp ou e-mail: as informaÃ§Ãµes que vocÃª compartilhar sobre
                seu contexto e suas necessidades.
              </li>
            </ul>

            <h3>Como usamos</h3>
            <p>
              Usamos esses dados exclusivamente para atender Ã  sua solicitaÃ§Ã£o: montar um
              comparativo de planos, encaminhar sua cotaÃ§Ã£o e acompanhar o processo de contrataÃ§Ã£o.
              TambÃ©m usamos mÃ©tricas agregadas, sem identificaÃ§Ã£o pessoal, para melhorar o
              atendimento.
            </p>

            <h3>Base legal e consentimento</h3>
            <p>
              Ao enviar o formulÃ¡rio ou iniciar uma conversa, vocÃª consente com o uso dos dados para
              essa finalidade (art. 7Âº, I, da LGPD). VocÃª pode revogar o consentimento ou pedir a
              exclusÃ£o dos seus dados a qualquer momento, pelos canais abaixo.
            </p>

            <h3>Compartilhamento</h3>
            <p>
              NÃ£o vendemos e nÃ£o compartilhamos seus dados com terceiros para marketing. O acesso Ã©
              restrito Ã  nossa equipe. SÃ³ enviamos suas informaÃ§Ãµes a uma operadora quando vocÃª
              pede uma cotaÃ§Ã£o oficial com ela.
            </p>

            <h3>Guarda dos dados</h3>
            <p>
              Mantemos os dados apenas enquanto houver relaÃ§Ã£o ativa com vocÃª ou exigÃªncia legal.
              ApÃ³s esse perÃ­odo, sÃ£o excluÃ­dos ou anonimizados. ComunicaÃ§Ãµes sÃ£o protegidas em
              trÃ¢nsito e armazenadas de forma acessÃ­vel somente Ã  equipe.
            </p>

            <h3>Seus direitos</h3>
            <p>
              VocÃª pode solicitar, a qualquer momento: acesso aos dados, correÃ§Ã£o, exclusÃ£o,
              portabilidade, informaÃ§Ã£o sobre compartilhamento e revogaÃ§Ã£o do consentimento. Para
              isso, fale com a gente pelos canais de contato abaixo.
            </p>

            <h3>Contato</h3>
            <p>
              DÃºvidas esta polÃ­tica ou sobre seus dados: WhatsApp (pelo botÃ£o do site), e-mail
              contato@nexaseguros.com.br ou diretamente na nossa pÃ¡gina inicial. Respondemos o mais
              rÃ¡pido possÃ­vel, em horÃ¡rio comercial.
            </p>
          </div>
        </section>

        <section className="legal-section" id="termos" data-od-id="legal-termos">
          <div className="container">
            <h2>Termos de uso</h2>
            <p>
              Ao usar o site da Nexa Seguros, vocÃª concorda com estes termos. Este Ã© o nosso
              compromisso, em linguagem clara, de como funciona o serviÃ§o.
            </p>

            <h3>O que fazemos</h3>
            <p>
              A Nexa nÃ£o Ã© uma operadora: fazemos assessoria para vocÃª comparar planos de saÃºde e
              odontolÃ³gicos das operadoras do mercado e escolher a opÃ§Ã£o mais adequada ao seu
              perfil. IndicaÃ§Ãµes feitas por nÃ³s nunca substituem as condiÃ§Ãµes oficiais da operadora.
            </p>

            <h3>CotaÃ§Ãµes e valores</h3>
            <p>
              Valores e condiÃ§Ãµes exibidos no site sÃ£o ilustrativos durante a preparaÃ§Ã£o dos cards
              de planos e servem para orientaÃ§Ã£o. O valor oficial de cada plano depende de perfil,
              idade, regiÃ£o e modalidade, e Ã© confirmado apenas na cotaÃ§Ã£o efetiva junto Ã 
              operadora. Nenhuma condiÃ§Ã£o apresentada aqui representa contrataÃ§Ã£o.
            </p>

            <h3>Suas responsabilidades</h3>
            <p>
              Ao preencher o formulÃ¡rio ou conversar conosco, informe dados corretos e atuais.
              InformaÃ§Ãµes incompletas podem inviabilizar ou atrasar a cotaÃ§Ã£o. VocÃª Ã© responsÃ¡vel
              pelo uso adequado das informaÃ§Ãµes de contato fornecidas.
            </p>

            <h3>Links externos</h3>
            <p>
              Nosso site pode conter links para WhatsApp, Instagram, e-mail e sites de operadoras.
              Cada serviÃ§o externo tem seus prÃ³prios termos e polÃ­tica de privacidade; a Nexa nÃ£o Ã©
              responsÃ¡vel pelo conteÃºdo ou tratamento de dados desses ambientes.
            </p>

            <h3>Propriedade do conteÃºdo</h3>
            <p>
              Textos, marca, identidade visual e elementos do site pertencem Ã  Nexa Seguros. NÃ£o Ã©
              permitido copiar, reproduzir ou usar esse conteÃºdo para fins comerciais sem
              autorizaÃ§Ã£o.
            </p>

            <h3>AlteraÃ§Ãµes e lei aplicÃ¡vel</h3>
            <p>
              Estes termos podem ser atualizados para refletir mudanÃ§as legais ou no serviÃ§o. A
              versÃ£o atual estarÃ¡ sempre disponÃ­vel nesta pÃ¡gina, com a data de atualizaÃ§Ã£o.
              Regem-se pelas leis da RepÃºblica Federativa do Brasil, com foro na comarca de
              CamaÃ§ari, BA.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer footer-legalback" data-od-id="footer-legal">
        <div className="container footer-bottom">
          <p>
            Â© <span id="year">{YEAR}</span> Nexa Seguros - CamaÃ§ari, BA.
          </p>
          <Link className="link-arrow" to="/">
            Voltar para a pÃ¡gina inicial<span aria-hidden="true"> â†’</span>
          </Link>
        </div>
      </footer>
    </>
  );
}
