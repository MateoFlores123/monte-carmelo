import Link from "next/link";
import SeoPage, { Section, CardGrid, Steps, Faq, CtaBand } from "@/components/SeoPage/SeoPage";
import { serviceSchema } from "@/lib/schema";
import { SITE, fullAddress } from "@/lib/site";

// Página para: "exámenes médicos ocupacionales arequipa", "EMO arequipa",
// "examen pre ocupacional arequipa", "examen médico de retiro arequipa".
// ⚠️ La lista de evaluaciones complementarias es la habitual en un EMO:
//    deja SOLO las que realmente hacen en la clínica.

const PATH = "/examenes-medicos-ocupacionales-arequipa";
const WA = "Hola, quisiera cotizar exámenes médicos ocupacionales (EMO) para mi empresa";

export const metadata = {
  title: { absolute: "Exámenes Médicos Ocupacionales en Arequipa (EMO) | Monte Carmelo" },
  description:
    "Exámenes médicos ocupacionales en Arequipa: pre ocupacionales, periódicos y de retiro, con evaluaciones complementarias según el puesto. Resultados en plataforma MEDIWEB. Cotiza para tu empresa.",
  alternates: { canonical: PATH },
  openGraph: {
    url: PATH,
    title: "Exámenes Médicos Ocupacionales en Arequipa | Monte Carmelo",
    description: "EMO pre ocupacionales, periódicos y de retiro para empresas en Arequipa.",
  },
};

const FAQS = [
  {
    q: "¿Qué es un examen médico ocupacional (EMO)?",
    a: "Es una evaluación médica que se realiza al trabajador para determinar si está apto para su puesto y vigilar que su salud no se vea afectada por los riesgos del trabajo. Puede ser pre ocupacional (antes de ingresar), periódico (durante la relación laboral) o de retiro (al terminar).",
  },
  {
    q: "¿Qué incluye un examen pre ocupacional?",
    a: "Incluye una evaluación médica general y las pruebas complementarias que correspondan a los riesgos del puesto, como análisis de laboratorio, evaluación visual, auditiva, respiratoria, cardiológica o psicológica. El protocolo final lo define la empresa junto con el médico ocupacional.",
  },
  {
    q: "¿Cada cuánto se realiza el examen médico ocupacional periódico?",
    a: "La periodicidad la establece la normativa de seguridad y salud en el trabajo vigente y el nivel de riesgo del puesto. Te orientamos para definir la frecuencia adecuada para cada grupo de trabajadores.",
  },
  {
    q: "¿El examen médico de retiro es obligatorio?",
    a: "El examen de retiro permite dejar constancia del estado de salud del trabajador al terminar su vínculo laboral y se realiza según lo que disponga la normativa vigente y la política de la empresa. Consúltanos para tu caso.",
  },
  {
    q: "¿Dónde se realizan los exámenes ocupacionales en Arequipa?",
    a: `En nuestras instalaciones de ${SITE.name} (${fullAddress}). Escríbenos para programar las evaluaciones de tu personal.`,
  },
];

export default function ExamenesOcupacionalesPage() {
  return (
    <SeoPage
      path={PATH}
      crumb="Exámenes médicos ocupacionales"
      eyebrow="Salud ocupacional · EMO"
      h1="Exámenes Médicos Ocupacionales en Arequipa"
      image={{ src: "/images/ocupacional/galeria-2.webp", alt: "Examen médico ocupacional a trabajador en Arequipa" }}
      waText={WA}
      faqs={FAQS}
      schema={[
        serviceSchema({
          name: "Exámenes médicos ocupacionales en Arequipa",
          path: PATH,
          serviceType: "Examen médico ocupacional",
          description: "Exámenes médicos ocupacionales pre ocupacionales, periódicos y de retiro para empresas en Arequipa.",
        }),
      ]}
      lead={
        <p>
          Realizamos <strong>exámenes médicos ocupacionales (EMO)</strong> adaptados al perfil y a los
          riesgos de cada puesto de trabajo. Evaluamos a tu personal con médicos especialistas,
          entregamos la aptitud de forma clara y gestionamos los resultados en nuestra plataforma
          digital MEDIWEB. Parte de nuestro servicio de{" "}
          <Link href="/salud-ocupacional-arequipa">salud ocupacional en Arequipa</Link>.
        </p>
      }
    >
      <Section eyebrow="Tipos de EMO" title="Tipos de exámenes médicos ocupacionales">
        <CardGrid
          items={[
            {
              title: "Examen pre ocupacional",
              text: "Antes del ingreso del trabajador. Determina su aptitud para el puesto y deja una línea base de su estado de salud.",
            },
            {
              title: "Examen ocupacional periódico",
              text: "Durante la relación laboral. Permite vigilar la salud del trabajador y detectar a tiempo efectos de los riesgos del puesto.",
            },
            {
              title: "Examen de retiro",
              text: "Al término del vínculo laboral. Registra el estado de salud del trabajador al finalizar sus labores.",
            },
            {
              title: "Exámenes complementarios",
              text: "Pruebas adicionales según los riesgos del puesto, definidas en el protocolo de la empresa.",
            },
          ]}
        />
      </Section>

      <Section tone="soft" eyebrow="Evaluaciones" title="¿Qué evaluaciones pueden incluir?">
        <p>
          Cada protocolo se arma según los riesgos del puesto (físicos, químicos, ergonómicos,
          psicosociales, trabajos en altura, conducción de vehículos, etc.). Entre las evaluaciones
          más frecuentes:
        </p>
        <CardGrid
          items={[
            { title: "Evaluación médica", text: "Historia clínica ocupacional y examen físico completo." },
            { title: "Laboratorio", text: "Hemograma, glucosa, perfil lipídico, grupo sanguíneo y otras pruebas según el protocolo." },
            { title: "Evaluación visual y auditiva", text: "Agudeza visual y evaluación auditiva para puestos expuestos a ruido." },
            { title: "Evaluación respiratoria y cardiológica", text: "Espirometría, radiografía de tórax y electrocardiograma cuando el puesto lo requiere." },
            { title: "Evaluación psicológica", text: "Para puestos de alta exigencia, conducción o trabajos críticos." },
          ]}
        />
      </Section>

      <Section eyebrow="Proceso" title="¿Cómo trabajamos con tu empresa?">
        <Steps
          steps={[
            { title: "Cotización", text: "Nos indicas el número de trabajadores, los puestos y el tipo de examen. Te enviamos una propuesta." },
            { title: "Programación", text: "Coordinamos fechas y horarios para que tu personal sea evaluado sin afectar la operación." },
            { title: "Evaluación", text: "Tus trabajadores pasan sus evaluaciones en nuestro centro médico en Arequipa." },
            { title: "Resultados", text: "Entregamos aptitudes y reportes de forma segura a través de la plataforma MEDIWEB." },
          ]}
        />
      </Section>

      <Section tone="soft" eyebrow="Preguntas frecuentes" title="Preguntas sobre exámenes ocupacionales">
        <Faq faqs={FAQS} />
      </Section>

      <CtaBand
        title="Programa los exámenes ocupacionales de tu personal"
        text="Atendemos empresas de todos los tamaños en Arequipa."
        waText={WA}
      />
    </SeoPage>
  );
}
