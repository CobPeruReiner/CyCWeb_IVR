const { QueryTypes } = require("sequelize");
const { db } = require("../config/database_v1");

const getEfectoAccion = async (req, res) => {
  const { accion } = req.params;

  if (!accion) {
    return res.status(400).json({ error: "Accion no proporcionado" });
  }

  console.log("===========================================");
  console.log("Obteniendo efecto: ", accion);

  console.time("getEfectoAccion_query_time");

  try {
    const query = `
      SELECT * FROM efecto
      WHERE IDACCION = :accion
      AND IDESTADO = 1
      ORDER BY orden ASC, efecto ASC
    `;

    const contacto = await db.query(query, {
      replacements: { accion },
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getEfectoAccion_query_time");

    res.status(200).json(contacto);
  } catch (error) {
    console.timeEnd("getEfectoAccion_query_time");

    res
      .status(500)
      .json({ error: "Error en getEfectoAccion", detalle: error.message });
  }
};

const AccionListAccion = async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      error: "Se requiere un array de IDs de acción",
    });
  }

  console.log("===========================================");
  console.log("Obteniendo lista de acciones: ", ids);

  console.time("AccionListAccion_query_time");

  try {
    const query = `
      SELECT * FROM efecto
      WHERE IDACCION IN (:ids)
      ORDER BY ORDEN ASC, EFECTO ASC
    `;

    const contacto = await db.query(query, {
      replacements: { ids },
      type: QueryTypes.SELECT,
    });

    console.timeEnd("AccionListAccion_query_time");

    res.status(200).json(contacto);
  } catch (error) {
    console.timeEnd("AccionListAccion_query_time");

    res
      .status(500)
      .json({ error: "Error en AccionListAccion", detalle: error.message });
  }
};

module.exports = {
  getEfectoAccion,
  AccionListAccion,
};
