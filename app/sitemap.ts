import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Solo URLs reales. Las de ancla (/#nosotros, /#contacto…) se quitaron:
// para Google son la misma página que "/" y solo meten ruido.
// Cada vez que crees una página nueva, agrégala aquí.
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/salud-ocupacional-arequipa", priority: 0.95, changeFrequency: "monthly" },
  { path: "/examenes-medicos-ocupacionales-arequipa", priority: 0.9, changeFrequency: "monthly" },
  { path: "/especialidades", priority: 0.8, changeFrequency: "monthly" },
  { path: "/libro-de-reclamaciones", priority: 0.2, changeFrequency: "yearly" },
  { path: "/politica-de-privacidad", priority: 0.1, changeFrequency: "yearly" },
  { path: "/terminos-y-condiciones", priority: 0.1, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE.url}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
