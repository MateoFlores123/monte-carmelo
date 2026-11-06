import EspecialidadesBuscador from "@/components/EspecialidadesBuscador/EspecialidadesBuscador";
import JsonLd from "@/components/Seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

// Antes esta página era "use client" entera, por eso no podía tener
// título ni descripción propios (Google la veía como "Clínica Monte
// Carmelo" sin más). Ahora la página es de servidor y el buscador
// interactivo vive en su propio componente.
export const metadata = {
  title: { absolute: "Especialidades Médicas en Arequipa | Monte Carmelo Centro Médico" },
  description:
    "Más de 28 especialidades médicas en Arequipa: cardiología, oncología, neumología, endocrinología, oftalmología, pediatría, ginecología, traumatología y más. Agenda tu cita por WhatsApp.",
  alternates: { canonical: "/especialidades" },
  openGraph: { url: "/especialidades" },
};

export default function EspecialidadesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Especialidades", path: "/especialidades" },
        ])}
      />
      <EspecialidadesBuscador />
    </>
  );
}
