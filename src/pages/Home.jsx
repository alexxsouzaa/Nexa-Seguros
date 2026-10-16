import { useEffect } from "react";
import { useReveal } from "../hooks/useReveal.js";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppFloat from "../components/WhatsAppFloat.jsx";
import Hero from "../sections/Hero.jsx";
import Logos from "../sections/Logos.jsx";
import Categories from "../sections/Categories.jsx";
import ValueProps from "../sections/ValueProps.jsx";
import Simulator from "../sections/Simulator.jsx";
import QuestionAccordion from "../sections/QuestionAccordion.jsx";
import Roles from "../sections/Roles.jsx";
import Testimonials from "../sections/Testimonials.jsx";
import Pricing from "../sections/Pricing.jsx";
import HelpCenter from "../sections/HelpCenter.jsx";
import Faq from "../sections/Faq.jsx";
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
        <Hero />
        <Logos />
        <ValueProps />
        <Categories />
        <Simulator />
        <QuestionAccordion />
        <Roles />
        <Testimonials />
        <Pricing />
        <HelpCenter />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
