const multer = require("multer");
const path = require("path");

// Mapeo centralizado de fieldnames a subcarpetas
const folderMap = {
  adjuntoNroCargoExpediente: "InfoGestion",
  adjuntoFechaDemanda: "InfoGestion",
  detalleAdjunto: "Demanda",
  detalleEstadoAdjunto: "Demanda",

  // INFORMACIÓN DE LA GESTIÓN
  nroCargoExpAdmAdjuntoSC: "InfoGestion",
  adjuntoSolicitudCautelar: "InfoGestion",
  adjuntoEmbargoSC: "InfoGestion",
  adjuntoSecuestroSC: "InfoGestion",

  // INFORMACIÓN DE PROPIEDAD
  fotoSC: "Propiedad",
  partidaSC: "Propiedad",

  // SOLICITUD DE LA MEDIDA CAUTELAR
  adjuntoFechaSC: "SolCautelar",
  adjuntoMCautelar: "SolCautelar",

  // SOLICITUD DE LA DEMANDA
  adjuntoCalDemandaSC: "Demanda",

  // SEGUIMIENTO PROCESAL
  detalleEstadoAdjuntoDP: "SegProcesal",

  // INICIO DE EJECUCIÓN
  detalleInicioAdjuntoDP: "EjecForzada",
};

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Nombre de archivo: ", file.fieldname);

    const subfolder = folderMap[file.fieldname] || "Otros";

    // CONDICIONAMOS DEPENDIENDO EL ENTORNO
    const isProduction = process.env.NODE_ENV === "production";
    const baseUploadPath = isProduction
      ? "/app/backend/Adjuntos"
      : path.join(__dirname, "../Adjuntos");

    cb(null, path.join(baseUploadPath, subfolder));
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = { upload };
