const { db } = require("../config/database_v1");

const getTelefonosCompanie = async (_req, res) => {
  console.log("===========================================");
  console.log("Obteniendo operadores");

  console.time("getTelefonosCompanie_query_time");

  try {
    const [companies] = await db.query(
      "SELECT id, nombre FROM operador WHERE estado = 1"
    );

    console.timeEnd("getTelefonosCompanie_query_time");

    return res.status(200).json(companies);
  } catch (error) {
    console.timeEnd("getTelefonosCompanie_query_time");

    console.error("Error al obtener operadores:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = { getTelefonosCompanie };
