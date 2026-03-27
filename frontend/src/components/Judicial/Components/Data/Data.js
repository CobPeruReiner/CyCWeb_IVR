export const historialCalificacion = [
    { fecha: "2025-06-01", tipoEscrito: "ESCRITO A", observacion: "Obs A", adjunto: "fileA.pdf" },
    { fecha: "2025-06-05", tipoEscrito: "ESCRITO B", observacion: "Obs B", adjunto: "fileB.pdf" },
];

export const historialEstado = [
    { fecha: "2025-06-02", tipoEscrito: "ESCRITO X", observacion: "Obs X", adjunto: "fileX.pdf" },
    { fecha: "2025-06-06", tipoEscrito: "ESCRITO Y", observacion: "Obs Y", adjunto: "fileY.pdf" },
];

export const tiposBusqueda = [
    { label: "NEGATIVA", value: 1 },
    { label: "POSITIVA", value: 2 },
];

export const camposComunes = ["fechaIngreso", "juzgado", "nroCargoExpediente", "nroExpediente", "adjuntoNroCargoExpediente"];

export const camposPositiva = [
    "solicitudCautelar",
    "adjuntoSolicitudCautelar",
    "fechaIngresoSC",
    "nroCargoExpAdmSC",
    "nroCargoExpAdmAdjuntoSC",
    "formaSC",
    "embargoSC",
    "adjuntoEmbargoSC",
    "secuestroSC",
    "adjuntoSecuestroSC",
    "tipoBienesSC",
    "estadoPropiedadSC",
    "estadoPropiedadObsSC",
    "gravamenSC",
    "tipoGravamenSC",
    "tipoGravamenObsSC",
    "rangoGravamenSC",
    "montoGravamenSC",
    "detalleDelBienSC",
    "fotoSC",
    "partidaSC",
    "jusgadoSC",
    "nroExpedienteSC",
    "observacionSC",
    "fechaSC",
    "adjuntoFechaSC",
    "calificacionMCautelar",
    "fechaMCautelar",
    "tipoEscritoMCautelar",
    "adjuntoMCautelar",
    "observacionMCautelar",
    "juzgadoDemandaSC",
    "nroExpedienteDemandaSC",
    "observacionDemandaSC",
    "calDemandaSC",
    "fechaCalDemandaSC",
    "tipoEscritoCalDemandaSC",
    "adjuntoCalDemandaSC",
    "observacionCalDemandaSC",
    "estadoProcesalDP",
    "detalleEstadoFechaDP",
    "detalleEstadoTipoEscritoDP",
    "detalleEstadoAdjuntoDP",
    "detalleEstadoObservacionDP",
    "inicioEjecucion",
    "detalleInicioFechaDP",
    "detalleInicioTipoEscritoDP",
    "detalleInicioAdjuntoDP",
    "detalleInicioObservacionDP",
];

export const camposNegativa = [
    "observacion",
    "fechaDemanda",
    "adjuntoFechaDemanda",
    "calificacionDemanda",
    "detalleFecha",
    "detalleTipoEscrito",
    "detalleAdjunto",
    "detalleObservacion",
    "estadoProcesal",
    "detalleEstadoFecha",
    "detalleEstadoTipoEscrito",
    "detalleEstadoAdjunto",
    "detalleEstadoObservacion",
];

export const valoresIniciales = {
    // DATOS UPDATE
    SJIdExpediente: null,
    SJIdDemandaDet: null,
    SJIdDetEstadoProcesal: null,
    SJIdSolicitudCautelar: null,
    SJIdPropiedad: null,
    SJIdMedidaCautelar: null,
    SJIdSeguimiento: null,
    SJIdInicioEjecucion: null,

    idExpediente: null,
    tipoBusqueda: null,

    // ================= NEGATIVA =================
    fechaIngreso: null,
    juzgado: "",
    nroCargoExpediente: "",
    adjuntoNroCargoExpediente: null,
    nroExpediente: "",
    fechaDemanda: null,
    adjuntoFechaDemanda: null,
    observacion: "",

    // DETALLE
    calificacionDemanda: null,
    estadoProcesal: null,
    detalleFecha: null,
    detalleEstadoFecha: null,
    detalleTipoEscrito: "",
    detalleEstadoTipoEscrito: "",
    detalleAdjunto: null,
    detalleEstadoAdjunto: null,
    detalleObservacion: "",
    detalleEstadoObservacion: "",

    // ===================== POSITIVA =====================

    // INFORMACIÓN DE LA GESTIÓN
    fechaIngresoSC: null,
    nroCargoExpAdmSC: "",
    nroCargoExpAdmAdjuntoSC: null,
    solicitudCautelar: null,
    adjuntoSolicitudCautelar: null,
    formaSC: null,
    tipoBienesSC: null,

    // -- EMBARGO
    embargoSC: null,
    adjuntoEmbargoSC: null,

    // -- SECUESTRO
    secuestroSC: null,
    adjuntoSecuestroSC: null,

    // INFORMACIÓN DE PROPIEDAD
    estadoPropiedadSC: null,
    gravamenSC: null,
    tipoGravamenSC: null,
    rangoGravamenSC: null,
    montoGravamenSC: "",
    fotoSC: null,
    partidaSC: null,
    detalleDelBienSC: "",
    estadoPropiedadObsSC: "",
    tipoGravamenObsSC: "",

    // SOLICITUD DE LA MEDIDA CAUTELAR
    jusgadoSC: "",
    nroExpedienteSC: "",
    fechaSC: null,
    adjuntoFechaSC: null,
    calificacionMCautelar: null,
    observacionSC: "",
    fechaMCautelar: null,
    tipoEscritoMCautelar: "",
    adjuntoMCautelar: null,
    observacionMCautelar: "",

    // SOLICITUD DE LA DEMANDA
    juzgadoDemandaSC: "",
    nroExpedienteDemandaSC: "",
    calDemandaSC: null,
    observacionDemandaSC: "",
    fechaCalDemandaSC: null,
    tipoEscritoCalDemandaSC: "",
    adjuntoCalDemandaSC: null,
    observacionCalDemandaSC: "",

    // ========================= Modal DP - POSITIVA ======================================

    // Seguimiento Procesal
    estadoProcesalDP: null,
    detalleEstadoAdjuntoDP: null,
    detalleEstadoFechaDP: null,
    detalleEstadoTipoEscritoDP: "",
    detalleEstadoObservacionDP: "",

    // Inicio de Ejecucion
    inicioEjecucion: null,
    detalleInicioFechaDP: null,
    detalleInicioTipoEscritoDP: "",
    detalleInicioAdjuntoDP: null,
    detalleInicioObservacionDP: "",
};

export const hEstadoData = [
    {
        fecha: "2025-06-02",
        tipoEscrito: "ESCRITO X",
        observacion: "Obs X",
        adjunto: "fileX.pdf",
    },
    {
        fecha: "2025-06-06",
        tipoEscrito: "ESCRITO Y",
        observacion: "Obs Y",
        adjunto: "fileY.pdf",
    },
];

export const hEjecucionData = [
    {
        fecha: "2025-06-03",
        proceso: "PROCESO 1",
        detalle: "Inicio del proceso de ejecución A",
        adjunto: "fileE1.pdf",
    },
    {
        fecha: "2025-06-07",
        proceso: "PROCESO 2",
        detalle: "Inicio del proceso de ejecución B",
        adjunto: "fileE2.pdf",
    },
];

export const camposSimples = [
    "idExpediente",
    "fechaIngresoSC",
    "nroCargoExpAdmSC",
    "tipoBusqueda",
    "solicitudCautelar",
    "formaSC",
    "tipoBienesSC",
    "embargoSC",
    "secuestroSC",
    "estadoPropiedadSC",
    "gravamenSC",
    "tipoGravamenSC",
    "rangoGravamenSC",
    "tipoGravamenObsSC",
    "montoGravamenSC",
    "detalleDelBienSC",
    "estadoPropiedadObsSC",
    "jusgadoSC",
    "nroExpedienteSC",
    "fechaSC",
    "calificacionMCautelar",
    "observacionSC",
    "fechaMCautelar",
    "tipoEscritoMCautelar",
    "observacionMCautelar",
    "juzgadoDemandaSC",
    "nroExpedienteDemandaSC",
    "calDemandaSC",
    "observacionDemandaSC",
    "fechaCalDemandaSC",
    "tipoEscritoCalDemandaSC",
    "observacionCalDemandaSC",
    "estadoProcesalDP",
    "detalleEstadoFechaDP",
    "detalleEstadoTipoEscritoDP",
    "detalleEstadoObservacionDP",
    "inicioEjecucion",
    "detalleInicioFechaDP",
    "detalleInicioTipoEscritoDP",
    "detalleInicioObservacionDP",
    "usuarioReg",
    "SJFechaReg",
    "idExpediente",
];

export const camposArchivos = {
    nroCargoExpAdmAdjuntoSC: "nroCargoExpAdmAdjuntoSC",
    adjuntoSolicitudCautelar: "adjuntoSolicitudCautelar",
    adjuntoEmbargoSC: "adjuntoEmbargoSC",
    adjuntoSecuestroSC: "adjuntoSecuestroSC",
    fotoSC: "fotoSC",
    partidaSC: "partidaSC",
    adjuntoFechaSC: "adjuntoFechaSC",
    adjuntoMCautelar: "adjuntoMCautelar",
    adjuntoCalDemandaSC: "adjuntoCalDemandaSC",
    detalleEstadoAdjuntoDP: "detalleEstadoAdjuntoDP",
    detalleInicioAdjuntoDP: "detalleInicioAdjuntoDP",
};
