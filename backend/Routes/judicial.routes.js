const express = require("express");

const {
  getOptionsCalificacion,
  getOptEstadoProcClientePositivo,
  getOptEstadoProcClienteNegativo,
  saveExpedienteNegativo,
  getExpedientesJudiciales,
  getOptionsSolCautelarTipo,
  getOptionsFormaSolCautelar,
  getOptionsEmbargo,
  getOptionsSecuestro,
  getOptionsTipoBienes,
  getOptionsEstadoPropiedad,
  getOptionsGravamen,
  getOptionsTipoGravamen,
  getOptionsRangoGravamen,
  getOptionsEjecucionForzada,
  // saveExpedientePositivo,
  getLastDetDemanda,
  // updateExpedienteNegativo,
  saveDemandaDetalle,
  saveDetalleEstadoProcesal,
  loadDetallesDemanda,
  loadDetalleEstadoProcesal,
  saveSolicitudCautelar,
  savePropiedad,
  saveMedidaCautelar,
  saveSolDemanda,
  saveSeguimientoProcesal,
  saveInicioEjecucion,
  getSeguimientoProcesal,
  getEjecucionForzada,
  getInformacionPropiedad,
  getInformacionMedidaCautelar,
} = require("../Controllers/judicial.controller");
const { upload } = require("../Utils/multerConfig");
const { downloadExpedienteZip } = require("../Utils/DownloadExpedienteZip");
// const { saveDemandaDetMiddleware } = require("../Middleware/saveExpDetail");

const judicialRoutes = express.Router();

judicialRoutes.get("/options-calificacion", getOptionsCalificacion);

judicialRoutes.get("/estado-proceso-positivo", getOptEstadoProcClientePositivo);

judicialRoutes.get("/estado-proceso-negativo", getOptEstadoProcClienteNegativo);

// ================================== CLIENTE NEGATIVO ==================================

judicialRoutes.get("/tipo-sol-cautelar", getOptionsSolCautelarTipo);

judicialRoutes.get("/forma-sol-cautelar", getOptionsFormaSolCautelar);

judicialRoutes.get("/tipo-embargo", getOptionsEmbargo);

judicialRoutes.get("/tipo-secuestro", getOptionsSecuestro);

judicialRoutes.get("/tipo-bienes", getOptionsTipoBienes);

judicialRoutes.get("/estado-propiedad", getOptionsEstadoPropiedad);

judicialRoutes.get("/gravamen", getOptionsGravamen);

judicialRoutes.get("/tipo-gravamen", getOptionsTipoGravamen);

judicialRoutes.get("/rango-gravamen", getOptionsRangoGravamen);

judicialRoutes.get("/options-ejecucion-forzada", getOptionsEjecucionForzada);

judicialRoutes.get("/get-last-det-demanda/:idExpediente", getLastDetDemanda);

judicialRoutes.get("/get-expedientes", getExpedientesJudiciales);

judicialRoutes.get("/get-detalle-demanda/:SJIdExpediente", loadDetallesDemanda);

judicialRoutes.get(
  "/get-detalle-estado-procesal/:SJIdExpediente",
  loadDetalleEstadoProcesal
);

judicialRoutes.get(
  "/get-seguimiento-procesal/:idSolCautelar",
  getSeguimientoProcesal
);

judicialRoutes.get("/get-inicio-ejecucion/:idSolCautelar", getEjecucionForzada);

judicialRoutes.get(
  "/get-info-propiedad/:idSolCautelar",
  getInformacionPropiedad
);

judicialRoutes.get(
  "/get-info-medida-cautelar/:idSolCautelar",
  getInformacionMedidaCautelar
);

judicialRoutes.get(
  "/expedientes/:idExpediente/descargar-zip",
  downloadExpedienteZip
);

// ================================= GUARDAR EXPEDIENTE ==================================

judicialRoutes.post(
  "/save-expediente",
  upload.fields([
    { name: "adjuntoNroCargoExpediente" },
    { name: "adjuntoFechaDemanda" },
  ]),
  saveExpedienteNegativo
);

judicialRoutes.post(
  "/save-detalle-demanda",
  upload.fields([{ name: "detalleAdjunto" }]),
  saveDemandaDetalle
);

judicialRoutes.post(
  "/save-detalle-estado-procesal",
  upload.fields([{ name: "detalleEstadoAdjunto" }]),
  saveDetalleEstadoProcesal
);

// judicialRoutes.post(
//   "/update-expediente",
//   upload.fields([{ name: "detalleAdjunto" }, { name: "detalleEstadoAdjunto" }]),
//   updateExpedienteNegativo
// );

judicialRoutes.post(
  "/save-info-gestion",
  upload.fields([
    { name: "nroCargoExpAdmAdjuntoSC" },
    { name: "adjuntoSolicitudCautelar" },
    { name: "adjuntoEmbargoSC" },
    { name: "adjuntoSecuestroSC" },
    { name: "adjuntoFechaSC" },
    { name: "adjuntoMCautelar" },
    { name: "adjuntoCalDemandaSC" },
    { name: "detalleEstadoAdjuntoDP" },
    { name: "detalleInicioAdjuntoDP" },
    { name: "fotoSC" },
    { name: "partidaSC" },
  ]),
  saveSolicitudCautelar
);

judicialRoutes.post(
  "/save-info-propiedad",
  upload.fields([
    { name: "nroCargoExpAdmAdjuntoSC" },
    { name: "adjuntoSolicitudCautelar" },
    { name: "adjuntoEmbargoSC" },
    { name: "adjuntoSecuestroSC" },
    { name: "adjuntoFechaSC" },
    { name: "adjuntoMCautelar" },
    { name: "adjuntoCalDemandaSC" },
    { name: "detalleEstadoAdjuntoDP" },
    { name: "detalleInicioAdjuntoDP" },
    { name: "fotoSC" },
    { name: "partidaSC" },
  ]),
  savePropiedad
);

judicialRoutes.post(
  "/save-info-medida-cautelar",
  upload.fields([
    { name: "nroCargoExpAdmAdjuntoSC" },
    { name: "adjuntoSolicitudCautelar" },
    { name: "adjuntoEmbargoSC" },
    { name: "adjuntoSecuestroSC" },
    { name: "adjuntoFechaSC" },
    { name: "adjuntoMCautelar" },
    { name: "adjuntoCalDemandaSC" },
    { name: "detalleEstadoAdjuntoDP" },
    { name: "detalleInicioAdjuntoDP" },
    { name: "fotoSC" },
    { name: "partidaSC" },
  ]),
  saveMedidaCautelar
);

judicialRoutes.post(
  "/save-info-demanda",
  upload.fields([
    { name: "nroCargoExpAdmAdjuntoSC" },
    { name: "adjuntoSolicitudCautelar" },
    { name: "adjuntoEmbargoSC" },
    { name: "adjuntoSecuestroSC" },
    { name: "adjuntoFechaSC" },
    { name: "adjuntoMCautelar" },
    { name: "adjuntoCalDemandaSC" },
    { name: "detalleEstadoAdjuntoDP" },
    { name: "detalleInicioAdjuntoDP" },
    { name: "fotoSC" },
    { name: "partidaSC" },
  ]),
  saveSolDemanda
);

judicialRoutes.post(
  "/save-seg-procesal",
  upload.fields([
    { name: "nroCargoExpAdmAdjuntoSC" },
    { name: "adjuntoSolicitudCautelar" },
    { name: "adjuntoEmbargoSC" },
    { name: "adjuntoSecuestroSC" },
    { name: "adjuntoFechaSC" },
    { name: "adjuntoMCautelar" },
    { name: "adjuntoCalDemandaSC" },
    { name: "detalleEstadoAdjuntoDP" },
    { name: "detalleInicioAdjuntoDP" },
    { name: "fotoSC" },
    { name: "partidaSC" },
  ]),
  saveSeguimientoProcesal
);

judicialRoutes.post(
  "/save-inicio-ejecucion",
  upload.fields([
    { name: "nroCargoExpAdmAdjuntoSC" },
    { name: "adjuntoSolicitudCautelar" },
    { name: "adjuntoEmbargoSC" },
    { name: "adjuntoSecuestroSC" },
    { name: "adjuntoFechaSC" },
    { name: "adjuntoMCautelar" },
    { name: "adjuntoCalDemandaSC" },
    { name: "detalleEstadoAdjuntoDP" },
    { name: "detalleInicioAdjuntoDP" },
    { name: "fotoSC" },
    { name: "partidaSC" },
  ]),
  saveInicioEjecucion
);

// judicialRoutes.post(
//   "/save-expediente-positivo",
//   upload.fields([
//     { name: "nroCargoExpAdmAdjuntoSC" },
//     { name: "adjuntoSolicitudCautelar" },
//     { name: "adjuntoEmbargoSC" },
//     { name: "adjuntoSecuestroSC" },
//     { name: "adjuntoFechaSC" },
//     { name: "adjuntoMCautelar" },
//     { name: "adjuntoCalDemandaSC" },
//     { name: "detalleEstadoAdjuntoDP" },
//     { name: "detalleInicioAdjuntoDP" },
//     { name: "fotoSC" },
//     { name: "partidaSC" },
//   ]),
//   saveDemandaDetMiddleware,
//   saveExpedientePositivo
// );

// ================================= OBTENER EXPEDIENTES =================================

module.exports = { judicialRoutes };
