import { asset } from "../lib/site.js";
import { ChevronDown, Heart, Smile, Building2, ShieldCheck, RefreshCw, User, BarChart3, ArrowRight, Search } from "lucide-react";

const LOGOS = [
  "/img/logos/amil.png",
  "/img/logos/bradesco.png",
  "/img/logos/sulamerica.png",
  "/img/logos/hapvida.png",
  "/img/logos/seguros-unimed.png",
  "/img/logos/amil-dental.png",
  "/img/logos/bradesco-dental.png",
  "/img/logos/sulamerica-odonto.png",
  "/img/logos/hapvida-odonto.png"
];

export default function Logos() {
  return (
    <section className="section" id="operadoras" style={{ paddingBlock: "clamp(40px, 5vw, 64px)" }}>
      <div className="container">
        <p className="trust-line r">Trabalhamos com as principais operadoras de saúde e odontologia do Brasil</p>
        <div className="logo-strip-wrap r">
          <div className="logo-strip">
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <img key={i} src={asset(src)} alt="" loading="lazy" decoding="async" aria-hidden={i >= LOGOS.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
