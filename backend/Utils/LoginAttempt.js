const { QueryTypes } = require("sequelize");
const { db } = require("../config/database");
const crypto = require("crypto");

function hashForLog(value) {
  if (!value) return null;

  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

const MAX_ATTEMPTS = 3;

/**
 * Obtiene los intentos actuales
 */
async function getAttemptsCycWeb(doc) {
  const [row] = await db.query(
    `
    SELECT INTENTOS_CYCWEB
    FROM personal
    WHERE DOC = :doc
    `,
    {
      replacements: { doc },
      type: QueryTypes.SELECT,
    },
  );

  return row?.INTENTOS_CYCWEB ?? 0;
}

/**
 * Incrementa en BD y retorna el nuevo valor
 */
async function incAttemptsCycWeb(doc) {
  await db.query(
    `
    UPDATE personal
    SET INTENTOS_CYCWEB = IFNULL(INTENTOS_CYCWEB,0) + 1
    WHERE DOC = :doc
    `,
    {
      replacements: { doc },
      type: QueryTypes.UPDATE,
    },
  );

  return getAttemptsCycWeb(doc);
}

/**
 * Resetea los intentos
 */
async function resetAttemptsCycWeb(doc) {
  await db.query(
    `
    UPDATE personal
    SET 
      INTENTOS_CYCWEB = 0,
      IDESTADO = 1
    WHERE DOC = :doc
    `,
    {
      replacements: { doc },
      type: QueryTypes.UPDATE,
    },
  );
}

/**
 * Bloquea usuario (IDESTADO = 5)
 */
async function bloquearSiCorrespondeCycWeb(doc) {
  const [activo] = await db.query(
    `
    SELECT IDPERSONAL
    FROM personal
    WHERE DOC = :doc AND IDESTADO = 1
    `,
    {
      replacements: { doc },
      type: QueryTypes.SELECT,
    },
  );

  const id = activo?.IDPERSONAL ?? null;

  if (!id) return;

  await db.query(
    `
    UPDATE personal
    SET IDESTADO = 5
    WHERE IDPERSONAL = :id
    `,
    {
      replacements: { id },
      type: QueryTypes.UPDATE,
    },
  );
}

const registrarLogSesion = async (
  IDPERSONAL,
  dateSolicitud,
  timeSolicitud,
  estado,
  DOCUSER,
  PASSWORD,
) => {
  console.log(
    " ====================== INSERTAR EN LOG DE SESION ======================",
  );
  console.log(
    `IDPERSONAL: ${IDPERSONAL}, dateSolicitud: ${dateSolicitud}, timeSolicitud: ${timeSolicitud}, estado: ${estado}, DOCUSER: ${DOCUSER}, PASSWORD: ${PASSWORD}`,
  );

  try {
    const PASSWORD_HASH = hashForLog(PASSWORD);

    await db.query(
      "CALL SP_INSERTAR_LOG_SESION(:IDPERSONAL, :dateSolicitud, :timeSolicitud, :estado, :DOCUSER, :PASSWORD)",
      {
        replacements: {
          IDPERSONAL: IDPERSONAL ?? null,
          estado: estado ?? null,
          DOCUSER: DOCUSER ?? null,
          PASSWORD: estado == 2 ? PASSWORD : PASSWORD_HASH,
          dateSolicitud: dateSolicitud ?? null,
          timeSolicitud: timeSolicitud ?? null,
        },
        type: QueryTypes.RAW,
      },
    );
  } catch (err) {
    console.error("Error al insertar log de sesión:", err.message);
  }
};

module.exports = {
  getAttemptsCycWeb,
  incAttemptsCycWeb,
  resetAttemptsCycWeb,
  MAX_ATTEMPTS,
  registrarLogSesion,
  bloquearSiCorrespondeCycWeb,
};
