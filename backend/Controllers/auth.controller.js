const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { db } = require("../config/database_v1");
const dotenv = require("dotenv");
const { QueryTypes } = require("sequelize");
const md5 = require("md5");
const { verifyCaptcha } = require("../Utils/Captcha");
const {
  incAttemptsCycWeb,
  bloquearSiCorrespondeCycWeb,
  MAX_ATTEMPTS,
  registrarLogSesion,
  resetAttemptsCycWeb,
} = require("../Utils/LoginAttempt");
const {
  notifyPreviousSession,
} = require("../../../5.CyCWebMigracion/backend/Utils/Notify");

dotenv.config({ path: "./.env" });

const Login = async (req, res) => {
  const { user, password, dateSolicitud, timeSolicitud } = req.body;

  console.log("================================================");
  console.log("Login usuario:", { user, dateSolicitud, timeSolicitud });

  console.time("Login_query_time");

  if (!user || !password) {
    console.timeEnd("Login_query_time");
    return res.status(401).json({
      body: "Usuario o contraseña inválida",
      status: "1",
    });
  }

  try {
    const [usuario] = await db.query(
      `
      SELECT 
        p.IDPERSONAL,
        p.APELLIDOS,
        p.NOMBRES,
        p.USUARIO,
        p.PASSWORD,
        p.EMAIL,
        p.api_token,
        p.ANEXO_BACKUP
      FROM personal p
      LEFT JOIN cartera car
        ON p.id_cartera = car.id
      WHERE p.DOC = :user
        AND p.IDESTADO = 1
      `,
      {
        replacements: { user },
        type: QueryTypes.SELECT,
      },
    );

    if (!usuario) {
      console.timeEnd("Login_query_time");
      return res.status(401).json({
        body: "Usuario o contraseña inválida",
        status: "1",
      });
    }

    let passwordCorrecto = false;

    const storedPassword = usuario.PASSWORD;

    if (storedPassword && password) {
      if (/^\$2[aby]\$/.test(storedPassword)) {
        try {
          passwordCorrecto = await bcrypt.compare(password, storedPassword);
        } catch (err) {
          console.error("Error comparando bcrypt:", err);
          passwordCorrecto = false;
        }
      } else {
        const md5Password = md5(password);

        passwordCorrecto =
          md5Password.toLowerCase() === String(storedPassword).toLowerCase();
      }
    }

    if (!passwordCorrecto) {
      console.timeEnd("Login_query_time");
      return res.status(401).json({
        body: "Usuario o contraseña inválida",
        status: "1",
      });
    }

    await resetAttemptsCycWeb(user);

    await registrarLogSesion(
      usuario.IDPERSONAL,
      dateSolicitud,
      timeSolicitud,
      1,
      user ?? null,
      password ?? null,
    );

    const fechaActual = moment().utc().subtract(5, "hours");
    const currentDay = fechaActual.format("dddd");

    let minTime, maxTime;

    if (currentDay === "Saturday") {
      minTime = moment()
        .utc()
        .subtract(5, "hours")
        .hour(7)
        .minute(55)
        .second(0);
      maxTime = moment()
        .utc()
        .subtract(5, "hours")
        .hour(17)
        .minute(30)
        .second(0);
    } else if (currentDay === "Sunday") {
      minTime = moment()
        .utc()
        .subtract(5, "hours")
        .hour(21)
        .minute(0)
        .second(0);
      maxTime = moment()
        .utc()
        .subtract(5, "hours")
        .hour(21)
        .minute(1)
        .second(0);
    } else {
      minTime = moment().utc().subtract(5, "hours").hour(7).minute(0).second(0);
      maxTime = moment()
        .utc()
        .subtract(5, "hours")
        .hour(19)
        .minute(55)
        .second(0);
    }

    const currentTime = moment().utc().subtract(5, "hours");
    const usersAdmin = [17, 25, 647, 1235, 1390, 1391];

    if (
      currentTime.isBetween(minTime, maxTime, undefined, "[]") ||
      usersAdmin.includes(Number(usuario.IDPERSONAL))
    ) {
      if (!usuario.EMAIL) {
        console.timeEnd("Login_query_time");
        return res.status(200).json({
          status: "1",
          body: "No tienes correo registrado. Contacta a Soporte.",
        });
      }

      const clients = await db.query(
        `
        SELECT 
            cartera.cartera AS nombre,
            tabla_log.id AS id_tabla,
            tabla_log.id_cartera AS idcartera,
            cartera.tipo AS tipo_cartera
        FROM tabla_log
        INNER JOIN asignacion_tabla 
          ON tabla_log.id = asignacion_tabla.id_tabla
        INNER JOIN cartera 
          ON tabla_log.id_cartera = cartera.id
        INNER JOIN cliente 
          ON cartera.idcliente = cliente.id
        WHERE asignacion_tabla.id_usuario = :IDPERSONAL
          AND cartera.estado = 1
          AND tabla_log.estado = 0
        ORDER BY cartera.cartera
        `,
        {
          replacements: { IDPERSONAL: usuario.IDPERSONAL },
          type: QueryTypes.SELECT,
        },
      );

      console.timeEnd("Login_query_time");

      return res.status(200).json({
        status: "0",
        body: {
          ...usuario,
          clients,
          api_token: usuario.api_token,
        },
      });
    }

    console.timeEnd("Login_query_time");

    return res.status(200).json({
      body: "Acceso bloqueado, fuera de horario",
      status: "2",
      minTime: minTime.format("YYYY-MM-DD HH:mm:ss"),
      maxTime: maxTime.format("YYYY-MM-DD HH:mm:ss"),
      currentTime: currentTime.format("YYYY-MM-DD HH:mm:ss"),
      fechaActual: fechaActual.format("YYYY-MM-DD HH:mm:ss"),
      currentDay,
    });
  } catch (error) {
    console.timeEnd("Login_query_time");
    console.error("Error en Login:", error);
    return res.status(500).json({
      error: "Error en el login",
      detalle: error.message,
    });
  }
};

const Logout = async (req, res) => {
  const { userId, dateSolicitud, timeSolicitud, user, password } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "ID de usuario no proporcionado" });
  }

  console.log("================================================");
  console.log("ID de usuario recibido: ", userId);

  console.time("Logout_query_time");

  try {
    await db.query(
      "UPDATE personal SET api_token = NULL WHERE IDPERSONAL = :IDPERSONAL",
      {
        replacements: { IDPERSONAL: userId },
        type: QueryTypes.UPDATE,
      },
    );

    notifyPreviousSession(userId);

    await registrarLogSesion(
      userId,
      dateSolicitud,
      timeSolicitud,
      2,
      user ? user : null,
      password ? password : null,
    );

    console.timeEnd("Logout_query_time");

    res.status(200).json("logout");
  } catch (error) {
    console.timeEnd("Logout_query_time");

    res.status(500).json({ error: "Error en logout", detalle: error.message });
  }
};

const logOutInactividad = async (req, res) => {
  const userId = req.userId;
  const { dateSolicitud, timeSolicitud, user, password } = req.body || {};

  try {
    const now = new Date();
    const fecha = dateSolicitud || now.toISOString().slice(0, 10);
    const hora = timeSolicitud || now.toTimeString().slice(0, 8);

    await registrarLogSesion(userId, fecha, hora, 4, user, password);

    await db.query(
      "UPDATE personal SET api_token = NULL WHERE IDPERSONAL = :id",
      { replacements: { id: userId }, type: QueryTypes.UPDATE },
    );

    try {
      notifyPreviousSession?.(userId);
    } catch {}

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("logout-inactividad error:", err);
    return res.status(500).json({ error: "No se pudo cerrar por inactividad" });
  }
};

const ReLogin = async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ error: "Credenciales no proporcionadas" });
  }

  console.log("================================================");
  console.log("Credenciales recibidas: ", user, password);

  console.time("ReLogin_query_time");

  try {
    // Buscar usuario en la BD
    const [users] = await db.query(
      "SELECT IDPERSONAL, APELLIDOS, NOMBRES, USUARIO, PASSWORD FROM personal WHERE USUARIO = :user",
      {
        replacements: { user },
        type: QueryTypes.SELECT,
      },
    );

    // console.log("================================================");
    console.log("Usuario encontrado: ", users);

    if (!users || md5(password) !== users.PASSWORD) {
      console.timeEnd("ReLogin_query_time");

      return res.status(200).json({ body: "Usuario inválido", status: "1" });
    }

    // Obtener clientes del usuario
    const clients = await db.query(
      `
        SELECT 
            cartera.cartera AS nombre,
            tabla_log.id AS id_tabla,
            tabla_log.id_cartera AS idcartera
        FROM tabla_log
        INNER JOIN asignacion_tabla ON tabla_log.id = asignacion_tabla.id_tabla
        INNER JOIN cartera ON tabla_log.id_cartera = cartera.id
        INNER JOIN cliente ON cartera.idcliente = cliente.id
        WHERE asignacion_tabla.id_usuario = :IDPERSONAL
        AND tabla_log.estado = 0
      `,
      {
        replacements: { IDPERSONAL: users.IDPERSONAL },
        type: QueryTypes.SELECT,
      },
    );

    // Depuracion
    // console.log("================================================");
    // console.log("Clientes asociados al usuario: ", clients);

    console.timeEnd("ReLogin_query_time");

    return res.status(200).json({ body: clients, status: "0" });
  } catch (error) {
    console.timeEnd("ReLogin_query_time");

    res.status(500).json({ error: "Error en relogin", detalle: error.message });
  }
};

const GetLastTableId = async (req, res) => {
  const { idTabla } = req.params;

  if (!idTabla) {
    return res.status(400).json({ error: "ID de tabla no proporcionado" });
  }

  console.log("================================================");
  console.log("ID de tabla recibido: ", idTabla);

  console.time("GetLastTableId_query_time");

  try {
    const query = `
            SELECT id FROM tabla_log 
            WHERE id_cartera = (SELECT id_cartera FROM tabla_log WHERE id = :idTabla) 
            ORDER BY id DESC
        `;

    const rows = await db.query(query, {
      replacements: { idTabla },
      type: QueryTypes.SELECT,
    });

    // console.log("================================================");
    // console.log("ID de la tabla: ", rows);

    console.timeEnd("GetLastTableId_query_time");

    return res.status(200).json(rows.map((row) => row.id));
  } catch (error) {
    console.timeEnd("GetLastTableId_query_time");

    res
      .status(500)
      .json({ error: "Error en getLastTableId", detalle: error.message });
  }
};

module.exports = {
  Login,
  Logout,
  ReLogin,
  GetLastTableId,
  logOutInactividad,
};
