import { useEffect } from "react";
import { useReveal } from "../hooks/useReveal.js";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import WhatsAppFloat from "../components/WhatsAppFloat.jsx";
import Hero from "../sections/Hero.jsx";
import QuickLinks from "../sections/QuickLinks.jsx";
import Categories from "../sections/Categories.jsx";
import Process from "../sections/Process.jsx";
import Companies from "../sections/Companies.jsx";
import Plans from "../sections/Plans.jsx";
import Simulator from "../sections/Simulator.jsx";
import About from "../sections/About.jsx";
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
        <QuickLinks />
        <Categories />
        <Process />
        <Companies />
        <Plans />
        <Simulator />
        <About />
        <Faq />
        <CtaFinal />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
