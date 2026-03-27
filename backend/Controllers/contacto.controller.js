const { QueryTypes } = require("sequelize");
const { db } = require("../config/database_v1");

const getContactoEfecto = async (req, res) => {
  const { efecto } = req.params;

  if (!efecto) {
    return res.status(400).json({ error: "Efecto no proporcionado" });
  }

  console.log("===========================================");
  console.log("Obteniendo contacto: ", efecto);

  console.time("getContactoEfecto_query_time");

  try {
    const query = `
      SELECT * FROM contacto
      WHERE IDEFECTO = :efecto
      AND IDESTADO = 1
    `;

    const contacto = await db.query(query, {
      replacements: { efecto },
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getContactoEfecto_query_time");

    res.status(200).json(contacto);
  } catch (error) {
    console.timeEnd("getContactoEfecto_query_time");

    res
      .status(500)
      .json({ error: "Error en getContactoEfecto", detalle: error.message });
  }
};

module.exports = { getContactoEfecto };
