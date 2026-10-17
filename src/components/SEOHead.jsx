import { useEffect } from "react";
import {
  CANONICAL_BASE,
  ORGANIZATION_SCHEMA,
  LOCAL_BUSINESS_SCHEMA,
  SITE_NAME,
  SITE_DESCRIPTION,
  seoTitle,
  seoDescription,
} from "../lib/site.js";

export default function SEOHead({
  title = SITE_NAME,
  description = SITE_DESCRIPTION,
  path = "/",
  image = "/og-image.png",
  type = "website",
  robots = "index,follow",
}) {
  const canonical = CANONICAL_BASE + (path === "/" ? "" : path);
  const alternates = [
    { hrefLang: "pt-BR", href: canonical },
    { hrefLang: "x-default", href: canonical },
  ];

  useEffect(() => {
    document.title = seoTitle(title);

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setProp = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.property = property;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel, href, attrs = {}) => {
      let el = document.querySelector(`link[rel="${rel}"]${attrs.hrefLang ? `[hreflang="${attrs.hrefLang}"]` : ""}`);
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        if (attrs.hrefLang) el.hreflang = attrs.hrefLang;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    setMeta("description", description);
    setMeta("robots", robots);
    setMeta("language", "pt-BR");
    setProp("og:title", seoTitle(title));
    setProp("og:description", description);
    setProp("og:type", type);
    setProp("og:url", canonical);
    setProp("og:site_name", SITE_NAME);
    setProp("og:image", CANONICAL_BASE + image);
    setProp("og:image:width", "1200");
    setProp("og:image:height", "630");
    setProp("og:image:alt", SITE_NAME);
    setProp("og:locale", "pt_BR");
    setProp("twitter:card", "summary_large_image");
    setProp("twitter:title", seoTitle(title));
    setProp("twitter:description", description);
    setProp("twitter:image", CANONICAL_BASE + image);

    alternates.forEach((a) => setLink("alternate", a.href, { hrefLang: a.hrefLang }));

    const link = document.querySelector('link[rel="canonical"]');
    if (link) link.href = canonical;

    // JSON-LD Organization + LocalBusiness
    const existingOrg = document.getElementById("schema-organization");
    if (!existingOrg) {
      const scriptOrg = document.createElement("script");
      scriptOrg.id = "schema-organization";
      scriptOrg.type = "application/ld+json";
      scriptOrg.textContent = JSON.stringify(ORGANIZATION_SCHEMA);
      document.head.appendChild(scriptOrg);
    }
    const existingLocal = document.getElementById("schema-localbusiness");
    if (!existingLocal) {
      const scriptLocal = document.createElement("script");
      scriptLocal.id = "schema-localbusiness";
      scriptLocal.type = "application/ld+json";
      scriptLocal.textContent = JSON.stringify(LOCAL_BUSINESS_SCHEMA);
      document.head.appendChild(scriptLocal);
    }
  }, [title, description, path, image, type, robots, canonical]);

  return null;
}
