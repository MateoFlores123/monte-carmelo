import nodemailer from "nodemailer";
import { constants as cryptoConstants } from "crypto";

function nombreCompleto(p) {
  return [p?.nombres, p?.apellidoPaterno, p?.apellidoMaterno]
    .filter(Boolean)
    .join(" ");
}

function domicilio(p) {
  return [
    p?.calle,
    p?.numeroMza,
    p?.loteInt,
    p?.urbanizacion,
    p?.distrito,
    p?.provincia,
    p?.departamento,
  ]
    .filter(Boolean)
    .join(", ");
}

export async function POST(request) {
  try {
    const data = await request.json();

    const {
      usuario,
      esMismoUsuario,
      reclamante,
      tipoReclamante,
      tipoRelacion,
      fechaOcurrencia,
      sedeOcurrencia,
      tipoProductoServicio,
      tipoRegistro, // "reclamo" | "queja"
      descripcionReclamo,
      pedido,
      fechaServicio,
      monto,
      comprobante,
      autorizaNotificacion, // "si" | "no"
      aceptaDeclaracion,
    } = data;

    // Validación mínima en servidor — nunca confiar solo en el cliente
    const camposUsuarioFaltantes =
      !usuario?.nombres ||
      !usuario?.apellidoPaterno ||
      !usuario?.apellidoMaterno ||
      !usuario?.departamento ||
      !usuario?.provincia ||
      !usuario?.distrito ||
      !usuario?.calle ||
      !usuario?.numeroMza ||
      !usuario?.fechaNacimiento ||
      !usuario?.sexo ||
      !usuario?.tipoDocumento ||
      !usuario?.numeroDocumento;

    const camposReclamanteFaltantes =
      !esMismoUsuario &&
      (!reclamante?.nombres ||
        !reclamante?.apellidoPaterno ||
        !reclamante?.apellidoMaterno ||
        !reclamante?.departamento ||
        !reclamante?.provincia ||
        !reclamante?.distrito ||
        !reclamante?.calle ||
        !reclamante?.numeroMza ||
        !reclamante?.fechaNacimiento ||
        !reclamante?.sexo ||
        !reclamante?.tipoDocumento ||
        !reclamante?.numeroDocumento ||
        !tipoReclamante ||
        !tipoRelacion);

    if (
      camposUsuarioFaltantes ||
      camposReclamanteFaltantes ||
      !fechaOcurrencia ||
      !sedeOcurrencia ||
      !tipoProductoServicio ||
      !descripcionReclamo ||
      !aceptaDeclaracion
    ) {
      return Response.json(
        { ok: false, error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    if (descripcionReclamo.length > 1500) {
      return Response.json(
        { ok: false, error: "La descripción del reclamo supera los 1500 caracteres." },
        { status: 400 }
      );
    }

    // Correo de contacto: el del titular del reclamo (reclamante si aplica, si no el del usuario)
    const contacto = esMismoUsuario ? usuario : reclamante;
    const emailContacto = contacto?.email;

    if (autorizaNotificacion === "si") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailContacto || !emailRegex.test(emailContacto)) {
        return Response.json(
          { ok: false, error: "Correo electrónico inválido para el envío de la notificación." },
          { status: 400 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            minVersion: "TLSv1",
            ciphers: "DEFAULT@SECLEVEL=0",
            rejectUnauthorized: false,
            secureOptions:
            cryptoConstants.SSL_OP_LEGACY_SERVER_CONNECT |
            cryptoConstants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
        },
    });

    const fecha = new Date().toLocaleString("es-PE", {
      timeZone: "America/Lima",
    });

    const htmlInterno = `
      <div style="font-family: Arial, sans-serif; color:#2b2b2b; line-height:1.5;">
        <h2 style="color:#662153;">Nuevo registro en el Libro de Reclamaciones</h2>
        <p><strong>Fecha de registro:</strong> ${fecha}</p>
        <p><strong>Tipo:</strong> ${tipoRegistro === "queja" ? "Queja" : "Reclamo"}</p>

        <h3 style="color:#3aa59d;">1. Identificación del usuario (paciente)</h3>
        <ul>
          <li><strong>Nombre completo:</strong> ${nombreCompleto(usuario)}</li>
          <li><strong>Documento:</strong> ${usuario.tipoDocumento} ${usuario.numeroDocumento}</li>
          <li><strong>Fecha de nacimiento:</strong> ${usuario.fechaNacimiento}</li>
          <li><strong>Sexo:</strong> ${usuario.sexo}</li>
          <li><strong>Domicilio:</strong> ${domicilio(usuario)}${usuario.referencia ? ` (Ref: ${usuario.referencia})` : ""}</li>
          <li><strong>Correo:</strong> ${usuario.email || "No proporcionado"}</li>
          <li><strong>Teléfono:</strong> ${usuario.telefono || "No proporcionado"}</li>
        </ul>

        <h3 style="color:#3aa59d;">2. Quién presenta el reclamo</h3>
        ${
          esMismoUsuario
            ? `<p>El propio usuario/paciente presenta el reclamo.</p>`
            : `
        <ul>
          <li><strong>Nombre completo:</strong> ${nombreCompleto(reclamante)}</li>
          <li><strong>Documento:</strong> ${reclamante.tipoDocumento} ${reclamante.numeroDocumento}</li>
          <li><strong>Fecha de nacimiento:</strong> ${reclamante.fechaNacimiento}</li>
          <li><strong>Sexo:</strong> ${reclamante.sexo}</li>
          <li><strong>Domicilio:</strong> ${domicilio(reclamante)}${reclamante.referencia ? ` (Ref: ${reclamante.referencia})` : ""}</li>
          <li><strong>Correo:</strong> ${reclamante.email || "No proporcionado"}</li>
          <li><strong>Teléfono:</strong> ${reclamante.telefono || "No proporcionado"}</li>
          <li><strong>Tipo de reclamante:</strong> ${tipoReclamante}</li>
          <li><strong>Tipo de relación:</strong> ${tipoRelacion}</li>
        </ul>`
        }

        <h3 style="color:#3aa59d;">3. Detalle del reclamo</h3>
        <ul>
          <li><strong>Fecha de ocurrencia:</strong> ${fechaOcurrencia}</li>
          <li><strong>Sede de ocurrencia:</strong> ${sedeOcurrencia}</li>
          <li><strong>Tipo de producto/servicio:</strong> ${tipoProductoServicio}</li>
          <li><strong>Fecha del servicio:</strong> ${fechaServicio || "No especificada"}</li>
          <li><strong>Monto reclamado:</strong> ${monto || "No especificado"}</li>
          <li><strong>N° de comprobante:</strong> ${comprobante || "No especificado"}</li>
        </ul>
        <p><strong>Descripción del reclamo:</strong><br/>${descripcionReclamo.replace(/\n/g, "<br/>")}</p>
        ${pedido ? `<p><strong>Pedido del consumidor:</strong><br/>${pedido.replace(/\n/g, "<br/>")}</p>` : ""}

        <h3 style="color:#3aa59d;">4. Autorización</h3>
        <p><strong>Autoriza notificación por correo:</strong> ${autorizaNotificacion === "si" ? "Sí" : "No"}</p>
      </div>
    `;

    // Correo interno hacia la clínica
    await transporter.sendMail({
      from: `"Libro de Reclamaciones - Monte Carmelo" <${process.env.SMTP_USER}>`,
      to: process.env.RECLAMOS_EMAIL,
      replyTo: emailContacto || undefined,
      subject: `Nuevo ${tipoRegistro === "queja" ? "Queja" : "Reclamo"} — ${nombreCompleto(usuario)}`,
      html: htmlInterno,
    });

    // Confirmación automática al consumidor, solo si autorizó notificación
    if (autorizaNotificacion === "si" && emailContacto) {
      await transporter.sendMail({
        from: `"Monte Carmelo Centro Médico" <${process.env.SMTP_USER}>`,
        to: emailContacto,
        subject: "Hemos recibido tu registro en el Libro de Reclamaciones",
        html: `
          <div style="font-family: Arial, sans-serif; color:#2b2b2b; line-height:1.5;">
            <p>Hola ${nombreCompleto(contacto)},</p>
            <p>Confirmamos la recepción de tu ${tipoRegistro === "queja" ? "queja" : "reclamo"} registrado el ${fecha}.</p>
            <p>De acuerdo a ley, tienes derecho a una respuesta en un plazo máximo de 30 días hábiles.</p>
            <p>Gracias por comunicarte con nosotros.</p>
            <p><strong>Monte Carmelo Centro Médico</strong></p>
          </div>
        `,
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error enviando libro de reclamaciones:", error);
    return Response.json(
      { ok: false, error: "No se pudo enviar el reclamo. Intenta nuevamente." },
      { status: 500 }
    );
  }
}