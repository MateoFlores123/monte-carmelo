import LibroReclamaciones from "@/components/LibroReclamaciones/LibroReclamaciones";

export const metadata = {
  alternates: { canonical: "/libro-de-reclamaciones" },
  title: "Libro de Reclamaciones",
  description:
    "Registra tu reclamo o queja. Monte Carmelo Centro Médico cuenta con Libro de Reclamaciones virtual conforme a la normativa vigente.",
};

export default function LibroReclamacionesPage() {
  return <LibroReclamaciones />;
}