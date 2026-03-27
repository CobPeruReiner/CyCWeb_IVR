const express = require("express");

const {
  getEfectoAccion,
  AccionListAccion,
} = require("../Controllers/efecto.controller");

const efectoRoutes = express.Router();

efectoRoutes.get("/:accion", getEfectoAccion);

efectoRoutes.post("/", AccionListAccion);

module.exports = { efectoRoutes };
