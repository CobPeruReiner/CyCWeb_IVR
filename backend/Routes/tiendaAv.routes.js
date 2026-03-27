const express = require("express");

const {
  getTienda,
  getTiendaAgendamientoIdentificador,
} = require("../Controllers/tiendaAv.controller");

const tiendaAvRoutes = express.Router();

tiendaAvRoutes.get("/", getTienda);

tiendaAvRoutes.get(
  "/agendamientos/:identificador",
  getTiendaAgendamientoIdentificador
);

module.exports = { tiendaAvRoutes };
