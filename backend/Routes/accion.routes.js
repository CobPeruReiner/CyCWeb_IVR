const express = require("express");

const {
  getAllAcciones,
  getAccioneTipo,
  getAccionTipoCartera,
} = require("../Controllers/accion.controller");

const accionRoutes = express.Router();

accionRoutes.get("/", getAllAcciones);

accionRoutes.get("/:id", getAccioneTipo);

accionRoutes.get("/:idTipo/:idTabla", getAccionTipoCartera);

module.exports = { accionRoutes };
