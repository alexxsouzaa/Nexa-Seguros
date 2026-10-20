import SEOHead from "./SEOHead.jsx";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

export default function LegalLayout({ children }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo principal</a>
      <Nav />
      <main id="conteudo" tabIndex={-1}>
        <div id="inicio" />
        {children}
      </main>
      <Footer />
    </>
  );
}
