const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const {
  obtenerExpedientePorId,
} = require("../Controllers/judicial.controller");

// Ruta absoluta a la carpeta donde están todos los adjuntos
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction
  ? "/app/backend/Adjuntos"
  : path.join(__dirname, "../Adjuntos");

const downloadExpedienteZip = async (req, res) => {
  try {
    const { idExpediente } = req.params;

    // 🔎 Aquí deberías reemplazar por tu lógica real para traer los datos del expediente
    const expedienteData = await obtenerExpedientePorId(idExpediente); // <-- este método lo defines tú

    if (!expedienteData) {
      return res.status(404).json({ message: "Expediente no encontrado." });
    }

    const archivos = [
      expedienteData.SJExpedienteADJ,
      expedienteData.SJDemandaADJ,
      expedienteData.SJDemandaAdjunto,
      expedienteData.SJEPAdjunto,
      expedienteData.SJAdjuntoNumCargoExpAdm,
      expedienteData.SJAdjuntoSolicitudCautelar,
      expedienteData.SJAdjuntoEmbargo,
      expedienteData.SJAdjuntoSecuestro,
      expedienteData.SJFoto,
      expedienteData.SJPartida,
      expedienteData.SJAdjuntoFechaSolicitud,
      expedienteData.SJAdjuntoMCautelar,
      expedienteData.SJAdjuntoEstado,
      expedienteData.SJAdjuntoInicio,
    ].filter(Boolean); // elimina los nulos o undefined

    if (archivos.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay archivos adjuntos para este expediente." });
    }

    // 📦 Configurar headers
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=expediente_${idExpediente}.zip`
    );
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    archivos.forEach((rutaRelativa) => {
      const rutaCompleta = path.join(basePath, rutaRelativa);
      if (fs.existsSync(rutaCompleta)) {
        const nombreEnZip = path.basename(rutaCompleta); // solo el nombre del archivo
        archive.file(rutaCompleta, { name: nombreEnZip });
      }
    });

    await archive.finalize();
  } catch (error) {
    console.error("Error al generar ZIP:", error);
    res.status(500).json({ message: "Error al generar el archivo ZIP." });
  }
};

module.exports = { downloadExpedienteZip };
