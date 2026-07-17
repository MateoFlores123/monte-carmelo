"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./LibroReclamaciones.module.css";

const TIPO_DOCUMENTO_OPTIONS = [
  "DNI",
  "RUC",
  "Pasaporte",
  "CEX",
  "PNAC",
  "Documento de identidad extranjero",
  "Código único de identificación",
  "Permiso temporal de permanencia",
  "Otro",
];

const SEXO_OPTIONS = ["Femenino", "Masculino"];

const PERU_DEPARTAMENTOS = [
  "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
  "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín",
  "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios",
  "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna",
  "Tumbes", "Ucayali",
];

const TIPO_RECLAMANTE_OPTIONS = [
  "Usuario / paciente titular",
  "Padre o madre",
  "Apoderado",
  "Representante legal",
  "Tutor",
  "Cónyuge",
  "Hijo(a)",
  "Otro familiar",
  "Otro tercero legitimado",
];

const TIPO_RELACION_OPTIONS = [
  "Familiar directo",
  "Representante legal",
  "Apoderado",
  "Tercero autorizado",
  "Otro",
];

// Ajusta esta lista con las sedes reales de tu centro médico
const SEDE_OPTIONS = ["Monte Carmelo — Sede Principal"];

const PRODUCTO_SERVICIO_OPTIONS = [
  "Examen médico ocupacional",
  "Consulta ocupacional",
  "Consulta asistencial",
  "Exámenes de laboratorio",
  "Otro",
];

const emptyPersona = {
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  departamento: "",
  provincia: "",
  distrito: "",
  calle: "",
  numeroMza: "",
  loteInt: "",
  urbanizacion: "",
  referencia: "",
  email: "",
  telefono: "",
  fechaNacimiento: "",
  sexo: "",
  tipoDocumento: "DNI",
  numeroDocumento: "",
};

const initialState = {
  // 1. Identificación del usuario/paciente afectado
  usuario: { ...emptyPersona },

  // 2. Identificación de quién presenta el reclamo
  esMismoUsuario: true,
  reclamante: { ...emptyPersona },
  tipoReclamante: "",
  tipoRelacion: "",

  // 3. Detalle del reclamo
  fechaOcurrencia: "",
  sedeOcurrencia: SEDE_OPTIONS[0] || "",
  tipoProductoServicio: "",
  tipoRegistro: "reclamo", // reclamo | queja (distinción propia del centro)
  descripcionReclamo: "",
  pedido: "",
  // Datos administrativos internos adicionales
  fechaServicio: "",
  monto: "",
  comprobante: "",

  // 4. Autorización y declaración
  autorizaNotificacion: "si", // si | no
  aceptaDeclaracion: false,
};

const DESCRIPCION_MAX = 1500;

export default function LibroReclamaciones() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updatePersona(group, field, value) {
    setForm((prev) => ({
      ...prev,
      [group]: { ...prev[group], [field]: value },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/libro-reclamaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Ocurrió un error al enviar el reclamo.");
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  if (status === "success") {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <div className={styles.successIcon}>✓</div>
          <h1 className={styles.title}>Registro enviado</h1>
          <p className={styles.successText}>
            Hemos recibido tu reclamo/queja. Te enviamos una confirmación al
            correo electrónico registrado. Las IAFAS, IPRESS o UGIPRESS deben
            atender el reclamo en un plazo de 30 días hábiles.
          </p>
          <Link href="/" className={styles.backLink}>
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  const descripcionLength = form.descripcionReclamo?.length || 0;

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Monte Carmelo Centro Médico</p>
        <h1 className={styles.title}>Libro de Reclamaciones</h1>
        <p className={styles.intro}>
          Conforme a la normativa de SUSALUD para IAFAS, IPRESS y UGIPRESS,
          este establecimiento cuenta con un Libro de Reclamaciones a tu
          disposición. Completa el siguiente formulario y recibirás una
          respuesta en un plazo máximo de 30 días hábiles.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 1. Identificación del usuario (paciente) o tercero legitimado */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              1. Identificación del usuario (paciente)
            </legend>

            <div className={styles.grid3}>
              <label className={styles.field}>
                <span>Nombres *</span>
                <input
                  required
                  type="text"
                  value={form.usuario.nombres}
                  onChange={(e) => updatePersona("usuario", "nombres", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Apellido paterno *</span>
                <input
                  required
                  type="text"
                  value={form.usuario.apellidoPaterno}
                  onChange={(e) => updatePersona("usuario", "apellidoPaterno", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Apellido materno *</span>
                <input
                  required
                  type="text"
                  value={form.usuario.apellidoMaterno}
                  onChange={(e) => updatePersona("usuario", "apellidoMaterno", e.target.value)}
                />
              </label>
            </div>

            <p className={styles.subLegend}>Domicilio</p>
            <div className={styles.grid3}>
              <label className={styles.field}>
                <span>Departamento *</span>
                <select
                  required
                  value={form.usuario.departamento}
                  onChange={(e) => updatePersona("usuario", "departamento", e.target.value)}
                >
                  <option value="">Seleccione</option>
                  {PERU_DEPARTAMENTOS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Provincia *</span>
                <input
                  required
                  type="text"
                  value={form.usuario.provincia}
                  onChange={(e) => updatePersona("usuario", "provincia", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Distrito *</span>
                <input
                  required
                  type="text"
                  value={form.usuario.distrito}
                  onChange={(e) => updatePersona("usuario", "distrito", e.target.value)}
                />
              </label>
            </div>

            <div className={styles.grid3}>
              <label className={styles.field}>
                <span>Calle / Av. / Jr. *</span>
                <input
                  required
                  type="text"
                  value={form.usuario.calle}
                  onChange={(e) => updatePersona("usuario", "calle", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Nro. / Mza. *</span>
                <input
                  required
                  type="text"
                  value={form.usuario.numeroMza}
                  onChange={(e) => updatePersona("usuario", "numeroMza", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Lote / Int.</span>
                <input
                  type="text"
                  value={form.usuario.loteInt}
                  onChange={(e) => updatePersona("usuario", "loteInt", e.target.value)}
                />
              </label>
            </div>

            <div className={styles.grid2}>
              <label className={styles.field}>
                <span>Urb. / Coop. / AAHH</span>
                <input
                  type="text"
                  value={form.usuario.urbanizacion}
                  onChange={(e) => updatePersona("usuario", "urbanizacion", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Referencia de domicilio</span>
                <input
                  type="text"
                  value={form.usuario.referencia}
                  onChange={(e) => updatePersona("usuario", "referencia", e.target.value)}
                />
              </label>
            </div>

            <div className={styles.grid2}>
              <label className={styles.field}>
                <span>Correo electrónico</span>
                <input
                  type="email"
                  value={form.usuario.email}
                  onChange={(e) => updatePersona("usuario", "email", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Teléfono</span>
                <input
                  type="tel"
                  value={form.usuario.telefono}
                  onChange={(e) => updatePersona("usuario", "telefono", e.target.value)}
                />
              </label>
            </div>

            <div className={styles.grid3}>
              <label className={styles.field}>
                <span>Fecha de nacimiento *</span>
                <input
                  required
                  type="date"
                  value={form.usuario.fechaNacimiento}
                  onChange={(e) => updatePersona("usuario", "fechaNacimiento", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Sexo *</span>
                <select
                  required
                  value={form.usuario.sexo}
                  onChange={(e) => updatePersona("usuario", "sexo", e.target.value)}
                >
                  <option value="">Seleccione</option>
                  {SEXO_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Tipo de documento *</span>
                <select
                  required
                  value={form.usuario.tipoDocumento}
                  onChange={(e) => updatePersona("usuario", "tipoDocumento", e.target.value)}
                >
                  {TIPO_DOCUMENTO_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span>Número de documento *</span>
              <input
                required
                type="text"
                value={form.usuario.numeroDocumento}
                onChange={(e) => updatePersona("usuario", "numeroDocumento", e.target.value)}
              />
            </label>
          </fieldset>

          {/* 2. Identificación de quién presenta el reclamo */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              2. Identificación de quién presenta el reclamo
            </legend>

            <label className={styles.checkboxField}>
              <input
                type="checkbox"
                checked={form.esMismoUsuario}
                onChange={(e) => update("esMismoUsuario", e.target.checked)}
              />
              <span>Quien presenta el reclamo es el mismo usuario afectado</span>
            </label>

            {!form.esMismoUsuario && (
              <>
                <div className={styles.grid3}>
                  <label className={styles.field}>
                    <span>Nombres *</span>
                    <input
                      required={!form.esMismoUsuario}
                      type="text"
                      value={form.reclamante.nombres}
                      onChange={(e) => updatePersona("reclamante", "nombres", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Apellido paterno *</span>
                    <input
                      required={!form.esMismoUsuario}
                      type="text"
                      value={form.reclamante.apellidoPaterno}
                      onChange={(e) => updatePersona("reclamante", "apellidoPaterno", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Apellido materno *</span>
                    <input
                      required={!form.esMismoUsuario}
                      type="text"
                      value={form.reclamante.apellidoMaterno}
                      onChange={(e) => updatePersona("reclamante", "apellidoMaterno", e.target.value)}
                    />
                  </label>
                </div>

                <p className={styles.subLegend}>Domicilio</p>
                <div className={styles.grid3}>
                  <label className={styles.field}>
                    <span>Departamento *</span>
                    <select
                      required={!form.esMismoUsuario}
                      value={form.reclamante.departamento}
                      onChange={(e) => updatePersona("reclamante", "departamento", e.target.value)}
                    >
                      <option value="">Seleccione</option>
                      {PERU_DEPARTAMENTOS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Provincia *</span>
                    <input
                      required={!form.esMismoUsuario}
                      type="text"
                      value={form.reclamante.provincia}
                      onChange={(e) => updatePersona("reclamante", "provincia", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Distrito *</span>
                    <input
                      required={!form.esMismoUsuario}
                      type="text"
                      value={form.reclamante.distrito}
                      onChange={(e) => updatePersona("reclamante", "distrito", e.target.value)}
                    />
                  </label>
                </div>

                <div className={styles.grid3}>
                  <label className={styles.field}>
                    <span>Calle / Av. / Jr. *</span>
                    <input
                      required={!form.esMismoUsuario}
                      type="text"
                      value={form.reclamante.calle}
                      onChange={(e) => updatePersona("reclamante", "calle", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Nro. / Mza. *</span>
                    <input
                      required={!form.esMismoUsuario}
                      type="text"
                      value={form.reclamante.numeroMza}
                      onChange={(e) => updatePersona("reclamante", "numeroMza", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Lote / Int.</span>
                    <input
                      type="text"
                      value={form.reclamante.loteInt}
                      onChange={(e) => updatePersona("reclamante", "loteInt", e.target.value)}
                    />
                  </label>
                </div>

                <div className={styles.grid2}>
                  <label className={styles.field}>
                    <span>Urb. / Coop. / AAHH</span>
                    <input
                      type="text"
                      value={form.reclamante.urbanizacion}
                      onChange={(e) => updatePersona("reclamante", "urbanizacion", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Referencia de domicilio</span>
                    <input
                      type="text"
                      value={form.reclamante.referencia}
                      onChange={(e) => updatePersona("reclamante", "referencia", e.target.value)}
                    />
                  </label>
                </div>

                <div className={styles.grid2}>
                  <label className={styles.field}>
                    <span>Correo electrónico</span>
                    <input
                      type="email"
                      value={form.reclamante.email}
                      onChange={(e) => updatePersona("reclamante", "email", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Teléfono</span>
                    <input
                      type="tel"
                      value={form.reclamante.telefono}
                      onChange={(e) => updatePersona("reclamante", "telefono", e.target.value)}
                    />
                  </label>
                </div>

                <div className={styles.grid3}>
                  <label className={styles.field}>
                    <span>Fecha de nacimiento *</span>
                    <input
                      required={!form.esMismoUsuario}
                      type="date"
                      value={form.reclamante.fechaNacimiento}
                      onChange={(e) => updatePersona("reclamante", "fechaNacimiento", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Sexo *</span>
                    <select
                      required={!form.esMismoUsuario}
                      value={form.reclamante.sexo}
                      onChange={(e) => updatePersona("reclamante", "sexo", e.target.value)}
                    >
                      <option value="">Seleccione</option>
                      {SEXO_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Tipo de documento *</span>
                    <select
                      required={!form.esMismoUsuario}
                      value={form.reclamante.tipoDocumento}
                      onChange={(e) => updatePersona("reclamante", "tipoDocumento", e.target.value)}
                    >
                      {TIPO_DOCUMENTO_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className={styles.field}>
                  <span>Número de documento *</span>
                  <input
                    required={!form.esMismoUsuario}
                    type="text"
                    value={form.reclamante.numeroDocumento}
                    onChange={(e) => updatePersona("reclamante", "numeroDocumento", e.target.value)}
                  />
                </label>

                <div className={styles.grid2}>
                  <label className={styles.field}>
                    <span>Tipo de reclamante *</span>
                    <select
                      required={!form.esMismoUsuario}
                      value={form.tipoReclamante}
                      onChange={(e) => update("tipoReclamante", e.target.value)}
                    >
                      <option value="">Seleccione</option>
                      {TIPO_RECLAMANTE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Tipo de relación *</span>
                    <select
                      required={!form.esMismoUsuario}
                      value={form.tipoRelacion}
                      onChange={(e) => update("tipoRelacion", e.target.value)}
                    >
                      <option value="">Seleccione</option>
                      {TIPO_RELACION_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </>
            )}
          </fieldset>

          {/* 3. Detalle del reclamo */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>3. Detalle del reclamo</legend>

            <div className={styles.grid2}>
              <label className={styles.field}>
                <span>Fecha de ocurrencia *</span>
                <input
                  required
                  type="date"
                  value={form.fechaOcurrencia}
                  onChange={(e) => update("fechaOcurrencia", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Sede de ocurrencia *</span>
                <select
                  required
                  value={form.sedeOcurrencia}
                  onChange={(e) => update("sedeOcurrencia", e.target.value)}
                >
                  {SEDE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className={styles.field}>
              <span>Tipo de producto / servicio *</span>
              <select
                required
                value={form.tipoProductoServicio}
                onChange={(e) => update("tipoProductoServicio", e.target.value)}
              >
                <option value="">Seleccione</option>
                {PRODUCTO_SERVICIO_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="tipoRegistro"
                  value="reclamo"
                  checked={form.tipoRegistro === "reclamo"}
                  onChange={(e) => update("tipoRegistro", e.target.value)}
                />
                <span>
                  <strong>Reclamo</strong> — disconformidad con el producto o servicio
                </span>
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="tipoRegistro"
                  value="queja"
                  checked={form.tipoRegistro === "queja"}
                  onChange={(e) => update("tipoRegistro", e.target.value)}
                />
                <span>
                  <strong>Queja</strong> — malestar por la atención recibida
                </span>
              </label>
            </div>

            <label className={styles.field}>
              <span>Descripción del reclamo *</span>
              <textarea
                required
                rows={5}
                maxLength={DESCRIPCION_MAX}
                value={form.descripcionReclamo}
                onChange={(e) => update("descripcionReclamo", e.target.value)}
                placeholder="Cuéntanos qué ocurrió, de forma clara y en orden cronológico."
              />
              <span
                className={
                  descripcionLength >= DESCRIPCION_MAX
                    ? `${styles.charCount} ${styles.charCountWarn}`
                    : styles.charCount
                }
              >
                {descripcionLength} / {DESCRIPCION_MAX} caracteres
              </span>
            </label>

            <label className={styles.field}>
              <span>¿Qué solicitas?</span>
              <textarea
                rows={3}
                value={form.pedido}
                onChange={(e) => update("pedido", e.target.value)}
                placeholder="Por ejemplo: reembolso, reprogramación de cita, disculpas, etc."
              />
            </label>

            <p className={styles.subLegend}>Datos adicionales del servicio (opcional)</p>
            <div className={styles.grid3}>
              <label className={styles.field}>
                <span>Fecha del servicio</span>
                <input
                  type="date"
                  value={form.fechaServicio}
                  onChange={(e) => update("fechaServicio", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>Monto reclamado (S/)</span>
                <input
                  type="text"
                  value={form.monto}
                  onChange={(e) => update("monto", e.target.value)}
                />
              </label>
              <label className={styles.field}>
                <span>N° de comprobante</span>
                <input
                  type="text"
                  value={form.comprobante}
                  onChange={(e) => update("comprobante", e.target.value)}
                />
              </label>
            </div>
          </fieldset>

          {/* 4. Autorización de notificación y declaración */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              4. Autorización de notificación del resultado
            </legend>

            <p className={styles.field} style={{ marginBottom: 0 }}>
              <span>¿Autorizas que se te notifique el resultado del reclamo al correo consignado? *</span>
            </p>
            <div className={styles.radioGroupInline}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="autorizaNotificacion"
                  value="si"
                  checked={form.autorizaNotificacion === "si"}
                  onChange={(e) => update("autorizaNotificacion", e.target.value)}
                />
                <span>Sí</span>
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="autorizaNotificacion"
                  value="no"
                  checked={form.autorizaNotificacion === "no"}
                  onChange={(e) => update("autorizaNotificacion", e.target.value)}
                />
                <span>No</span>
              </label>
            </div>

            <p className={styles.noticeBox}>
              Las IAFAS, IPRESS o UGIPRESS deben atender el reclamo en un
              plazo de 30 días hábiles. Estimado usuario: puede presentar su
              denuncia ante SUSALUD ante hechos o actos que vulneren o
              pudieran vulnerar el derecho a la salud, o cuando no le hayan
              brindado un servicio, prestación o cobertura solicitada o
              recibida de las IAFAS o IPRESS, o que dependan de la UGIPRESS
              pública, privada o mixta. También ante la negativa de atención
              de su reclamo, irregularidad en su tratamiento o
              disconformidad con el resultado del mismo, o hacer uso de los
              mecanismos alternativos de solución de controversias ante el
              Centro de Conciliación y Arbitraje (CECONAR) de SUSALUD.
            </p>

            <label className={styles.checkboxField}>
              <input
                required
                type="checkbox"
                checked={form.aceptaDeclaracion}
                onChange={(e) => update("aceptaDeclaracion", e.target.checked)}
              />
              <span>
                Declaro que los datos consignados son reales y, al
                continuar, tomo conocimiento de la{" "}
                <Link href="/politica-de-privacidad">Política de Privacidad</Link>. *
              </span>
            </label>
          </fieldset>

          {status === "error" && (
            <p className={styles.errorText}>{errorMsg}</p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={status === "loading"}>
            {status === "loading" ? "Enviando..." : "Enviar reclamo"}
          </button>
        </form>
      </div>
    </main>
  );
}