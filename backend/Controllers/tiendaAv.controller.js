const { Sequelize, QueryTypes } = require("sequelize");
const { db } = require("../config/database_v1");

const getTienda = async (req, res) => {
  try {
    console.log("===========================================");
    console.log("Obteniendo lista de tiendas activas...");

    console.time("getTienda_query_time");

    // Consulta SQL sin modelos
    const query = `
      SELECT * FROM tienda
      WHERE Estado = 1
      ORDER BY NombreTienda ASC
    `;

    const tiendas = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getTienda_query_time");

    res.status(200).json(tiendas);
  } catch (error) {
    console.timeEnd("getTienda_query_time");

    res.status(500).json({
      error: "Error en getTienda",
      detalle: error.message,
    });
  }
};

const getTiendaAgendamientoIdentificador = async (req, res) => {
  const { identificador } = req.params;

  if (!identificador) {
    return res.status(400).json({
      error: "Identificador no proporcionado",
    });
  }

  console.log("===========================================");
  console.log("Obteniendo agendamientos para el identificador:", identificador);

  console.time("getTiendaAgendamientoIdentificador_query_time");

  try {
    // Consulta SQL sin modelos
    const query = `
      SELECT 
        t.NombreTienda AS tienda,
        t.DireccionTienda AS direccion,
        DATE_FORMAT(gv.FechaAgendamiento, '%Y-%m-%d %H:%i:%s') AS fecha_agendamiento,
        CASE WHEN gv.EstadoVisita = 1 THEN 'SI' ELSE 'NO' END AS visita,
        CASE WHEN gv.EstadoVenta = 1 THEN 'SI' ELSE 'NO' END AS venta,
        CASE WHEN gv.EstadoDesembolso = 1 THEN 'SI' ELSE 'NO' END AS desembolso,
        gv.Importe AS importe,
        gv.Observacion AS observacion,
        gv.DerivacionCanal AS derivacion_canal,
        CONCAT(p.APELLIDOS, ', ', p.NOMBRES) AS personal,
        DATE_FORMAT(gv.FechaRegistro, '%Y-%m-%d %H:%i:%s') AS fecha_registro
      FROM Gestion_Venta gv
      LEFT JOIN gestion_tmk gt ON gt.id = gv.idGestion
      LEFT JOIN tienda t ON t.idTienda = gv.idTienda
      LEFT JOIN personal p ON p.IDPERSONAL = gv.idPersonalRegistro
      WHERE gt.IDENTIFICADOR = :identificador
      ORDER BY gv.idAgendamiento DESC
    `;

    const gestiones = await db.query(query, {
      replacements: { identificador },
      type: QueryTypes.SELECT,
    });

    console.timeEnd("getTiendaAgendamientoIdentificador_query_time");

    res.status(200).json(gestiones);
  } catch (error) {
    console.timeEnd("getTiendaAgendamientoIdentificador_query_time");

    res.status(500).json({
      error: "Error en getTiendaAgendamientoIdentificador",
      detalle: error.message,
    });
  }
};

module.exports = {
  getTienda,
  getTiendaAgendamientoIdentificador,
};
