import { SITE, absoluteUrl } from "./site";

// Datos estructurados (schema.org) que Google lee para entender que
// esto es una clínica física en Arequipa: alimenta el panel de
// empresa, el "map pack" y los resultados enriquecidos.

const CLINIC_ID = absoluteUrl("/#clinica");

export function clinicSchema() {
  const { address, geo, hours, phones, emails } = SITE;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_ID,
    name: SITE.name,
    alternateName: [SITE.legalName, "Clínica Monte Carmelo", "Monte Carmelo Arequipa"],
    description:
      "Centro médico en Arequipa con más de 30 años de experiencia. Salud ocupacional (exámenes médicos ocupacionales pre ocupacionales, periódicos y de retiro) y medicina asistencial con especialistas. IPRESS categoría I-3.",
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.ogImage),
    telephone: phones.ocupacional.href,
    email: emails.ocupacional,
    foundingDate: String(SITE.foundedYear),
    priceRange: "$$",
    currenciesAccepted: "PEN",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      addressCountry: address.country,
    },
    areaServed: [
      { "@type": "City", name: "Arequipa" },
      { "@type": "AdministrativeArea", name: "Región Arequipa" },
    ],
    sameAs: SITE.socials,
    hasMap: SITE.mapsUrl,
    availableService: [
      { "@type": "MedicalTest", name: "Examen médico pre ocupacional" },
      { "@type": "MedicalTest", name: "Examen médico ocupacional periódico" },
      { "@type": "MedicalTest", name: "Examen médico de retiro" },
      { "@type": "MedicalTest", name: "Exámenes complementarios ocupacionales" },
      { "@type": "MedicalProcedure", name: "Vigilancia médica ocupacional" },
    ],
    medicalSpecialty: ["Oncologic", "Pulmonary", "Endocrine", "Cardiovascular", "PrimaryCare"],
  };

  if (geo.lat != null && geo.lng != null) {
    schema.geo = { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng };
  }
  if (hours.length) {
    schema.openingHoursSpecification = hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE.url,
    name: SITE.name,
    inLanguage: "es-PE",
    publisher: { "@id": CLINIC_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(opts: { name: string; path: string; description: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": CLINIC_ID },
    areaServed: { "@type": "City", name: "Arequipa" },
  };
}
