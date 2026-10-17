import SEOHead from "./SEOHead.jsx";
import Nav from "./Nav.jsx";

export default function LegalLayout({ children }) {
  return (
    <>
      <Nav minimal />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
    </>
  );
}
