const express = require("express");

const { getContactoEfecto } = require("../Controllers/contacto.controller");

const contactoRoutes = express.Router();

contactoRoutes.get("/:efecto", getContactoEfecto);

module.exports = { contactoRoutes };
