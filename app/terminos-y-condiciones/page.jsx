import LegalDoc from "@/components/LegalDoc/LegalDoc";

export const metadata = {
  title: "Términos y Condiciones | Monte Carmelo Centro Médico",
  description:
    "Términos y condiciones de uso del sitio web y servicios de Monte Carmelo Centro Médico.",
};

export default function TerminosCondicionesPage() {
  return (
    <LegalDoc
      eyebrow="Monte Carmelo Centro Médico"
      title="Términos y Condiciones"
      updated="17 de julio de 2026"
    >
      <p>
        Estos Términos y Condiciones regulan el acceso y uso del sitio web de
        Monte Carmelo Centro Médico y la relación general con los usuarios
        que solicitan información o agendan servicios a través de él. Al
        navegar o utilizar este sitio, aceptas los términos aquí descritos.
      </p>

      <h2>1. Objeto del sitio web</h2>
      <p>
        Este sitio tiene como finalidad brindar información sobre los
        servicios de salud ocupacional y asistencial de Monte Carmelo
        Centro Médico, permitir el contacto con la Clínica y canalizar
        solicitudes a través de nuestros formularios, incluyendo el Libro de
        Reclamaciones.
      </p>

      <h2>2. No sustituye una consulta médica presencial</h2>
      <p>
        La información publicada en este sitio tiene fines informativos y no
        constituye diagnóstico, tratamiento ni recomendación médica
        individual. Cualquier decisión relacionada con tu salud debe tomarse
        en el marco de una consulta médica presencial con nuestro personal
        calificado.
      </p>

      <h2>3. Uso adecuado del sitio</h2>
      <p>Al utilizar este sitio, te comprometes a:</p>
      <ul>
        <li>
          Proporcionar información veraz y actualizada en los formularios de
          contacto, agendamiento o reclamos.
        </li>
        <li>
          No utilizar el sitio con fines fraudulentos, ilícitos o que
          afecten su funcionamiento o el de terceros.
        </li>
        <li>
          No intentar acceder sin autorización a áreas restringidas del
          sitio o a sistemas internos de la Clínica.
        </li>
      </ul>

      <h2>4. Agendamiento y confirmación de citas</h2>
      <p>
        Las solicitudes de cita realizadas a través del sitio, WhatsApp o
        correo electrónico están sujetas a confirmación por parte de nuestro
        personal administrativo, según disponibilidad de horarios y
        servicios.
      </p>

      <h2>5. Propiedad intelectual</h2>
      <p>
        Los textos, imágenes, logotipos y demás contenidos de este sitio son
        propiedad de Monte Carmelo Centro Médico o se utilizan bajo licencia
        correspondiente. Queda prohibida su reproducción total o parcial sin
        autorización previa por escrito.
      </p>

      <h2>6. Enlaces a terceros</h2>
      <p>
        Este sitio puede incluir enlaces a plataformas externas (como
        WhatsApp, Facebook o Instagram). Monte Carmelo Centro Médico no se
        responsabiliza por el contenido o las políticas de privacidad de
        dichos sitios de terceros.
      </p>

      <h2>7. Libro de Reclamaciones</h2>
      <p>
        Conforme al Código de Protección y Defensa del Consumidor (Ley N°
        29571), este sitio cuenta con un Libro de Reclamaciones virtual
        disponible para registrar reclamos o quejas relacionadas con
        nuestros servicios. Las respuestas se brindan dentro del plazo legal
        establecido, al correo electrónico proporcionado por el usuario.
      </p>

      <h2>8. Protección de datos personales</h2>
      <p>
        El tratamiento de los datos personales recopilados a través de este
        sitio se rige por nuestra{" "}
        <a href="/politica-de-privacidad">Política de Privacidad</a>, la cual
        forma parte integral de estos Términos y Condiciones.
      </p>

      <h2>9. Limitación de responsabilidad</h2>
      <p>
        Monte Carmelo Centro Médico realiza esfuerzos razonables para
        mantener este sitio disponible y actualizado, pero no garantiza su
        funcionamiento ininterrumpido ni la ausencia de errores. No nos
        responsabilizamos por daños derivados del uso indebido del sitio o
        de fallas ajenas a nuestro control.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        Podemos actualizar estos Términos y Condiciones en cualquier
        momento. Los cambios entrarán en vigencia desde su publicación en
        este sitio, indicando la fecha de la última actualización.
      </p>

      <h2>11. Legislación aplicable</h2>
      <p>
        Estos Términos y Condiciones se rigen por las leyes de la República
        del Perú. Cualquier controversia se someterá a los fueros
        competentes del distrito judicial correspondiente al domicilio de la
        Clínica.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para consultas sobre estos Términos y Condiciones, escríbenos a{" "}
        <a href="mailto:operaciones.montecarmelo@montecarmelocm.com">
          operaciones.montecarmelo@montecarmelocm.com
        </a>
        .
      </p>
    </LegalDoc>
  );
}