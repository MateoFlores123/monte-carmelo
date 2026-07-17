import LegalDoc from "@/components/LegalDoc/LegalDoc";

export const metadata = {
  title: "Política de Privacidad | Monte Carmelo Centro Médico",
  description:
    "Conoce cómo Monte Carmelo Centro Médico recopila, usa y protege tus datos personales, conforme a la Ley N° 29733.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <LegalDoc
      eyebrow="Monte Carmelo Centro Médico"
      title="Política de Privacidad"
      updated="17 de julio de 2026"
    >
      <p>
        En Monte Carmelo Centro Médico 
        respetamos tu privacidad y nos comprometemos a proteger los datos
        personales que nos confías al utilizar nuestros servicios
        asistenciales, ocupacionales y este sitio web. Esta política se rige
        por la Ley N° 29733, Ley de Protección de Datos Personales, y su
        Reglamento (D.S. N° 003-2013-JUS).
      </p>

      <h2>1. Responsable del tratamiento de datos</h2>
      <p>
        Monte Carmelo Centro Médico es el responsable del tratamiento de los
        datos personales recogidos a través de este sitio, formularios de
        contacto, agendamiento de citas y el Libro de Reclamaciones. Para
        cualquier consulta sobre esta política, puedes escribirnos a{" "}
        <a href="mailto:operaciones.montecarmelo@montecarmelocm.com">
          operaciones.montecarmelo@montecarmelocm.com
        </a>
        .
      </p>

      <h2>2. Datos que recopilamos</h2>
      <p>Según el servicio o formulario que utilices, podemos recopilar:</p>
      <ul>
        <li>
          <strong>Datos de identificación:</strong> nombres, apellidos, tipo y
          número de documento de identidad.
        </li>
        <li>
          <strong>Datos de contacto:</strong> teléfono, correo electrónico y,
          cuando aplique, dirección domiciliaria.
        </li>
        <li>
          <strong>Datos de salud:</strong> información clínica y resultados
          de exámenes médicos ocupacionales o asistenciales, tratados con
          especial confidencialidad conforme a la normativa de historias
          clínicas y salud ocupacional vigente.
        </li>
        <li>
          <strong>Datos laborales:</strong> empresa empleadora y puesto de
          trabajo, en el caso de exámenes médicos ocupacionales.
        </li>
        <li>
          <strong>Datos de navegación:</strong> dirección IP, tipo de
          navegador y páginas visitadas, recogidos de forma automática al
          navegar por el sitio.
        </li>
      </ul>

      <h2>3. Finalidad del tratamiento</h2>
      <p>Utilizamos tus datos personales para:</p>
      <ul>
        <li>
          Gestionar la atención médica, agendamiento de citas y emisión de
          resultados o certificados.
        </li>
        <li>
          Responder consultas, solicitudes de contacto y registros del Libro
          de Reclamaciones.
        </li>
        <li>
          Cumplir obligaciones legales frente a entidades de salud y trabajo
          (SUNAFIL, MINSA, EsSalud, entre otras) cuando corresponda.
        </li>
        <li>
          Enviar comunicaciones administrativas relacionadas con el servicio
          contratado (confirmaciones, recordatorios de citas, respuestas a
          reclamos).
        </li>
        <li>Mejorar la experiencia de navegación en nuestro sitio web.</li>
      </ul>

      <h2>4. Base legal y consentimiento</h2>
      <p>
        El tratamiento de tus datos se basa en tu consentimiento expreso,
        otorgado al completar nuestros formularios, así como en la ejecución
        de la relación de servicios de salud contratada y en el cumplimiento
        de obligaciones legales aplicables al sector salud.
      </p>

      <h2>5. Confidencialidad de la información de salud</h2>
      <p>
        La información clínica generada durante tu atención se maneja bajo
        el deber de reserva y confidencialidad que corresponde a toda
        historia clínica, y solo es accedida por personal autorizado
        directamente involucrado en tu atención médica.
      </p>

      <h2>6. Comunicación a terceros</h2>
      <p>
        No vendemos ni cedemos tus datos personales a terceros con fines
        comerciales. Podemos compartir información únicamente cuando sea
        necesario para: cumplir mandatos de autoridades competentes,
        entregar resultados a la empresa empleadora en exámenes ocupacionales
        (previa autorización correspondiente), o con proveedores tecnológicos
        que nos brindan servicios de hosting y correo electrónico, quienes
        están obligados a mantener la confidencialidad de la información.
      </p>

      <h2>7. Plazo de conservación</h2>
      <p>
        Conservamos tus datos personales durante el tiempo necesario para
        cumplir con las finalidades descritas y con los plazos mínimos de
        conservación de historias clínicas establecidos por la normativa
        sanitaria peruana.
      </p>

      <h2>8. Tus derechos (ARCO)</h2>
      <p>
        Como titular de datos personales, tienes derecho a Acceder,
        Rectificar, Cancelar y Oponerte (derechos ARCO) al tratamiento de tus
        datos, así como a revocar tu consentimiento en cualquier momento.
        Para ejercer estos derechos, escríbenos a{" "}
        <a href="mailto:operaciones.montecarmelo@montecarmelocm.com">
          operaciones.montecarmelo@montecarmelocm.com
        </a>{" "}
        indicando tu nombre completo, documento de identidad y la solicitud
        específica.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Este sitio puede utilizar cookies propias y de terceros para
        recordar tus preferencias y analizar el uso del sitio. Puedes
        configurar tu navegador para rechazar cookies, aunque esto podría
        afectar algunas funcionalidades del sitio.
      </p>

      <h2>10. Menores de edad</h2>
      <p>
        En el caso de pacientes menores de edad, el tratamiento de datos se
        realiza con la autorización del padre, madre o tutor legal, quien
        actúa como titular del ejercicio de los derechos correspondientes.
      </p>

      <h2>11. Cambios a esta política</h2>
      <p>
        Podemos actualizar esta política de privacidad para reflejar cambios
        normativos u operativos. La fecha de la última actualización se
        indica al inicio de este documento.
      </p>
    </LegalDoc>
  );
}