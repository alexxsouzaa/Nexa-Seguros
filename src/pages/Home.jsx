import { useEffect } from "react";
import { useReveal } from "../hooks/useReveal.js";
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

  useEffect(() => {
    document.title =
      "Nexa Seguros | Assessoria em Planos de Saúde e Odontológicos em Camaçari";
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.nexaseguros.com.br/");
  }, []);

  return (
    <>
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
