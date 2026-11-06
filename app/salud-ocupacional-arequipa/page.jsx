import Link from "next/link";
import SeoPage, { Section, CardGrid, Faq, CtaBand } from "@/components/SeoPage/SeoPage";
import { serviceSchema } from "@/lib/schema";
import { SITE, fullAddress } from "@/lib/site";

// Página pilar para: "salud ocupacional arequipa", "centro médico
// ocupacional arequipa", "clínica ocupacional arequipa".
// ⚠️ Revisa que cada afirmación sea 100% cierta para tu clínica antes de publicar.

const PATH = "/salud-ocupacional-arequipa";
const YEARS_OCC = new Date().getFullYear() - SITE.occupationalSince;

export const metadata = {
  title: { absolute: "Salud Ocupacional en Arequipa | Centro Médico Ocupacional Monte Carmelo" },
  description: `Centro médico ocupacional en Arequipa desde ${SITE.occupationalSince}. Exámenes médicos ocupacionales (EMO), vigilancia médica y reportes para empresas con plataforma MEDIWEB. IPRESS I-3. Cotiza hoy.`,
  alternates: { canonical: PATH },
  openGraph: {
    url: PATH,
    title: "Salud Ocupacional en Arequipa | Monte Carmelo",
    description: "Clínica ocupacional en Arequipa: exámenes médicos ocupacionales y vigilancia de la salud para empresas.",
  },
};

const FAQS = [
  {
    q: "¿Dónde queda su centro médico ocupacional en Arequipa?",
    a: `Nuestra Unidad de Medicina Ocupacional funciona en ${SITE.name}, en ${fullAddress}. Atendemos a empresas y trabajadores de Arequipa y de toda la región.`,
  },
  {
    q: "¿Qué servicios de salud ocupacional ofrecen a las empresas?",
    a: "Realizamos exámenes médicos ocupacionales pre ocupacionales (de ingreso), periódicos y de retiro, exámenes complementarios según el puesto, vigilancia médica ocupacional y entrega de resultados y reportes para la empresa a través de nuestra plataforma digital MEDIWEB.",
  },
  {
    q: "¿Están obligadas las empresas a realizar exámenes médicos ocupacionales?",
    a: "Sí. La Ley N° 29783, Ley de Seguridad y Salud en el Trabajo, y sus normas complementarias establecen que el empleador debe practicar exámenes médicos a sus trabajadores. La periodicidad y el contenido dependen de la normativa vigente y de los riesgos de cada puesto; nuestro equipo te orienta para cumplirla.",
  },
  {
    q: "¿Cómo recibe la empresa los resultados?",
    a: "Los resultados médicos ocupacionales se gestionan de forma segura y confidencial en nuestra plataforma digital MEDIWEB, donde la empresa puede consultar la aptitud de sus trabajadores y descargar sus reportes.",
  },
  {
    q: "¿Cómo solicito una cotización para mi empresa?",
    a: `Escríbenos por WhatsApp o al correo ${SITE.emails.ocupacional} indicando el número de trabajadores, los puestos y el tipo de examen. Te enviamos una propuesta adaptada a los riesgos de tu empresa.`,
  },
];

export default function SaludOcupacionalArequipaPage() {
  return (
    <SeoPage
      path={PATH}
      crumb="Salud ocupacional en Arequipa"
      eyebrow="Centro médico ocupacional"
      h1="Salud Ocupacional en Arequipa"
      image={{ src: "/images/nosotros.webp", alt: "Equipo de Salud Ocupacional de Monte Carmelo Centro Médico frente a su sede en Arequipa", position: "center 45%" }}
      waText="Hola, quisiera una cotización de salud ocupacional para mi empresa"
      faqs={FAQS}
      schema={[
        serviceSchema({
          name: "Salud ocupacional en Arequipa",
          path: PATH,
          serviceType: "Salud ocupacional",
          description: "Exámenes médicos ocupacionales, vigilancia médica y gestión de resultados para empresas en Arequipa.",
        }),
      ]}
      lead={
        <>
          <p>
            En <strong>{SITE.name}</strong> contamos con una Unidad de Medicina Ocupacional activa desde{" "}
            {SITE.occupationalSince}: más de {YEARS_OCC} años cuidando la salud de los trabajadores de
            Arequipa. Somos un establecimiento <strong>IPRESS categoría I-3</strong> con infraestructura
            propia y especialistas para evaluar, prevenir y gestionar la salud laboral de tu empresa.
          </p>
        </>
      }
    >
      <Section eyebrow="Servicios para empresas" title="Servicios de salud ocupacional">
        <p>
          Acompañamos a la empresa en todo el ciclo de la salud laboral: desde el examen de ingreso
          hasta el de retiro, con información clara para el área de Seguridad y Salud en el Trabajo
          (SST) y Recursos Humanos.
        </p>
        <CardGrid
          items={[
            {
              title: "Exámenes médicos ocupacionales (EMO)",
              href: "/examenes-medicos-ocupacionales-arequipa",
              text: "Evaluaciones pre ocupacionales, periódicas y de retiro adaptadas al perfil y a los riesgos de cada puesto de trabajo.",
            },
            {
              title: "Vigilancia médica ocupacional",
              text: "Seguimiento de la salud de los trabajadores expuestos a riesgos, para detectar a tiempo alteraciones relacionadas con el trabajo.",
            },
            {
              title: "Prevención de enfermedades ocupacionales",
              text: "Identificamos riesgos laborales y alteraciones de salud asociadas al trabajo para prevenir enfermedades ocupacionales.",
            },
            {
              title: "Resultados y reportes en MEDIWEB",
              text: "Plataforma digital para consultar resultados, aptitudes y reportes de la empresa con información segura y confidencial.",
            },
          ]}
        />
      </Section>

      <Section tone="soft" eyebrow="Por qué elegirnos" title="Tu clínica ocupacional en Arequipa">
        <CardGrid
          items={[
            { title: `Desde ${SITE.occupationalSince}`, text: `Más de ${YEARS_OCC} años de experiencia en medicina ocupacional y más de 30 años como centro médico en Arequipa.` },
            { title: "IPRESS I-3", text: "Establecimiento de salud categorizado, con profesionales especializados e infraestructura propia." },
            { title: "Especialistas en un solo lugar", text: "Si un examen requiere interconsulta, contamos con médicos especialistas dentro del mismo centro." },
            { title: "Información confidencial", text: "Resultados manejados con protocolos de confidencialidad y entregados por canales seguros." },
          ]}
        />
      </Section>

      <Section eyebrow="Marco legal" title="Salud ocupacional y normativa peruana">
        <p>
          En el Perú, la <strong>Ley N° 29783, Ley de Seguridad y Salud en el Trabajo</strong>, su reglamento y
          las normas técnicas del Ministerio de Salud obligan al empleador a vigilar la salud de sus
          trabajadores mediante exámenes médicos ocupacionales. Cumplir esta obligación protege a tu
          equipo y evita sanciones de SUNAFIL.
        </p>
        <p>
          Nuestro equipo te orienta sobre qué evaluaciones corresponden a cada puesto según su nivel de
          riesgo. Conoce el detalle de cada tipo de examen en nuestra página de{" "}
          <Link href="/examenes-medicos-ocupacionales-arequipa">exámenes médicos ocupacionales en Arequipa</Link>.
        </p>
      </Section>

      <Section tone="soft" eyebrow="Preguntas frecuentes" title="Preguntas sobre salud ocupacional">
        <Faq faqs={FAQS} />
      </Section>

      <CtaBand
        title="Cotiza la salud ocupacional de tu empresa"
        text="Cuéntanos cuántos trabajadores y qué puestos necesitas evaluar. Te respondemos con una propuesta a la medida."
        waText="Hola, quisiera una cotización de salud ocupacional para mi empresa"
      />
    </SeoPage>
  );
}
