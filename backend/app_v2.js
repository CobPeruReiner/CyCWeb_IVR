const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");

const { authRoutes } = require("./Routes/auth.routes");
const { gestionRoutes } = require("./Routes/gestion.routes");
const { accionRoutes } = require("./Routes/accion.routes");
const { categoriaRoutes } = require("./Routes/categoria.routes");
const { contactoRoutes } = require("./Routes/contacto.routes");
const { efectoRoutes } = require("./Routes/efecto.routes");
const { motivoRoutes } = require("./Routes/motivo.routes");
const { tiendaAvRoutes } = require("./Routes/tiendaAv.routes");
const { telefonosRoutes } = require("./Routes/telefonos.routes");
const { judicialRoutes } = require("./Routes/judicial.routes");

const app = express();
app.set("trust proxy", true);

// —— CORS
const allowed = (process.env.CORS_ORIGINS || "*")
  .split(",")
  .map((s) => s.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowed.includes("*") || allowed.includes(origin))
        cb(null, true);
      else cb(new Error("CORS bloqueado"));
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization, api_token",
    credentials: true,
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// —— Adjuntos y descargas
const isProduction = process.env.NODE_ENV === "production";

const baseAdjuntosPath = isProduction
  ? path.join(__dirname, "backend", "Adjuntos")
  : path.join(__dirname, "Adjuntos");

app.use(
  "/Adjuntos",
  express.static(baseAdjuntosPath, { maxAge: "1h", etag: true }),
);

app.get("/download/*", (req, res) => {
  const relativePath = decodeURIComponent(req.params[0] || "");
  const filePath = path.join(baseAdjuntosPath, relativePath);
  if (!filePath.startsWith(baseAdjuntosPath))
    return res.status(400).send("Ruta inválida");
  if (!fs.existsSync(filePath))
    return res.status(404).send("Archivo no encontrado");
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error al descargar el archivo:", err);
      res.status(500).send("Error al descargar el archivo");
    }
  });
});

app.use(
  "/assets",
  express.static(path.join(__dirname, "assets"), { maxAge: "5m", etag: true }),
);

// Login
app.use("/", authRoutes);

// Gestion
app.use("/gestion", gestionRoutes);

// Accion
app.use("/accion", accionRoutes);

//Categoria
app.use("/categoria", categoriaRoutes);

// Efecto
app.use("/efecto", efectoRoutes);

// Motivo
app.use("/motivo", motivoRoutes);

// Contacto
app.use("/contacto", contactoRoutes);

// Tienda AV
app.use("/tiendaAV", tiendaAvRoutes);

// Telefonos
app.use("/telefono", telefonosRoutes);

// Judicial
app.use("/judicial", judicialRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

module.exports = { app };
