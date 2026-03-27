const express = require("express");

const {
  MotivoListEfecto,
  getMotivoEfecto,
} = require("../Controllers/motivo.controller");

const motivoRoutes = express.Router();

motivoRoutes.post("/", MotivoListEfecto);

motivoRoutes.get("/:efecto", getMotivoEfecto);

module.exports = { motivoRoutes };
