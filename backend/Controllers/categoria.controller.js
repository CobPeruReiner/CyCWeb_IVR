const { QueryTypes } = require("sequelize");
const { db } = require("../config/database_v1");

const getCategoria = async (req, res) => {
  console.log("===========================================");
  console.log("Obteniendo categorias");

  console.time("getCategoria_query_time");

  try {
    const query = `SELECT * FROM categoria WHERE IDESTADO = 1`;

    const categorias = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getCategoria_query_time");

    res.status(200).json(categorias);
  } catch (error) {
    console.timeEnd("getCategoria_query_time");

    res
      .status(500)
      .json({ error: "Error en getCategoria", detalle: error.message });
  }
};

module.exports = { getCategoria };
