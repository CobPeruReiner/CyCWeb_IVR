const express = require("express");
const { renderPage } = require("../Controllers/render.controller");

const renderRoutes = express.Router();

renderRoutes.get("/*", renderPage);

module.exports = { renderRoutes };
