const express = require("express");

const { getCategoria } = require("../Controllers/categoria.controller");

const categoriaRoutes = express.Router();

categoriaRoutes.get("/", getCategoria);

module.exports = { categoriaRoutes };
