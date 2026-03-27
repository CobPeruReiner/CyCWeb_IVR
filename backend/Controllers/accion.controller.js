const { QueryTypes } = require("sequelize");
const { db } = require("../config/database_v1");

// aña
const getAllAcciones = async (req, res) => {
  console.log("===========================================");
  console.log("Obteniendo todas las acciones");

  console.time("getAllAcciones_query_time");

  try {
    const query = `SELECT * FROM accion`;

    const acciones = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getAllAcciones_query_time");

    res.status(200).json(acciones);
  } catch (error) {
    console.timeEnd("getAllAcciones_query_time");

    res
      .status(500)
      .json({ error: "Error en getAllAcciones", detalle: error.message });
  }
};

const getAccioneTipo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID de accion no proporcionado" });
  }

  console.log("===========================================");
  console.log("Obteniendo accion: ", id);

  console.time("getAccion_query_time");

  try {
    const query = `
      SELECT * FROM accion
      WHERE TIPO = :tipo
      AND IDESTADO = 1
    `;

    const acciones = await db.query(query, {
      replacements: { tipo: id },
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getAccion_query_time");

    res.status(200).json(acciones);
  } catch (error) {
    console.timeEnd("getAccion_query_time");

    res.status(500).json({
      error: "Error en getAccion",
      detalle: error.message,
    });
  }
};

const getAccionTipoCartera = async (req, res) => {
  const { idTipo, idTabla } = req.params;

  if (!idTipo || !idTabla) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  console.log("===========================================");
  console.log("Obteniendo acciones para: ", idTipo, idTabla);

  console.time("getAccion_query_time");

  try {
    const query = `SELECT id_cartera FROM tabla_log WHERE id = :idTabla`;
    const idCartera = await db.query(query, {
      replacements: { idTabla },
      type: QueryTypes.SELECT,
    });

    if (!idCartera.length) {
      console.timeEnd("getAccion_query_time");

      return res.status(404).json({ error: "Cartera no encontrada" });
    }

    const id_cartera = idCartera[0].id_cartera;

    const query2 = `
    SELECT * FROM accion
    WHERE TIPO = :idTipo
    AND idcartera = :idCartera
    AND IDESTADO = 1
  `;

    const acciones = await db.query(query2, {
      replacements: { idTipo, idCartera: id_cartera },
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getAccion_query_time");

    res.status(200).json(acciones);
  } catch (error) {
    console.timeEnd("getAccion_query_time");

    res.status(500).json({
      error: "Error en getAccion",
      detalle: error.message,
    });
  }
};

module.exports = {
  getAllAcciones,
  getAccioneTipo,
  getAccionTipoCartera,
};
