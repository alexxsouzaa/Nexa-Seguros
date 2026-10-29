import { useReveal } from "../hooks/useReveal.js";
import SEOHead from "../components/SEOHead.jsx";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppFloat from "../components/WhatsAppFloat.jsx";
import Hero from "../sections/Hero.jsx";
import Categories from "../sections/Categories.jsx";
import Logos from "../sections/Logos.jsx";
import Simulator from "../sections/Simulator.jsx";
import ValueProps from "../sections/ValueProps.jsx";
import Roles from "../sections/Roles.jsx";
import Faq from "../sections/Faq.jsx";
import Testimonials from "../sections/Testimonials.jsx";
import Pricing from "../sections/Pricing.jsx";
import CtaFinal from "../sections/CtaFinal.jsx";

export default function Home() {
  useReveal();

  return (
    <>
      <SEOHead
        title="Assessoria em Planos de Saúde e Odontológicos na Bahia"
        description="A Nexa Seguros faz assessoria em planos de saúde e odontológicos na Bahia para ajudar você, sua família ou sua empresa a comparar opções e escolher com confiança. Solicite uma cotação gratuita."
        path="/"
      />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo principal</a>
      <Nav />

      <main id="conteudo" tabIndex={-1}>
        {/* Apresentação */}
        <Hero />

        {/* Soluções */}
        <Categories />
        <Logos />

        {/* Processo */}
        <Simulator />

        {/* Diferenciais */}
        <ValueProps />
        <Roles />

        {/* FAQ / Conteúdo educativo */}
        <Faq />
        <Testimonials />

        {/* Preços */}
        <Pricing />

        {/* Contato */}
        <CtaFinal />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
