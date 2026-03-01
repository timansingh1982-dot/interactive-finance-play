import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  breadcrumbs: { name: string; url: string }[];
  appSchema?: {
    name: string;
    description: string;
    url: string;
    category: string;
  };
}

const SEOHead = ({ title, description, breadcrumbs, appSchema }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description);

    const scripts: HTMLScriptElement[] = [];

    // Breadcrumb schema
    const bcScript = document.createElement("script");
    bcScript.type = "application/ld+json";
    bcScript.setAttribute("data-schema", "breadcrumb");
    bcScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.url,
      })),
    });
    document.head.appendChild(bcScript);
    scripts.push(bcScript);

    // SoftwareApplication schema
    if (appSchema) {
      const appScript = document.createElement("script");
      appScript.type = "application/ld+json";
      appScript.setAttribute("data-schema", "app");
      appScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: appSchema.name,
        description: appSchema.description,
        url: appSchema.url,
        applicationCategory: appSchema.category,
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      });
      document.head.appendChild(appScript);
      scripts.push(appScript);
    }

    return () => {
      scripts.forEach((s) => document.head.removeChild(s));
    };
  }, [title, description, breadcrumbs, appSchema]);

  return null;
};

export default SEOHead;
