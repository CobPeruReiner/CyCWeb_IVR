const { QueryTypes } = require("sequelize");
const { db } = require("../config/database_v1");

const emptyToNull = (value) => {
  return value === "" || value === undefined ? null : value;
};

const limpiarCampo = (valor) =>
  Array.isArray(valor) ? valor.find((v) => v) : valor || null;

const getFilePath = (req, field, folder) =>
  req.files?.[field]?.[0]?.filename
    ? `/Adjuntos/${folder}/${req.files[field][0].filename}`
    : null;

// ================================= GENERALES =================================
const getOptionsCalificacion = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_Demanda
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsCalificacion:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsCalificacion",
      detalle: error.message,
    });
  }
};

const getOptEstadoProcClienteNegativo = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_EstadoProcesal
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsEstadoProcesal:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsEstadoProcesal",
      detalle: error.message,
    });
  }
};

const getOptEstadoProcClientePositivo = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_EstadoProcesal
      WHERE SJEstado = 1 AND SJTipoBusqueda = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsEstadoProcesal:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsEstadoProcesal",
      detalle: error.message,
    });
  }
};

// ================================== CLIENTE NEGATIVO ==================================
const getOptionsSolCautelarTipo = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_SolicitudCautelarTipo
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsSolCautelarTipo:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsSolCautelarTipo",
      detalle: error.message,
    });
  }
};

const getOptionsFormaSolCautelar = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_FormaSolCautelar
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsFormaSolCautelar:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsFormaSolCautelar",
      detalle: error.message,
    });
  }
};

const getOptionsEmbargo = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_Embargo
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsEmbargo:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsEmbargo",
      detalle: error.message,
    });
  }
};

const getOptionsSecuestro = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_Secuestro
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsSecuestro:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsSecuestro",
      detalle: error.message,
    });
  }
};

const getOptionsTipoBienes = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_TipoBienes
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsTipoBienes:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsTipoBienes",
      detalle: error.message,
    });
  }
};

const getOptionsEstadoPropiedad = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_EstadoPropiedad
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsEstadoPropiedad:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsEstadoPropiedad",
      detalle: error.message,
    });
  }
};

const getOptionsGravamen = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_Gravamen
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsGravamen:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsGravamen",
      detalle: error.message,
    });
  }
};

const getOptionsTipoGravamen = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_TipoGravamen
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsTipoGravamen:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsTipoGravamen",
      detalle: error.message,
    });
  }
};

const getOptionsRangoGravamen = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_RangoGravamen
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsRangoGravamen:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsRangoGravamen",
      detalle: error.message,
    });
  }
};

const getOptionsEjecucionForzada = async (_req, res) => {
  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_EjecucionForzada
      WHERE SJEstado = 1
    `;

    const options = await db.query(query, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getOptionsEjecucionForzada:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getOptionsEjecucionForzada",
      detalle: error.message,
    });
  }
};

const getLastDetDemanda = async (req, res) => {
  try {
    const { idExpediente } = req.params;

    const query = `
      SELECT * FROM SISTEMAGEST.SJ_DemandaDet
      WHERE SJIdExpediente = :idExpediente AND SJEstado = 1
      ORDER BY SJFechaReg DESC
      LIMIT 1
    `;

    const rawResult = await db.query(query, {
      replacements: { idExpediente },
      type: QueryTypes.SELECT,
    });

    const options = rawResult.map((item) => ({
      ...item,
      SJDemandaAdjunto: item.SJDemandaAdjunto
        ? item.SJDemandaAdjunto.toString()
        : null,
    }));

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getLastDetDemanda:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getLastDetDemanda",
      detalle: error.message,
    });
  }
};

const getSeguimientoProcesal = async (req, res) => {
  const { idSolCautelar } = req.params;

  if (!idSolCautelar) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan datos para procesar la demanda",
    });
  }

  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_SeguimientoProcesal
      WHERE SJIdSolicitudCautelar = :idSolCautelar AND SJEstado = 1
    `;

    const rawResult = await db.query(query, {
      replacements: { idSolCautelar },
      type: QueryTypes.SELECT,
    });

    const options = rawResult.map((item) => ({
      ...item,
      SJAdjuntoEstado: item.SJAdjuntoEstado
        ? item.SJAdjuntoEstado.toString()
        : null,
    }));

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getSeguimientoProcesal:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getSeguimientoProcesal",
      detalle: error.message,
    });
  }
};

const getEjecucionForzada = async (req, res) => {
  const { idSolCautelar } = req.params;

  if (!idSolCautelar) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan datos para procesar la demanda",
    });
  }

  try {
    const query = `
      SELECT * FROM SISTEMAGEST.SJ_InicioEjecucion
      WHERE SJIdSolicitudCautelar = :idSolCautelar AND SJEstado = 1
    `;

    const rawResult = await db.query(query, {
      replacements: { idSolCautelar },
      type: QueryTypes.SELECT,
    });

    const options = rawResult.map((item) => ({
      ...item,
      SJAdjuntoInicio: item.SJAdjuntoInicio
        ? item.SJAdjuntoInicio.toString()
        : null,
    }));

    res.status(200).json({
      ok: true,
      options,
    });
  } catch (error) {
    console.log("Error en getEjecucionForzada:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getEjecucionForzada",
      detalle: error.message,
    });
  }
};

const obtenerExpedientePorId = async (idExpediente) => {
  try {
    const query = `
      SELECT
        SJExpedienteADJ,
        SJDemandaADJ,
        SJDemandaAdjunto,
        SJEPAdjunto,
        SJAdjuntoNumCargoExpAdm,
        SJAdjuntoSolicitudCautelar,
        SJAdjuntoEmbargo,
        SJAdjuntoSecuestro,
        SJFoto,
        SJPartida,
        SJAdjuntoFechaSolicitud,
        SJAdjuntoMCautelar,
        SJAdjuntoEstado,
        SJAdjuntoInicio
      FROM SISTEMAGEST.SJ_Expediente tb1
      LEFT JOIN SISTEMAGEST.SJ_DemandaDet tb2 ON tb1.SJIdExpediente = tb2.SJIdExpediente AND tb2.SJEstado = 1
      LEFT JOIN SISTEMAGEST.SJ_DetEstadoProcesal tb3 ON tb1.SJIdExpediente = tb3.SJIdExpediente AND tb3.SJEstado = 1
      LEFT JOIN SISTEMAGEST.SJ_SolicitudCautelar tb6 ON tb1.SJIdExpediente = tb6.SJIdExpediente AND tb6.SJEstado = 1
      LEFT JOIN SISTEMAGEST.SJ_Propiedad tb7 ON tb6.SJIdSolicitudCautelar = tb7.SJIdSolicitudCautelar AND tb7.SJEstado = 1
      LEFT JOIN SISTEMAGEST.SJ_MedidaCautelar tb8 ON tb6.SJIdSolicitudCautelar = tb8.SJIdSolicitudCautelar AND tb8.SJEstado = 1
      LEFT JOIN SISTEMAGEST.SJ_SeguimientoProcesal tb9 ON tb6.SJIdSolicitudCautelar = tb9.SJIdSolicitudCautelar AND tb9.SJEstado = 1
      LEFT JOIN SISTEMAGEST.SJ_InicioEjecucion tb10 ON tb6.SJIdSolicitudCautelar = tb10.SJIdSolicitudCautelar AND tb10.SJEstado = 1
      WHERE tb1.SJEstado = 1 AND tb1.SJIdExpediente = :id
      LIMIT 1
    `;

    const data = await db.query(query, {
      replacements: { id: idExpediente },
      type: QueryTypes.SELECT,
    });

    return data[0] || null;
  } catch (error) {
    console.error("Error al obtener expediente por ID:", error);
    throw error;
  }
};

// ================================= GUARDAR EXPEDIENTE ==================================
const saveExpedienteNegativo = async (req, res) => {
  try {
    const {
      SJFechaReg,
      usuarioReg,
      fechaIngreso,
      juzgado,
      nroCargoExpediente,
      nroExpediente,
      tipoBusqueda,
      fechaDemanda,
      observacion,
    } = req.body;

    // Validación simple
    if (
      !SJFechaReg ||
      !fechaIngreso ||
      !juzgado ||
      !nroCargoExpediente ||
      !nroExpediente ||
      !tipoBusqueda ||
      !fechaDemanda ||
      !observacion ||
      !usuarioReg
    ) {
      return res
        .status(400)
        .json({ ok: false, mensaje: "Faltan campos obligatorios." });
    }

    // console.log("Datos enviados por el frontend:", req.body);

    // Procesar archivos
    const adjuntoNroCargoExpedientePath = req.files
      ?.adjuntoNroCargoExpediente?.[0]?.filename
      ? `/Adjuntos/InfoGestion/${req.files.adjuntoNroCargoExpediente[0].filename}`
      : null;

    const adjuntoFechaDemandaPath = req.files?.adjuntoFechaDemanda?.[0]
      ?.filename
      ? `/Adjuntos/InfoGestion/${req.files.adjuntoFechaDemanda[0].filename}`
      : null;

    // Insert principal
    const insertQuery = `
      INSERT INTO SISTEMAGEST.SJ_Expediente (
        SJFechaReg, SJUsuarioReg, SJEstado, SJExpedienteADJ, 
        SJFechaIngreso, SJNumeroExpediente, SJJuzgado, SJObservacion, 
        SJFechaDemanda, SJIDBusqueda, SJDemandaADJ, SJNumCargoExpediente
      )
      VALUES (
        :fechaRegistro, :usuarioReg, 1, :adjuntoNroCargoExpediente, 
        :fechaIngreso, :nroExpediente, :juzgado, :observacion, 
        :fechaDemanda, :tipoBusqueda, :adjuntoFechaDemanda, :nroCargoExpediente
      )
    `;

    const [insertId] = await db.query(insertQuery, {
      type: QueryTypes.INSERT,
      replacements: {
        fechaRegistro: SJFechaReg,
        usuarioReg,
        adjuntoNroCargoExpediente: adjuntoNroCargoExpedientePath,
        fechaIngreso,
        nroExpediente,
        juzgado,
        observacion,
        fechaDemanda,
        tipoBusqueda,
        adjuntoFechaDemanda: adjuntoFechaDemandaPath,
        nroCargoExpediente,
      },
    });

    res.status(200).json({ ok: true, mensaje: "Registro exitoso", insertId });
  } catch (error) {
    console.error("Error en saveExpediente:", error);
    res.status(500).json({
      ok: false,
      error: "Error en saveExpediente",
      detalle: error.message,
    });
  }
};

const saveDemandaDetalle = async (req, res) => {
  const {
    SJIdExpediente,
    detalleFecha,
    calificacionDemanda,
    detalleTipoEscrito,
    detalleObservacion,
    SJFechaReg,
    usuarioReg,
  } = req.body;

  if (
    !SJIdExpediente ||
    !detalleFecha ||
    !calificacionDemanda ||
    !detalleObservacion ||
    !SJFechaReg ||
    !usuarioReg
  ) {
    return res
      .status(400)
      .json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const detalleAdjuntoPath = req.files?.detalleAdjunto?.[0]?.filename
      ? `/Adjuntos/Demanda/${req.files.detalleAdjunto[0].filename}`
      : null;

    const insertQuery = `
      INSERT INTO SISTEMAGEST.SJ_DemandaDet (
        SJIdExpediente,
        SJFechaDemanda,
        SJIdDemanda,
        SJTipoEscrito,
        SJObservacion,
        SJDemandaAdjunto,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :idExpediente,
        :detalleFecha,
        :calificacionDemanda,
        :detalleTipoEscrito,
        :detalleObservacion,
        :detalleAdjuntoPath,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `;

    await db.query(insertQuery, {
      type: QueryTypes.INSERT,
      replacements: {
        idExpediente: emptyToNull(SJIdExpediente),
        detalleFecha: emptyToNull(detalleFecha),
        calificacionDemanda: emptyToNull(calificacionDemanda),
        detalleTipoEscrito: emptyToNull(detalleTipoEscrito),
        detalleObservacion: emptyToNull(detalleObservacion),
        detalleAdjuntoPath: emptyToNull(detalleAdjuntoPath),
        SJFechaReg: emptyToNull(SJFechaReg),
        usuarioReg: emptyToNull(usuarioReg),
      },
    });

    return res.status(200).json({ ok: true, mensaje: "Registro exitoso" });
  } catch (error) {
    console.log("Error en saveDemandaDetalle:", error);

    return res.status(500).json({
      ok: false,
      error: "Error en saveDemandaDetalle",
      detalle: error.message,
    });
  }
};

const loadDetallesDemanda = async (req, res) => {
  const { SJIdExpediente } = req.params;

  console.log("loadDetallesDemanda", SJIdExpediente);

  if (!SJIdExpediente) {
    return res
      .status(400)
      .json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const detallesQuery = `
      SELECT
        *
      FROM SISTEMAGEST.SJ_DemandaDet
      WHERE SJIdExpediente = :idExpediente AND SJEstado = 1
    `;

    const rawResult = await db.query(detallesQuery, {
      type: QueryTypes.SELECT,
      replacements: {
        idExpediente: emptyToNull(SJIdExpediente),
      },
    });

    // Convertimos la ruta
    const detalles = rawResult.map((detalle) => ({
      ...detalle,
      SJDemandaAdjunto: detalle.SJDemandaAdjunto
        ? detalle.SJDemandaAdjunto.toString()
        : null,
    }));

    return res.status(200).json({ ok: true, detalles });
  } catch (error) {
    console.log("Error en loadDetallesDemanda:", error);

    return res.status(500).json({
      ok: false,
      error: "Error en loadDetallesDemanda",
      detalle: error.message,
    });
  }
};

const saveDetalleEstadoProcesal = async (req, res) => {
  const {
    SJIdExpediente,
    estadoProcesal,
    detalleEstadoFecha,
    detalleEstadoTipoEscrito,
    detalleEstadoObservacion,
    SJFechaReg,
    usuarioReg,
  } = req.body;

  if (
    !SJIdExpediente ||
    !estadoProcesal ||
    !detalleEstadoFecha ||
    !detalleEstadoTipoEscrito ||
    !detalleEstadoObservacion ||
    !SJFechaReg ||
    !usuarioReg
  ) {
    return res.status(400).json({
      ok: false,
      error: "Faltan campos requeridos",
    });
  }

  try {
    const detalleEstadoAdjuntoPath = req.files?.detalleEstadoAdjunto?.[0]
      ?.filename
      ? `/Adjuntos/Demanda/${req.files.detalleEstadoAdjunto[0].filename}`
      : null;

    const insertEstadoProcesalQuery = `
        INSERT INTO SISTEMAGEST.SJ_DetEstadoProcesal(
          SJIdExpediente, SJFechaEstadoProcesal, SJIdEstadoProcesal, SJTipoEscrito, 
          SJObservacion, SJEPAdjunto, SJFechaReg, SJUsuarioReg, SJEstado
        )
        VALUES (
          :idExpediente, :detalleEstadoFecha, :estadoProcesal, :detalleEstadoTipoEscrito,
          :detalleEstadoObservacion, :detalleEstadoAdjunto, :SJFechaReg, :usuarioReg, 1
        )
      `;

    await db.query(insertEstadoProcesalQuery, {
      type: QueryTypes.INSERT,
      replacements: {
        idExpediente: emptyToNull(SJIdExpediente),
        detalleEstadoFecha: emptyToNull(detalleEstadoFecha),
        estadoProcesal: emptyToNull(estadoProcesal),
        detalleEstadoTipoEscrito: emptyToNull(detalleEstadoTipoEscrito),
        detalleEstadoObservacion: emptyToNull(detalleEstadoObservacion),
        detalleEstadoAdjunto: detalleEstadoAdjuntoPath,
        SJFechaReg: emptyToNull(SJFechaReg),
        usuarioReg: emptyToNull(usuarioReg),
      },
    });

    return res.status(200).json({ ok: true, mensaje: "Registro exitoso" });
  } catch (error) {
    console.log("Error en saveDetalleEstadoProcesal:", error);

    return res.status(500).json({
      ok: false,
      error: "Error en saveDetalleEstadoProcesal",
      detalle: error.message,
    });
  }
};

const loadDetalleEstadoProcesal = async (req, res) => {
  const { SJIdExpediente } = req.params;

  if (!SJIdExpediente) {
    return res
      .status(400)
      .json({ ok: false, error: "Faltan campos requeridos" });
  }

  try {
    const detallesQuery = `
      SELECT
        SJIdDetEstadoProcesal,
        SJIdExpediente,
        SJFechaEstadoProcesal,
        SJIdEstadoProcesal,
        SJTipoEscrito,
        SJObservacion,
        SJEPAdjunto,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      FROM SISTEMAGEST.SJ_DetEstadoProcesal
      WHERE SJIdExpediente = :idExpediente AND SJEstado = 1
    `;

    const rawResult = await db.query(detallesQuery, {
      type: QueryTypes.SELECT,
      replacements: {
        idExpediente: emptyToNull(SJIdExpediente),
      },
    });

    const detalles = rawResult.map((detalle) => ({
      ...detalle,
      SJEPAdjunto: detalle.SJEPAdjunto ? detalle.SJEPAdjunto.toString() : null,
    }));

    return res.status(200).json({ ok: true, detalles });
  } catch (error) {
    console.log("Error en loadDetallesDemanda:", error);

    return res.status(500).json({
      ok: false,
      error: "Error en loadDetallesDemanda",
      detalle: error.message,
    });
  }
};

const updateExpedienteNegativo = async (req, res) => {
  const t = await db.transaction();

  const emptyToNull = (val) => (val === "" || val === undefined ? null : val);

  try {
    const {
      SJIdDemandaDet,
      SJIdDetEstadoProcesal,
      detalleFecha,
      calificacionDemanda,
      detalleTipoEscrito,
      detalleObservacion,
      detalleEstadoFecha,
      estadoProcesal,
      detalleEstadoTipoEscrito,
      detalleEstadoObservacion,
      SJFechaReg,
      usuarioReg,
    } = req.body;

    // Si no se envian los id
    if (!SJIdDemandaDet && !SJIdDetEstadoProcesal) {
      return res
        .status(400)
        .json({ ok: false, error: "Faltan datos para actualizar" });
    }

    // === DemandaDet (UPDATE) ===
    if (SJIdDemandaDet) {
      let detalleAdjuntoPath = null;

      if (req.files?.detalleAdjunto?.[0]?.filename) {
        detalleAdjuntoPath = `/Adjuntos/Demanda/${req.files.detalleAdjunto[0].filename}`;
      } else {
        // 🔁 Traer el valor actual si no se sube uno nuevo
        const [result] = await db.query(
          `SELECT SJDemandaAdjunto FROM SISTEMAGEST.SJ_DemandaDet WHERE SJIdDemandaDet = :id`,
          {
            type: QueryTypes.SELECT,
            replacements: { id: SJIdDemandaDet },
          }
        );
        detalleAdjuntoPath = result?.SJDemandaAdjunto || null;
      }

      await db.query(
        `
        UPDATE SISTEMAGEST.SJ_DemandaDet SET
          SJFechaDemanda = :detalleFecha,
          SJIdDemanda = :calificacionDemanda,
          SJTipoEscrito = :detalleTipoEscrito,
          SJObservacion = :detalleObservacion,
          SJDemandaAdjunto = :detalleAdjunto,
          SJFechaReg = :SJFechaReg,
          SJUsuarioReg = :usuarioReg
        WHERE SJIdDemandaDet = :SJIdDemandaDet
        `,
        {
          transaction: t,
          type: QueryTypes.UPDATE,
          replacements: {
            SJIdDemandaDet,
            detalleFecha: emptyToNull(detalleFecha),
            calificacionDemanda: emptyToNull(calificacionDemanda),
            detalleTipoEscrito: emptyToNull(detalleTipoEscrito),
            detalleObservacion: emptyToNull(detalleObservacion),
            detalleAdjunto: detalleAdjuntoPath,
            SJFechaReg: emptyToNull(SJFechaReg),
            usuarioReg: emptyToNull(usuarioReg),
          },
        }
      );
    }

    // === DetEstadoProcesal (UPDATE) ===
    if (SJIdDetEstadoProcesal) {
      let detalleEstadoAdjuntoPath = null;

      if (req.files?.detalleEstadoAdjunto?.[0]?.filename) {
        detalleEstadoAdjuntoPath = `/Adjuntos/Demanda/${req.files.detalleEstadoAdjunto[0].filename}`;
      } else {
        const [result] = await db.query(
          `SELECT SJEPAdjunto FROM SISTEMAGEST.SJ_DetEstadoProcesal WHERE SJIdDetEstadoProcesal = :id`,
          {
            type: QueryTypes.SELECT,
            replacements: { id: SJIdDetEstadoProcesal },
          }
        );
        detalleEstadoAdjuntoPath = result?.SJEPAdjunto || null;
      }

      await db.query(
        `
        UPDATE SISTEMAGEST.SJ_DetEstadoProcesal SET
          SJFechaEstadoProcesal = :detalleEstadoFecha,
          SJIdEstadoProcesal = :estadoProcesal,
          SJTipoEscrito = :detalleEstadoTipoEscrito,
          SJObservacion = :detalleEstadoObservacion,
          SJEPAdjunto = :detalleEstadoAdjunto,
          SJFechaReg = :SJFechaReg,
          SJUsuarioReg = :usuarioReg
        WHERE SJIdDetEstadoProcesal = :SJIdDetEstadoProcesal
        `,
        {
          transaction: t,
          type: QueryTypes.UPDATE,
          replacements: {
            SJIdDetEstadoProcesal,
            detalleEstadoFecha: emptyToNull(detalleEstadoFecha),
            estadoProcesal: emptyToNull(estadoProcesal),
            detalleEstadoTipoEscrito: emptyToNull(detalleEstadoTipoEscrito),
            detalleEstadoObservacion: emptyToNull(detalleEstadoObservacion),
            detalleEstadoAdjunto: detalleEstadoAdjuntoPath,
            SJFechaReg: emptyToNull(SJFechaReg),
            usuarioReg: emptyToNull(usuarioReg),
          },
        }
      );
    }

    await t.commit();
    res.status(200).json({ ok: true, mensaje: "Actualización exitosa" });
  } catch (error) {
    await t.rollback();
    console.error("Error en updateExpedienteNegativo:", error);
    res.status(500).json({
      ok: false,
      error: "Error en updateExpedienteNegativo",
      detalle: error.message,
    });
  }
};

const saveExpedientePositivo = async (req, res) => {
  const t = await db.transaction();

  // ESTO ES DE PRUEBA, VENDRA DEL FORMULARIO O VENDRA DE LA FUNCION NEXT AL CREAR SISTEMAGEST.SJ_DemandaDet
  const idExpediente = 1;

  const limpiarCampo = (valor) => {
    if (Array.isArray(valor)) {
      return valor.find((v) => v);
    }
    return valor || null;
  };

  try {
    const {
      fechaIngresoSC,
      nroCargoExpAdmSC,
      solicitudCautelar,
      formaSC,
      tipoBienesSC,
      embargoSC,
      secuestroSC,
      estadoPropiedadSC,
      gravamenSC,
      tipoGravamenSC,
      rangoGravamenSC,
      tipoGravamenObsSC,
      montoGravamenSC,
      detalleDelBienSC,
      estadoPropiedadObsSC,
      jusgadoSC,
      nroExpedienteSC,
      fechaSC,
      calificacionMCautelar,
      observacionSC,
      fechaMCautelar,
      tipoEscritoMCautelar,
      observacionMCautelar,
      estadoProcesalDP,
      detalleEstadoFechaDP,
      detalleEstadoTipoEscritoDP,
      detalleEstadoObservacionDP,
      inicioEjecucion,
      detalleInicioFechaDP,
      detalleInicioTipoEscritoDP,
      detalleInicioObservacionDP,
      usuarioReg,
      SJFechaReg,
      tipoBusqueda,
    } = req.body;

    /** 1. Procesar archivos adjuntos **/
    const getFilePath = (field, folder) =>
      req.files?.[field]?.[0]?.filename
        ? `/Adjuntos/${folder}/${req.files[field][0].filename}`
        : null;

    const adjuntoNroCargoExpAdmSC = getFilePath(
      "nroCargoExpAdmAdjuntoSC",
      "InfoGestion"
    );
    const adjuntoSolicitudCautelar = getFilePath(
      "adjuntoSolicitudCautelar",
      "InfoGestion"
    );
    const adjuntoEmbargoSC = getFilePath("adjuntoEmbargoSC", "InfoGestion");
    const adjuntoSecuestroSC = getFilePath("adjuntoSecuestroSC", "InfoGestion");
    const fotoSC = getFilePath("fotoSC", "Propiedad");
    const partidaSC = getFilePath("partidaSC", "Propiedad");
    const adjuntoFechaSC = getFilePath("adjuntoFechaSC", "SolCautelar");
    const adjuntoMCautelar = getFilePath("adjuntoMCautelar", "SolCautelar");
    const detalleEstadoAdjuntoDP = getFilePath(
      "detalleEstadoAdjuntoDP",
      "SegProcesal"
    );
    const detalleInicioAdjuntoDP = getFilePath(
      "detalleInicioAdjuntoDP",
      "EjecForzada"
    );

    /** 2. Insertar en SJ_SolicitudCautelar **/
    const [solicitudCautelarResult] = await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_SolicitudCautelar (
        SJFechaIngreso,
        SJNumCargoExpAdm,
        SJAdjuntoNumCargoExpAdm,
        SJIDBusqueda,
        SJIdSolicitudCautelarTipo,
        SJAdjuntoSolicitudCautelar,
        SJIdFormaCautelar,
        SJIdTipoBienes,
        SJIdEmbargo,
        SJAdjuntoEmbargo,
        SJIdSecuestro,
        SJAdjuntoSecuestro,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado,
        SJIdExpediente
      )
      VALUES (
        :fechaIngresoSC,
        :nroCargoExpAdmSC,
        :adjuntoNroCargoExpAdmSC,
        :tipoBusqueda,
        :solicitudCautelar,
        :adjuntoSolicitudCautelar,
        :formaSC,
        :tipoBienesSC,
        :embargoSC,
        :adjuntoEmbargoSC,
        :secuestroSC,
        :adjuntoSecuestroSC,
        :SJFechaReg,
        :usuarioReg,
        1,
        :idExpediente
      )
    `,
      {
        transaction: t,
        type: QueryTypes.INSERT,
        replacements: {
          fechaIngresoSC: limpiarCampo(fechaIngresoSC) || null,
          nroCargoExpAdmSC: limpiarCampo(nroCargoExpAdmSC) || null,
          adjuntoNroCargoExpAdmSC:
            limpiarCampo(adjuntoNroCargoExpAdmSC) || null,
          tipoBusqueda: limpiarCampo(tipoBusqueda) || null,
          solicitudCautelar: limpiarCampo(solicitudCautelar) || null,
          adjuntoSolicitudCautelar:
            limpiarCampo(adjuntoSolicitudCautelar) || null,
          formaSC: limpiarCampo(formaSC) || null,
          tipoBienesSC: limpiarCampo(tipoBienesSC) || null,
          embargoSC: limpiarCampo(embargoSC) || null,
          adjuntoEmbargoSC: limpiarCampo(adjuntoEmbargoSC) || null,
          secuestroSC: limpiarCampo(secuestroSC) || null,
          adjuntoSecuestroSC: limpiarCampo(adjuntoSecuestroSC) || null,
          SJFechaReg: limpiarCampo(SJFechaReg) || null,
          usuarioReg: limpiarCampo(usuarioReg) || null,
          idExpediente: limpiarCampo(idExpediente) || null,
        },
      }
    );

    const idSolicitudCautelar = solicitudCautelarResult;

    /** 3. Insertar en SJ_Propiedad **/
    await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_Propiedad (
        SJIdSolicitudCautelar,
        SJIdEstadoPropiedad,
        SJIdGravamen,
        SJIdTipoGravamen,
        SJIdRangoGravamen,
        SJTipoGravamenObs,
        SJMontoGravamen,
        SJFoto,
        SJPartida,
        SJDetalleBien,
        SJEstadoPropiedadObs,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :idSolicitudCautelar,
        :estadoPropiedadSC,
        :gravamenSC,
        :tipoGravamenSC,
        :rangoGravamenSC,
        :tipoGravamenObsSC,
        :montoGravamenSC,
        :fotoSC,
        :partidaSC,
        :detalleDelBienSC,
        :estadoPropiedadObsSC,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `,
      {
        transaction: t,
        type: QueryTypes.INSERT,
        replacements: {
          idSolicitudCautelar: limpiarCampo(idSolicitudCautelar) || null,
          estadoPropiedadSC: limpiarCampo(estadoPropiedadSC) || null,
          gravamenSC: limpiarCampo(gravamenSC) || null,
          tipoGravamenSC: limpiarCampo(tipoGravamenSC) || null,
          rangoGravamenSC: limpiarCampo(rangoGravamenSC) || null,
          tipoGravamenObsSC: limpiarCampo(tipoGravamenObsSC) || null,
          montoGravamenSC: limpiarCampo(montoGravamenSC) || null,
          fotoSC: limpiarCampo(fotoSC) || null,
          partidaSC: limpiarCampo(partidaSC) || null,
          detalleDelBienSC: limpiarCampo(detalleDelBienSC) || null,
          estadoPropiedadObsSC: limpiarCampo(estadoPropiedadObsSC) || null,
          SJFechaReg: limpiarCampo(SJFechaReg) || null,
          usuarioReg: limpiarCampo(usuarioReg) || null,
        },
      }
    );

    /** 4. Insertar en SJ_MedidaCautelar **/
    await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_MedidaCautelar (
        SJIdSolicitudCautelar,
        SJJuzgado,
        SJNumeroExpediente,
        SJFechaSolicitud,
        SJAdjuntoFechaSolicitud,
        SJIdCalificacionMCautelar,
        SJObservacion,
        SJFechaMCautelar,
        SJTipoEscritoMCautelar,
        SJAdjuntoMCautelar,
        SJObservacionMCautelar,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :idSolicitudCautelar,
        :jusgadoSC,
        :nroExpedienteSC,
        :fechaSC,
        :adjuntoFechaSC,
        :calificacionMCautelar,
        :observacionSC,
        :fechaMCautelar,
        :tipoEscritoMCautelar,
        :adjuntoMCautelar,
        :observacionMCautelar,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `,
      {
        transaction: t,
        type: QueryTypes.INSERT,
        replacements: {
          idSolicitudCautelar: limpiarCampo(idSolicitudCautelar) || null,
          jusgadoSC: limpiarCampo(jusgadoSC) || null,
          nroExpedienteSC: limpiarCampo(nroExpedienteSC) || null,
          fechaSC: limpiarCampo(fechaSC) || null,
          adjuntoFechaSC: limpiarCampo(adjuntoFechaSC) || null,
          calificacionMCautelar: limpiarCampo(calificacionMCautelar) || null,
          observacionSC: limpiarCampo(observacionSC) || null,
          fechaMCautelar: limpiarCampo(fechaMCautelar) || null,
          tipoEscritoMCautelar: limpiarCampo(tipoEscritoMCautelar) || null,
          adjuntoMCautelar: limpiarCampo(adjuntoMCautelar) || null,
          observacionMCautelar: limpiarCampo(observacionMCautelar) || null,
          SJFechaReg: limpiarCampo(SJFechaReg) || null,
          usuarioReg: limpiarCampo(usuarioReg) || null,
        },
      }
    );

    /** 5. Insertar en SJ_SeguimientoProcesal **/
    await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_SeguimientoProcesal (
        SJIdSolicitudCautelar,
        SJIdEstadoProcesal,
        SJFechaEstado,
        SJTipoEscrito,
        SJAdjuntoEstado,
        SJObservacion,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :idSolicitudCautelar,
        :estadoProcesalDP,
        :detalleEstadoFechaDP,
        :detalleEstadoTipoEscritoDP,
        :detalleEstadoAdjuntoDP,
        :detalleEstadoObservacionDP,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `,
      {
        transaction: t,
        type: QueryTypes.INSERT,
        replacements: {
          idSolicitudCautelar: limpiarCampo(idSolicitudCautelar) || null,
          estadoProcesalDP: limpiarCampo(estadoProcesalDP) || null,
          detalleEstadoFechaDP: limpiarCampo(detalleEstadoFechaDP) || null,
          detalleEstadoTipoEscritoDP:
            limpiarCampo(detalleEstadoTipoEscritoDP) || null,
          detalleEstadoAdjuntoDP: limpiarCampo(detalleEstadoAdjuntoDP) || null,
          detalleEstadoObservacionDP:
            limpiarCampo(detalleEstadoObservacionDP) || null,
          SJFechaReg: limpiarCampo(SJFechaReg) || null,
          usuarioReg: limpiarCampo(usuarioReg) || null,
        },
      }
    );

    /** 6. Insertar en SJ_InicioEjecucion **/
    await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_InicioEjecucion (
        SJIdSolicitudCautelar,
        SJIdEjecucionForzada,
        SJFechaInicio,
        SJTipoEscrito,
        SJAdjuntoInicio,
        SJObservacion,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :idSolicitudCautelar,
        :inicioEjecucion,
        :detalleInicioFechaDP,
        :detalleInicioTipoEscritoDP,
        :detalleInicioAdjuntoDP,
        :detalleInicioObservacionDP,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `,
      {
        transaction: t,
        type: QueryTypes.INSERT,
        replacements: {
          idSolicitudCautelar: limpiarCampo(idSolicitudCautelar) || null,
          inicioEjecucion: limpiarCampo(inicioEjecucion) || null,
          detalleInicioFechaDP: limpiarCampo(detalleInicioFechaDP) || null,
          detalleInicioTipoEscritoDP:
            limpiarCampo(detalleInicioTipoEscritoDP) || null,
          detalleInicioAdjuntoDP: limpiarCampo(detalleInicioAdjuntoDP) || null,
          detalleInicioObservacionDP:
            limpiarCampo(detalleInicioObservacionDP) || null,
          SJFechaReg: limpiarCampo(SJFechaReg) || null,
          usuarioReg: limpiarCampo(usuarioReg) || null,
        },
      }
    );

    /** Finalizar **/
    await t.commit();
    res.status(200).json({ ok: true, mensaje: "Registro positivo exitoso" });
  } catch (error) {
    await t.rollback();
    console.error("Error en saveExpedientePositivo:", error);
    res.status(500).json({
      ok: false,
      error: "Error en saveExpedientePositivo",
      detalle: error.message,
    });
  }
};

// GUARDAR SOLICITUD CAUTELAR
const saveSolicitudCautelar = async (req, res) => {
  const {
    fechaIngresoSC,
    nroCargoExpAdmSC,
    solicitudCautelar,
    formaSC,
    tipoBienesSC,
    embargoSC,
    secuestroSC,
    usuarioReg,
    SJFechaReg,
    tipoBusqueda,
    SJIdExpediente,
  } = req.body;

  // todos los campos obligatorios
  if (
    !fechaIngresoSC ||
    !nroCargoExpAdmSC ||
    !solicitudCautelar ||
    !formaSC ||
    !tipoBienesSC ||
    !usuarioReg ||
    !SJFechaReg ||
    !tipoBusqueda ||
    !SJIdExpediente
  ) {
    return res
      .status(400)
      .json({ ok: false, mensaje: "Faltan campos obligatorios." });
  }

  try {
    const adjuntoNroCargoExpAdmSC = getFilePath(
      req,
      "nroCargoExpAdmAdjuntoSC",
      "InfoGestion"
    );
    const adjuntoSolicitudCautelar = getFilePath(
      req,
      "adjuntoSolicitudCautelar",
      "InfoGestion"
    );
    const adjuntoEmbargoSC = getFilePath(
      req,
      "adjuntoEmbargoSC",
      "InfoGestion"
    );
    const adjuntoSecuestroSC = getFilePath(
      req,
      "adjuntoSecuestroSC",
      "InfoGestion"
    );

    const [result] = await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_SolicitudCautelar (
        SJFechaIngreso,
        SJNumCargoExpAdm,
        SJAdjuntoNumCargoExpAdm,
        SJIDBusqueda,
        SJIdSolicitudCautelarTipo,
        SJAdjuntoSolicitudCautelar,
        SJIdFormaCautelar,
        SJIdTipoBienes,
        SJIdEmbargo,
        SJAdjuntoEmbargo,
        SJIdSecuestro,
        SJAdjuntoSecuestro,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado,
        SJIdExpediente
      )
      VALUES (
        :fechaIngresoSC,
        :nroCargoExpAdmSC,
        :adjuntoNroCargoExpAdmSC,
        :tipoBusqueda,
        :solicitudCautelar,
        :adjuntoSolicitudCautelar,
        :formaSC,
        :tipoBienesSC,
        :embargoSC,
        :adjuntoEmbargoSC,
        :secuestroSC,
        :adjuntoSecuestroSC,
        :SJFechaReg,
        :usuarioReg,
        1,
        :SJIdExpediente
      )
    `,
      {
        replacements: {
          fechaIngresoSC: limpiarCampo(fechaIngresoSC),
          nroCargoExpAdmSC: limpiarCampo(nroCargoExpAdmSC),
          adjuntoNroCargoExpAdmSC: limpiarCampo(adjuntoNroCargoExpAdmSC),
          tipoBusqueda: limpiarCampo(tipoBusqueda),
          solicitudCautelar: limpiarCampo(solicitudCautelar),
          adjuntoSolicitudCautelar: limpiarCampo(adjuntoSolicitudCautelar),
          formaSC: limpiarCampo(formaSC),
          tipoBienesSC: limpiarCampo(tipoBienesSC),
          embargoSC: limpiarCampo(embargoSC),
          adjuntoEmbargoSC: limpiarCampo(adjuntoEmbargoSC),
          secuestroSC: limpiarCampo(secuestroSC),
          adjuntoSecuestroSC: limpiarCampo(adjuntoSecuestroSC),
          SJFechaReg: limpiarCampo(SJFechaReg),
          usuarioReg: limpiarCampo(usuarioReg),
          SJIdExpediente: limpiarCampo(SJIdExpediente),
        },
      }
    );

    res.status(200).json({ ok: true, insertId: result });
  } catch (error) {
    console.error("Error en saveSolicitudCautelar:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al guardar Solicitud Cautelar",
      error: error.message,
    });
  }
};

const getInformacionMedidaCautelar = async (req, res) => {
  const { idSolCautelar } = req.params;

  console.log("getInformacionMedidaCautelar", idSolCautelar);

  if (!idSolCautelar) {
    return res
      .status(400)
      .json({ ok: false, mensaje: "Faltan campos obligatorios." });
  }

  try {
    const [result] = await db.query(
      `
      SELECT
        *
      FROM SISTEMAGEST.SJ_MedidaCautelar
      WHERE SJIdSolicitudCautelar = :idSolCautelar AND SJEstado = 1
    `,
      {
        replacements: {
          idSolCautelar,
        },
      }
    );

    if (result.length > 0) {
      res.status(200).json({ ok: true, informacionMedidaCautelar: result });
    } else {
      res.status(200).json({ ok: true, informacionMedidaCautelar: [] });
    }
  } catch (error) {
    console.error("Error en getInformacionMedidaCautelar:", error);
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error interno del servidor" });
  }
};

// GUARDAR PROPIEDAD
const savePropiedad = async (req, res) => {
  const {
    SJIdSolicitudCautelar,
    estadoPropiedadSC,
    gravamenSC,
    tipoGravamenSC,
    rangoGravamenSC,
    tipoGravamenObsSC,
    montoGravamenSC,
    detalleDelBienSC,
    estadoPropiedadObsSC,
    SJFechaReg,
    usuarioReg,
  } = req.body;

  // campos obligatorios
  if (!SJIdSolicitudCautelar) {
    return res
      .status(400)
      .json({ ok: false, mensaje: "Faltan campos obligatorios." });
  }

  try {
    const fotoSC = getFilePath(req, "fotoSC", "Propiedad");
    const partidaSC = getFilePath(req, "partidaSC", "Propiedad");

    await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_Propiedad (
        SJIdSolicitudCautelar,
        SJIdEstadoPropiedad,
        SJIdGravamen,
        SJIdTipoGravamen,
        SJIdRangoGravamen,
        SJTipoGravamenObs,
        SJMontoGravamen,
        SJFoto,
        SJPartida,
        SJDetalleBien,
        SJEstadoPropiedadObs,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :SJIdSolicitudCautelar,
        :estadoPropiedadSC,
        :gravamenSC,
        :tipoGravamenSC,
        :rangoGravamenSC,
        :tipoGravamenObsSC,
        :montoGravamenSC,
        :fotoSC,
        :partidaSC,
        :detalleDelBienSC,
        :estadoPropiedadObsSC,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `,
      {
        replacements: {
          SJIdSolicitudCautelar: limpiarCampo(SJIdSolicitudCautelar),
          estadoPropiedadSC: limpiarCampo(estadoPropiedadSC),
          gravamenSC: limpiarCampo(gravamenSC),
          tipoGravamenSC: limpiarCampo(tipoGravamenSC),
          rangoGravamenSC: limpiarCampo(rangoGravamenSC),
          tipoGravamenObsSC: limpiarCampo(tipoGravamenObsSC),
          montoGravamenSC: limpiarCampo(montoGravamenSC),
          fotoSC: limpiarCampo(fotoSC),
          partidaSC: limpiarCampo(partidaSC),
          detalleDelBienSC: limpiarCampo(detalleDelBienSC),
          estadoPropiedadObsSC: limpiarCampo(estadoPropiedadObsSC),
          SJFechaReg: limpiarCampo(SJFechaReg),
          usuarioReg: limpiarCampo(usuarioReg),
        },
      }
    );

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error en savePropiedad:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al guardar Propiedad",
      error: error.message,
    });
  }
};

const getInformacionPropiedad = async (req, res) => {
  const { idSolCautelar } = req.params;

  console.log("getInformacionPropiedad", idSolCautelar);

  if (!idSolCautelar) {
    return res
      .status(400)
      .json({ ok: false, mensaje: "Faltan campos obligatorios." });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT 
        P.SJIdSolicitudCautelar,
        P.SJIdEstadoPropiedad,
        EP.SJDescripcion AS EstadoPropiedadDescripcion,
        P.SJIdGravamen,
        G.SJDescripcion AS GravamenDescripcion,
        P.SJIdTipoGravamen,
        TG.SJDescripcion AS TipoGravamenDescripcion,
        P.SJIdRangoGravamen,
        RG.SJDescripcion AS RangoGravamenDescripcion,
        P.SJTipoGravamenObs,
        P.SJMontoGravamen,
        P.SJFoto,
        P.SJPartida,
        P.SJDetalleBien,
        P.SJEstadoPropiedadObs,
        P.SJFechaReg,
        P.SJUsuarioReg,
        P.SJEstado
        FROM SISTEMAGEST.SJ_Propiedad P
        LEFT JOIN SISTEMAGEST.SJ_EstadoPropiedad EP ON P.SJIdEstadoPropiedad = EP.SJIdEstadoPropiedad AND EP.SJEstado = 1
        LEFT JOIN SISTEMAGEST.SJ_Gravamen G ON P.SJIdGravamen = G.SJIdGravamen AND G.SJEstado = 1
        LEFT JOIN SISTEMAGEST.SJ_TipoGravamen TG ON P.SJIdTipoGravamen = TG.SJIdTipoGravamen AND TG.SJEstado = 1
        LEFT JOIN SISTEMAGEST.SJ_RangoGravamen RG ON P.SJIdRangoGravamen = RG.SJIdRangoGravamen AND RG.SJEstado = 1
        WHERE P.SJEstado = 1;
    `,
      {
        replacements: {
          idSolCautelar,
        },
      }
    );

    const informacionPropiedad = rows.map((item) => ({
      ...item,
      SJFoto: item.SJFoto ? item.SJFoto.toString() : null,
      SJPartida: item.SJPartida ? item.SJPartida.toString() : null,
    }));

    res.status(200).json({ ok: true, informacionPropiedad });
  } catch (error) {
    console.error("Error en getInformacionPropiedad:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al obtener información de Propiedad",
      error: error.message,
    });
  }
};

// GUARDAR MEDIDA CAUTELAR
const saveMedidaCautelar = async (req, res) => {
  const {
    SJIdSolicitudCautelar,
    jusgadoSC,
    nroExpedienteSC,
    fechaSC,
    calificacionMCautelar,
    observacionSC,
    fechaMCautelar,
    tipoEscritoMCautelar,
    observacionMCautelar,
    SJFechaReg,
    usuarioReg,
  } = req.body;

  // campos obligatorios
  if (!SJIdSolicitudCautelar) {
    return res
      .status(400)
      .json({ ok: false, mensaje: "Faltan campos obligatorios." });
  }

  try {
    const adjuntoFechaSC = getFilePath(req, "adjuntoFechaSC", "SolCautelar");
    const adjuntoMCautelar = getFilePath(
      req,
      "adjuntoMCautelar",
      "SolCautelar"
    );

    await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_MedidaCautelar (
        SJIdSolicitudCautelar,
        SJJuzgado,
        SJNumeroExpediente,
        SJFechaSolicitud,
        SJAdjuntoFechaSolicitud,
        SJIdCalificacionMCautelar,
        SJObservacion,
        SJFechaMCautelar,
        SJTipoEscritoMCautelar,
        SJAdjuntoMCautelar,
        SJObservacionMCautelar,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :SJIdSolicitudCautelar,
        :jusgadoSC,
        :nroExpedienteSC,
        :fechaSC,
        :adjuntoFechaSC,
        :calificacionMCautelar,
        :observacionSC,
        :fechaMCautelar,
        :tipoEscritoMCautelar,
        :adjuntoMCautelar,
        :observacionMCautelar,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `,
      {
        replacements: {
          SJIdSolicitudCautelar: limpiarCampo(SJIdSolicitudCautelar),
          jusgadoSC: limpiarCampo(jusgadoSC),
          nroExpedienteSC: limpiarCampo(nroExpedienteSC),
          fechaSC: limpiarCampo(fechaSC),
          adjuntoFechaSC: limpiarCampo(adjuntoFechaSC),
          calificacionMCautelar: limpiarCampo(calificacionMCautelar),
          observacionSC: limpiarCampo(observacionSC),
          fechaMCautelar: limpiarCampo(fechaMCautelar),
          tipoEscritoMCautelar: limpiarCampo(tipoEscritoMCautelar),
          adjuntoMCautelar: limpiarCampo(adjuntoMCautelar),
          observacionMCautelar: limpiarCampo(observacionMCautelar),
          SJFechaReg: limpiarCampo(SJFechaReg),
          usuarioReg: limpiarCampo(usuarioReg),
        },
      }
    );

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error en saveMedidaCautelar:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al guardar Medida Cautelar",
      error: error.message,
    });
  }
};

// SEGUIMIENTO PROCESAL
const saveSeguimientoProcesal = async (req, res) => {
  const {
    SJIdSolicitudCautelar,
    estadoProcesalDP,
    detalleEstadoFechaDP,
    detalleEstadoTipoEscritoDP,
    detalleEstadoObservacionDP,
    SJFechaReg,
    usuarioReg,
  } = req.body;

  if (
    !SJIdSolicitudCautelar ||
    !estadoProcesalDP ||
    !detalleEstadoFechaDP ||
    !detalleEstadoTipoEscritoDP ||
    !detalleEstadoObservacionDP ||
    !SJFechaReg ||
    !usuarioReg
  ) {
    return res
      .status(400)
      .json({ ok: false, mensaje: "Faltan campos obligatorios." });
  }

  try {
    const detalleEstadoAdjuntoDP = getFilePath(
      req,
      "detalleEstadoAdjuntoDP",
      "SegProcesal"
    );

    await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_SeguimientoProcesal (
        SJIdSolicitudCautelar,
        SJIdEstadoProcesal,
        SJFechaEstado,
        SJTipoEscrito,
        SJAdjuntoEstado,
        SJObservacion,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :SJIdSolicitudCautelar,
        :estadoProcesalDP,
        :detalleEstadoFechaDP,
        :detalleEstadoTipoEscritoDP,
        :detalleEstadoAdjuntoDP,
        :detalleEstadoObservacionDP,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `,
      {
        replacements: {
          SJIdSolicitudCautelar: limpiarCampo(SJIdSolicitudCautelar),
          estadoProcesalDP: limpiarCampo(estadoProcesalDP),
          detalleEstadoFechaDP: limpiarCampo(detalleEstadoFechaDP),
          detalleEstadoTipoEscritoDP: limpiarCampo(detalleEstadoTipoEscritoDP),
          detalleEstadoAdjuntoDP: limpiarCampo(detalleEstadoAdjuntoDP),
          detalleEstadoObservacionDP: limpiarCampo(detalleEstadoObservacionDP),
          SJFechaReg: limpiarCampo(SJFechaReg),
          usuarioReg: limpiarCampo(usuarioReg),
        },
      }
    );

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error en saveSeguimientoProcesal:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al guardar Seguimiento Procesal",
      error: error.message,
    });
  }
};

// EJECUCION FORZADA
const saveInicioEjecucion = async (req, res) => {
  const {
    SJIdSolicitudCautelar,
    inicioEjecucion,
    detalleInicioFechaDP,
    detalleInicioTipoEscritoDP,
    detalleInicioObservacionDP,
    SJFechaReg,
    usuarioReg,
  } = req.body;

  if (
    !SJIdSolicitudCautelar ||
    !inicioEjecucion ||
    !detalleInicioFechaDP ||
    !detalleInicioTipoEscritoDP ||
    !detalleInicioObservacionDP ||
    !SJFechaReg ||
    !usuarioReg
  ) {
    return res
      .status(400)
      .json({ ok: false, mensaje: "Faltan campos obligatorios." });
  }

  try {
    const detalleInicioAdjuntoDP = getFilePath(
      req,
      "detalleInicioAdjuntoDP",
      "EjecForzada"
    );

    await db.query(
      `
      INSERT INTO SISTEMAGEST.SJ_InicioEjecucion (
        SJIdSolicitudCautelar,
        SJIdEjecucionForzada,
        SJFechaInicio,
        SJTipoEscrito,
        SJAdjuntoInicio,
        SJObservacion,
        SJFechaReg,
        SJUsuarioReg,
        SJEstado
      )
      VALUES (
        :SJIdSolicitudCautelar,
        :inicioEjecucion,
        :detalleInicioFechaDP,
        :detalleInicioTipoEscritoDP,
        :detalleInicioAdjuntoDP,
        :detalleInicioObservacionDP,
        :SJFechaReg,
        :usuarioReg,
        1
      )
    `,
      {
        replacements: {
          SJIdSolicitudCautelar: limpiarCampo(SJIdSolicitudCautelar),
          inicioEjecucion: limpiarCampo(inicioEjecucion),
          detalleInicioFechaDP: limpiarCampo(detalleInicioFechaDP),
          detalleInicioTipoEscritoDP: limpiarCampo(detalleInicioTipoEscritoDP),
          detalleInicioAdjuntoDP: limpiarCampo(detalleInicioAdjuntoDP),
          detalleInicioObservacionDP: limpiarCampo(detalleInicioObservacionDP),
          SJFechaReg: limpiarCampo(SJFechaReg),
          usuarioReg: limpiarCampo(usuarioReg),
        },
      }
    );

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error en saveInicioEjecucion:", error);
    res.status(500).json({
      ok: false,
      mensaje: "Error al guardar Inicio Ejecución",
      error: error.message,
    });
  }
};

// SOLICITUD DE LA DEMANDA
const saveSolDemanda = async (req, res) => {
  const {
    SJIdDemandaDet,
    solicitudCautelar,
    SJIdExpediente,
    usuarioReg,
    SJFechaReg,
    juzgadoDemandaSC,
    nroExpedienteDemandaSC,
    calDemandaSC,
    observacionDemandaSC,
    fechaCalDemandaSC,
    tipoEscritoCalDemandaSC,
    observacionCalDemandaSC,
  } = req.body;

  if (!SJIdExpediente || !solicitudCautelar) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan datos para procesar la demanda",
    });
  }

  try {
    if (parseInt(solicitudCautelar) === 1) {
      // Crear nuevo detalle de demanda
      const adjuntoCalDemandaSC = req.files?.adjuntoCalDemandaSC?.[0]?.filename
        ? `/Adjuntos/Demanda/${req.files.adjuntoCalDemandaSC[0].filename}`
        : null;

      const [insertResult] = await db.query(
        `
        INSERT INTO SISTEMAGEST.SJ_DemandaDet (
          SJIdExpediente,
          SJFechaDemanda,
          SJIdDemanda,
          SJTipoEscrito,
          SJObservacion,
          SJDemandaAdjunto,
          SJFechaReg,
          SJUsuarioReg,
          SJEstado,
          SJJuzgado,
          SJNumeroExpediente,
          SJObservacionCal
        )
        VALUES (
          :idExpediente,
          :fechaCalDemandaSC,
          :calDemandaSC,
          :tipoEscritoCalDemandaSC,
          :observacionDemandaSC,
          :adjuntoCalDemandaSC,
          :SJFechaReg,
          :usuarioReg,
          1,
          :juzgadoDemandaSC,
          :nroExpedienteDemandaSC,
          :observacionCalDemandaSC
        )
        `,
        {
          type: QueryTypes.INSERT,
          replacements: {
            idExpediente: SJIdExpediente,
            fechaCalDemandaSC: limpiarCampo(fechaCalDemandaSC),
            calDemandaSC: limpiarCampo(calDemandaSC),
            tipoEscritoCalDemandaSC: limpiarCampo(tipoEscritoCalDemandaSC),
            observacionDemandaSC: limpiarCampo(observacionDemandaSC),
            adjuntoCalDemandaSC: limpiarCampo(adjuntoCalDemandaSC),
            SJFechaReg: limpiarCampo(SJFechaReg),
            usuarioReg: limpiarCampo(usuarioReg),
            juzgadoDemandaSC: limpiarCampo(juzgadoDemandaSC),
            nroExpedienteDemandaSC: limpiarCampo(nroExpedienteDemandaSC),
            observacionCalDemandaSC: limpiarCampo(observacionCalDemandaSC),
          },
        }
      );

      if (insertResult) {
        return res.status(200).json({ ok: true });
      } else {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al guardar la solicitud de la demanda",
        });
      }
    }
  } catch (error) {
    console.error("Error en saveDemandaDet:", error);

    return res.status(500).json({
      ok: false,
      error: "Error en saveDemandaDet",
      detalle: error.message,
    });
  }
};

// ================================= OBTENER EXPEDIENTES =================================
const getExpedientesJudiciales = async (_req, res) => {
  try {
    const query = `
      SELECT
        tb1.SJIdExpediente,
        tb1.SJFechaReg,
        tb1.SJFechaIngreso,
        tb1.SJJuzgado,
        tb1.SJNumCargoExpediente,
        tb1.SJExpedienteADJ,
        tb1.SJNumeroExpediente,
        tb1.SJIDBusqueda,
        tb1.SJFechaDemanda,
        tb1.SJDemandaADJ,
        tb1.SJObservacion AS ObservacionExpediente,

        tb2.SJIdDemandaDet,
        tb2.SJIdDemanda,
        tb4.SJDescripcion AS DescripcionDemanda,
        tb2.SJFechaDemanda AS FechaDemandaDetalle,
        tb2.SJTipoEscrito AS TipoEscritoDetalle,
        tb2.SJDemandaAdjunto AS AdjuntoDetalle,
        tb2.SJObservacion AS ObservacionDetalle,

        tb3.SJIdDetEstadoProcesal,
        tb3.SJIdEstadoProcesal,
        tb5.SJDescripcion AS DescripcionEstadoProcesal,
        tb3.SJFechaEstadoProcesal,
        tb3.SJTipoEscrito AS TipoEscritoEstadoProcesal,
        tb3.SJEPAdjunto AS AdjuntoEstadoProcesal,
        tb3.SJObservacion AS ObservacionEstadoProcesal,
        
        -- 🆕 Datos de Solicitud Cautelar
        tb6.SJIdSolicitudCautelar,
        tb6.SJIDBusqueda AS TBusquedaSolCautelar,
        tb6.SJFechaIngreso AS FechaIngresoSC,
        tb6.SJNumCargoExpAdm,
        tb6.SJAdjuntoNumCargoExpAdm,
        tb6.SJIdSolicitudCautelarTipo,
        tb6.SJAdjuntoSolicitudCautelar,
        tb6.SJIdFormaCautelar,
        tb6.SJIdTipoBienes,
        tb6.SJIdEmbargo,
        tb6.SJAdjuntoEmbargo,
        tb6.SJIdSecuestro,
        tb6.SJAdjuntoSecuestro,
        
        -- 🧾 Datos de Propiedad
        tb7.SJIdPropiedad,
        tb7.SJIdEstadoPropiedad,
        tb7.SJIdGravamen,
        tb7.SJIdTipoGravamen,
        tb7.SJIdRangoGravamen,
        tb7.SJTipoGravamenObs,
        tb7.SJMontoGravamen,
        tb7.SJFoto,
        tb7.SJPartida,
        tb7.SJDetalleBien,
        tb7.SJEstadoPropiedadObs,
        
        -- 🧾 Datos de Medida Cautelar
        tb8.SJIdMedidaCautelar,
        tb8.SJJuzgado AS JuzgadoMC,
        tb8.SJNumeroExpediente AS NumeroExpedienteMC,
        tb8.SJFechaSolicitud,
        tb8.SJAdjuntoFechaSolicitud,
        tb8.SJIdCalificacionMCautelar,
        tb8.SJObservacion AS ObservacionMC,
        tb8.SJFechaMCautelar,
        tb8.SJTipoEscritoMCautelar,
        tb8.SJAdjuntoMCautelar,
        tb8.SJObservacionMCautelar,
        
        -- 🧾 Seguimiento Procesal
        tb9.SJIdSeguimiento,
        tb9.SJIdEstadoProcesal AS EstadoProcesalSP,
        tb9.SJFechaEstado,
        tb9.SJTipoEscrito AS TipoEscritoSP,
        tb9.SJAdjuntoEstado,
        tb9.SJObservacion AS ObservacionSP,
        
        -- 🧾 Inicio Ejecución
        tb10.SJIdInicioEjecucion,
        tb10.SJIdEjecucionForzada,
        tb10.SJFechaInicio,
        tb10.SJTipoEscrito AS TipoEscritoIE,
        tb10.SJAdjuntoInicio,
        tb10.SJObservacion AS ObservacionIE
      
      FROM SISTEMAGEST.SJ_Expediente tb1
      
      LEFT JOIN SISTEMAGEST.SJ_DemandaDet tb2
        ON tb1.SJIdExpediente = tb2.SJIdExpediente AND tb2.SJEstado = 1
  
      LEFT JOIN SISTEMAGEST.SJ_DetEstadoProcesal tb3
        ON tb1.SJIdExpediente = tb3.SJIdExpediente AND tb3.SJEstado = 1
  
      LEFT JOIN SISTEMAGEST.SJ_Demanda tb4
        ON tb2.SJIdDemanda = tb4.SJIdDemanda AND tb4.SJEstado = 1
  
      LEFT JOIN SISTEMAGEST.SJ_EstadoProcesal tb5
        ON tb3.SJIdEstadoProcesal = tb5.SJIdEstadoProcesal AND tb5.SJEstado = 1
  
      LEFT JOIN SISTEMAGEST.SJ_SolicitudCautelar tb6
        ON tb1.SJIdExpediente = tb6.SJIdExpediente AND tb6.SJEstado = 1
  
      LEFT JOIN SISTEMAGEST.SJ_Propiedad tb7
        ON tb6.SJIdSolicitudCautelar = tb7.SJIdSolicitudCautelar AND tb7.SJEstado = 1
  
      LEFT JOIN SISTEMAGEST.SJ_MedidaCautelar tb8
        ON tb6.SJIdSolicitudCautelar = tb8.SJIdSolicitudCautelar AND tb8.SJEstado = 1
  
      LEFT JOIN SISTEMAGEST.SJ_SeguimientoProcesal tb9
        ON tb6.SJIdSolicitudCautelar = tb9.SJIdSolicitudCautelar AND tb9.SJEstado = 1
  
      LEFT JOIN SISTEMAGEST.SJ_InicioEjecucion tb10
        ON tb6.SJIdSolicitudCautelar = tb10.SJIdSolicitudCautelar AND tb10.SJEstado = 1
        
      WHERE tb1.SJEstado = 1
      ORDER BY tb1.SJIdExpediente DESC;
    `;

    const expedientesRaw = await db.query(query, { type: QueryTypes.SELECT });

    const expedientes = expedientesRaw.map((item) => ({
      ...item,
      SJExpedienteADJ: item.SJExpedienteADJ
        ? item.SJExpedienteADJ.toString()
        : null,
      SJDemandaADJ: item.SJDemandaADJ ? item.SJDemandaADJ.toString() : null,
      AdjuntoDetalle: item.AdjuntoDetalle
        ? item.AdjuntoDetalle.toString()
        : null,
      AdjuntoEstadoProcesal: item.AdjuntoEstadoProcesal
        ? item.AdjuntoEstadoProcesal.toString()
        : null,
    }));

    res.status(200).json({
      ok: true,
      expedientes,
    });
  } catch (error) {
    console.log("Error en getExpedientesJudiciales:", error);

    res.status(500).json({
      ok: false,
      error: "Error en getExpedientesJudiciales",
      detalle: error.message,
    });
  }
};

module.exports = {
  getOptionsCalificacion,
  getOptEstadoProcClienteNegativo,
  getOptEstadoProcClientePositivo,
  getOptionsEjecucionForzada,
  getOptionsSolCautelarTipo,
  getOptionsFormaSolCautelar,
  getOptionsEmbargo,
  getOptionsSecuestro,
  getOptionsTipoBienes,
  getOptionsEstadoPropiedad,
  getOptionsGravamen,
  getOptionsTipoGravamen,
  getOptionsRangoGravamen,
  updateExpedienteNegativo,
  saveExpedientePositivo,
  getExpedientesJudiciales,
  getLastDetDemanda,

  // CLIENTE NEGATIVO
  saveExpedienteNegativo,
  saveDemandaDetalle,
  saveDetalleEstadoProcesal,
  loadDetallesDemanda,
  loadDetalleEstadoProcesal,
  saveSolicitudCautelar,
  savePropiedad,
  saveMedidaCautelar,
  saveSeguimientoProcesal,
  saveInicioEjecucion,
  saveSolDemanda,
  getSeguimientoProcesal,
  getEjecucionForzada,
  getInformacionMedidaCautelar,
  getInformacionPropiedad,
  obtenerExpedientePorId,
};
