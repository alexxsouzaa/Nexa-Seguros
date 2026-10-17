import SEOHead from "../components/SEOHead.jsx";
import LegalLayout from "../components/LegalLayout.jsx";

export default function Termos() {
  return (
    <LegalLayout>
      <SEOHead
        title="Termos de Uso | Nexa Seguros"
        description="Conheça os termos de uso do site da Nexa Seguros. Assessoria em planos de saúde e odontológicos em Camaçari, BA. Cotação gratuita e sem compromisso."
        path="/termos"
        robots="index,follow"
      />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo principal</a>

      <section className="legal-hero">
        <div className="container">
          <p className="eyebrow">Documentos</p>
          <h1>Termos de uso</h1>
          <p className="legal-meta">
            Última atualização: outubro de 2026. Estes termos valem para o uso do site
            www.nexaseguros.com.br e para o atendimento realizado pela Nexa Seguros em Camaçari,
            BA.
          </p>
        </div>
      </section>

      <section className="legal-section" id="o-que-fazemos">
        <div className="container">
          <h2>O que fazemos</h2>
          <p>
            Ao usar o site da Nexa Seguros, você concorda com estes termos. Este é o nosso
            compromisso, em linguagem clara, de como funciona o serviço.
          </p>
          <p>
            A Nexa não é uma operadora: fazemos assessoria para você comparar planos de saúde e
            odontológicos das operadoras do mercado e escolher a opção mais adequada ao seu perfil.
            Indicações feitas por nós nunca substituem as condições oficiais da operadora.
          </p>
        </div>
      </section>

      <section className="legal-section" id="cotacoes-valores">
        <div className="container">
          <h2>Cotações e valores</h2>
          <p>
            Valores e condições exibidos no site são ilustrativos durante a preparação dos cards de
            planos e servem para orientação. O valor oficial de cada plano depende de perfil, idade,
            região e modalidade, e é confirmado apenas na cotação efetiva junto à operadora. Nenhuma
            condição apresentada aqui representa contratação.
          </p>
        </div>
      </section>

      <section className="legal-section" id="suas-responsabilidades">
        <div className="container">
          <h2>Suas responsabilidades</h2>
          <p>
            Ao preencher o formulário ou conversar conosco, informe dados corretos e atuais.
            Informações incompletas podem inviabilizar ou atrasar a cotação. Você é responsável pelo
            uso adequado das informações de contato fornecidas.
          </p>
        </div>
      </section>

      <section className="legal-section" id="links-externos">
        <div className="container">
          <h2>Links externos</h2>
          <p>
            Nosso site pode conter links para WhatsApp, Instagram, e-mail e sites de operadoras.
            Cada serviço externo tem seus próprios termos e política de privacidade; a Nexa não é
            responsável pelo conteúdo ou tratamento de dados desses ambientes.
          </p>
        </div>
      </section>

      <section className="legal-section" id="propriedade-conteudo">
        <div className="container">
          <h2>Propriedade do conteúdo</h2>
          <p>
            Textos, marca, identidade visual e elementos do site pertencem à Nexa Seguros. Não é
            permitido copiar, reproduzir ou usar esse conteúdo para fins comerciais sem
            autorização.
          </p>
        </div>
      </section>

      <section className="legal-section" id="alteracoes-lei">
        <div className="container">
          <h2>Alterações e lei aplicável</h2>
          <p>
            Estes termos podem ser atualizados para refletir mudanças legais ou no serviço. A versão
            atual estará sempre disponível nesta página, com a data de atualização. Regem-se pelas
            leis da República Federativa do Brasil, com foro na comarca de Camaçari, BA.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
