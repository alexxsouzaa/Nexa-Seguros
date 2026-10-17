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
}) {
  const canonical = CANONICAL_BASE + (path === "/" ? "" : path);

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

    setMeta("description", description);
    setProp("og:title", seoTitle(title));
    setProp("og:description", description);
    setProp("og:type", type);
    setProp("og:url", canonical);
    setProp("og:site_name", SITE_NAME);
    setProp("og:image", CANONICAL_BASE + image);
    setProp("og:image:width", "1200");
    setProp("og:image:height", "630");
    setProp("og:image:alt", SITE_NAME);
    setProp("twitter:card", "summary_large_image");
    setProp("twitter:title", seoTitle(title));
    setProp("twitter:description", description);
    setProp("twitter:image", CANONICAL_BASE + image);

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
  }, [title, description, path, image, type]);

  return null;
}
