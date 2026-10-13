import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useReveal } from "../hooks/useReveal.js";
import Nav from "../components/Nav.jsx";
import { YEAR } from "../lib/site.js";

export default function Legal() {
  useReveal();

  useEffect(() => {
    document.title = "Política de privacidade e Termos de uso | Nexa Seguros";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Documentos legais da Nexa Seguros: política de privacidade e termos de uso para cotações de planos de saúde e odontológicos em Camaçari, BA."
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.nexaseguros.com.br/legal.html");
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo principal</a>
      <Nav minimal />

      <main id="conteudo" tabIndex={-1}>
        <section className="legal-hero" data-od-id="legal-hero">
          <div className="container">
            <p className="eyebrow">Documentos</p>
            <h1>Política de privacidade e Termos de uso</h1>
            <p className="legal-meta">
              Última atualização: outubro de 2026. Estes documentos valem para o site
              www.nexaseguros.com.br e para o atendimento realizado pela Nexa Seguros em Camaçari,
              BA.
            </p>
          </div>
        </section>

        <section className="legal-section" id="privacidade" data-od-id="legal-privacidade">
          <div className="container">
            <h2>Política de privacidade</h2>
            <p>
              A Nexa Seguros respeita sua privacidade. Esta política explica, em linguagem simples,
              quais dados coletamos e como usamos, conforme a Lei Geral de Proteção de Dados (LGPD).
            </p>

            <h3>Quem somos</h3>
            <p>
              A Nexa Seguros faz assessoria em planos de saúde e odontológicos em Camaçari, BA.
              Atuamos como intermediários entre você e as operadoras: não fabricamos planos nem
              calculamos valores oficiais.
            </p>

            <h3>Dados que coletamos</h3>
            <ul>
              <li>
                No formulário de cotação: nome, WhatsApp, cidade, idade, tipo de plano e perfil
                (individual/familiar ou empresarial).
              </li>
              <li>
                Em conversas pelo WhatsApp ou e-mail: as informações que você compartilhar sobre
                seu contexto e suas necessidades.
              </li>
            </ul>

            <h3>Como usamos</h3>
            <p>
              Usamos esses dados exclusivamente para atender à sua solicitação: montar um
              comparativo de planos, encaminhar sua cotação e acompanhar o processo de contratação.
              Também usamos métricas agregadas, sem identificação pessoal, para melhorar o
              atendimento.
            </p>

            <h3>Base legal e consentimento</h3>
            <p>
              Ao enviar o formulário ou iniciar uma conversa, você consente com o uso dos dados para
              essa finalidade (art. 7º, I, da LGPD). Você pode revogar o consentimento ou pedir a
              exclusão dos seus dados a qualquer momento, pelos canais abaixo.
            </p>

            <h3>Compartilhamento</h3>
            <p>
              Não vendemos e não compartilhamos seus dados com terceiros para marketing. O acesso é
              restrito à nossa equipe. Só enviamos suas informações a uma operadora quando você
              pede uma cotação oficial com ela.
            </p>

            <h3>Guarda dos dados</h3>
            <p>
              Mantemos os dados apenas enquanto houver relação ativa com você ou exigência legal.
              Após esse período, são excluídos ou anonimizados. Comunicações são protegidas em
              trânsito e armazenadas de forma acessível somente à equipe.
            </p>

            <h3>Seus direitos</h3>
            <p>
              Você pode solicitar, a qualquer momento: acesso aos dados, correção, exclusão,
              portabilidade, informação sobre compartilhamento e revogação do consentimento. Para
              isso, fale com a gente pelos canais de contato abaixo.
            </p>

            <h3>Contato</h3>
            <p>
              Dúvidas esta política ou sobre seus dados: WhatsApp (pelo botão do site), e-mail
              contato@nexaseguros.com.br ou diretamente na nossa página inicial. Respondemos o mais
              rápido possível, em horário comercial.
            </p>
          </div>
        </section>

        <section className="legal-section" id="termos" data-od-id="legal-termos">
          <div className="container">
            <h2>Termos de uso</h2>
            <p>
              Ao usar o site da Nexa Seguros, você concorda com estes termos. Este é o nosso
              compromisso, em linguagem clara, de como funciona o serviço.
            </p>

            <h3>O que fazemos</h3>
            <p>
              A Nexa não é uma operadora: fazemos assessoria para você comparar planos de saúde e
              odontológicos das operadoras do mercado e escolher a opção mais adequada ao seu
              perfil. Indicações feitas por nós nunca substituem as condições oficiais da operadora.
            </p>

            <h3>Cotações e valores</h3>
            <p>
              Valores e condições exibidos no site são ilustrativos durante a preparação dos cards
              de planos e servem para orientação. O valor oficial de cada plano depende de perfil,
              idade, região e modalidade, e é confirmado apenas na cotação efetiva junto à
              operadora. Nenhuma condição apresentada aqui representa contratação.
            </p>

            <h3>Suas responsabilidades</h3>
            <p>
              Ao preencher o formulário ou conversar conosco, informe dados corretos e atuais.
              Informações incompletas podem inviabilizar ou atrasar a cotação. Você é responsável
              pelo uso adequado das informações de contato fornecidas.
            </p>

            <h3>Links externos</h3>
            <p>
              Nosso site pode conter links para WhatsApp, Instagram, e-mail e sites de operadoras.
              Cada serviço externo tem seus próprios termos e política de privacidade; a Nexa não é
              responsável pelo conteúdo ou tratamento de dados desses ambientes.
            </p>

            <h3>Propriedade do conteúdo</h3>
            <p>
              Textos, marca, identidade visual e elementos do site pertencem à Nexa Seguros. Não é
              permitido copiar, reproduzir ou usar esse conteúdo para fins comerciais sem
              autorização.
            </p>

            <h3>Alterações e lei aplicável</h3>
            <p>
              Estes termos podem ser atualizados para refletir mudanças legais ou no serviço. A
              versão atual estará sempre disponível nesta página, com a data de atualização.
              Regem-se pelas leis da República Federativa do Brasil, com foro na comarca de
              Camaçari, BA.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer footer-legalback" data-od-id="footer-legal">
        <div className="container footer-bottom">
          <p>
            © <span id="year">{YEAR}</span> Nexa Seguros - Camaçari, BA.
          </p>
          <Link className="link-arrow" to="/">
            Voltar para a página inicial<span aria-hidden="true"> →</span>
          </Link>
        </div>
      </footer>
    </>
  );
}
