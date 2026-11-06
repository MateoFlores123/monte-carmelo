// ─────────────────────────────────────────────────────────────
// Datos del negocio en UN solo lugar. Lo usan el <head>, el schema
// (datos estructurados para Google), el footer y las páginas SEO.
//
// ⚠️ IMPORTANTE: el nombre, la dirección y el teléfono (NAP) deben ser
// EXACTAMENTE iguales a los de tu Perfil de Empresa en Google Maps,
// Facebook, Doctoralia, Páginas Amarillas, etc. Google cruza esos datos.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  url: "https://montecarmelocm.com",
  name: "Monte Carmelo Centro Médico",
  legalName: "Centro Médico Monte Carmelo",
  shortName: "Monte Carmelo",
  // Logo a color (para fondos claros y para Google). /logo.webp es la versión blanca.
  logo: "/logo-color.webp",
  // Imagen 1200x630 que se ve al compartir el link en WhatsApp/Facebook.
  // Es la única en .jpg a propósito: algunas redes no muestran previews en WebP.
  ogImage: "/og-image.jpg",

  address: {
    street: "Calle Francisco Gómez de la Torre 119", // ← confirmar
    district: "Arequipa", // ← p.ej. "Cercado de Arequipa" si corresponde
    city: "Arequipa",
    region: "Arequipa",
    postalCode: "", // ← opcional, p.ej. "04001"
    country: "PE",
  },
  // Coordenadas exactas: en Google Maps clic derecho sobre la clínica → copiar.
  geo: { lat: null as number | null, lng: null as number | null },
  // Link "Compartir" de tu ficha de Google Maps (https://maps.app.goo.gl/...)
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Centro+M%C3%A9dico+Monte+Carmelo+Arequipa",

  phones: {
    // Número de contacto de Medicina Ocupacional (llamadas y WhatsApp)
    ocupacional: { display: "+51 991 437 584", href: "+51991437584", whatsapp: "51991437584" },
    // ⚠️ El número asistencial que había en Contacto.jsx era de ejemplo.
    asistencial: { display: "", href: "" },
    // WhatsApp general / asistencial (botones flotantes y citas de especialidades)
    whatsapp: "51959635451",
  },
  emails: {
    ocupacional: "ocupacional.comercial@montecarmelocm.com",
    operaciones: "operaciones.montecarmelo@montecarmelocm.com",
  },

  // Horario de atención (formato schema.org). Ajusta a tu horario real.
  // Ejemplo: [{ days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "07:00", closes: "19:00" },
  //           { days: ["Saturday"], opens: "07:00", closes: "13:00" }]
  hours: [] as { days: string[]; opens: string; closes: string }[],

  socials: [
    "https://www.facebook.com/CMMonteCarmelo/",
    "https://www.instagram.com/montecarmelo_med/",
    "https://www.youtube.com/watch?v=ob0OF_IQbK8",
  ],
  foundedYear: 1993, // "más de 31/33 años" — ajusta al año real de fundación
  occupationalSince: 2008,
} as const;

export const fullAddress = [
  SITE.address.street,
  SITE.address.district !== SITE.address.city ? SITE.address.district : null,
  SITE.address.city,
]
  .filter(Boolean)
  .join(", ");

export const whatsappLink = (text?: string, phone: string = SITE.phones.whatsapp) =>
  `https://wa.me/${phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// WhatsApp de Medicina Ocupacional (+51 991 437 584)
export const whatsappOcupacional = (text?: string) => whatsappLink(text, SITE.phones.ocupacional.whatsapp);

export const absoluteUrl = (path = "/") => new URL(path, SITE.url).toString();
