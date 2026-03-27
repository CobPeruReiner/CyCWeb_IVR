const express = require("express");

const { getTelefonosCompanie } = require("../Controllers/telefonos.controller");

const telefonosRoutes = express.Router();

telefonosRoutes.get("/companies", getTelefonosCompanie);

module.exports = { telefonosRoutes };
