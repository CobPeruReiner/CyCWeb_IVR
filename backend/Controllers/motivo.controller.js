const { QueryTypes } = require("sequelize");
const { db } = require("../config/database_v1");

const MotivoListEfecto = async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      error: "Se requiere un array de IDs de efecto",
    });
  }

  console.log("===========================================");
  console.log("Obteniendo lista de motivos: ", ids);

  console.time("MotivoListEfecto_query_time");

  try {
    const query = `
    SELECT * FROM motivo
    WHERE IDEFECTO IN (:ids)
    `;

    const contacto = await db.query(query, {
      replacements: { ids },
      type: QueryTypes.SELECT,
    });

    console.timeEnd("MotivoListEfecto_query_time");

    res.status(200).json(contacto);
  } catch (error) {
    console.timeEnd("MotivoListEfecto_query_time");

    res
      .status(500)
      .json({ error: "Error en AccionListAccion", detalle: error.message });
  }
};

const getMotivoEfecto = async (req, res) => {
  const { efecto } = req.params;

  if (!efecto) {
    return res.status(400).json({ error: "Efecto no proporcionado" });
  }

  console.log("===========================================");
  console.log("Obteniendo motivo: ", efecto);

  console.time("getMotivoEfecto_query_time");

  try {
    const query = `
      SELECT * FROM motivo
      WHERE IDEFECTO = :efecto
      AND IDESTADO = 1
    `;

    const contacto = await db.query(query, {
      replacements: { efecto },
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getMotivoEfecto_query_time");

    res.status(200).json(contacto);
  } catch (error) {
    console.timeEnd("getMotivoEfecto_query_time");

    res
      .status(500)
      .json({ error: "Error en getMotivoEfecto", detalle: error.message });
  }
};

module.exports = {
  getMotivoEfecto,
  MotivoListEfecto,
};
