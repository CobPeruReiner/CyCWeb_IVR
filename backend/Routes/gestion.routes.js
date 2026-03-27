const express = require("express");
const {
  getGuiTable,
  getGestionByIdentificador,
  getTelefonosContact,
  getDireccionesAddress,
  getHistorialRecords,
  getPagosIdentificadorCartera,
  getCuotasIdentificador,
  getCampanasIdentificador,
  getCuotasAutoplan,
  getGestionProgramadaCarteraUsuario,
  getTerceros,
  filterGestion,
  saveGestion,
  updateDireccion,
  addTelefono,
  getEstadosAnimo,
  getEstadosAutorizacion,
} = require("../Controllers/gestion.controller");

const gestionRoutes = express.Router();

gestionRoutes.get("/gui/:idTable", getGuiTable);

gestionRoutes.get("/historial/:idTabla/:identificador", getHistorialRecords);

// gestionRoutes.get("/telefonos/:documento", getTelefonosContact);

gestionRoutes.get("/telefonos/:documento/:cartera", getTelefonosContact);

gestionRoutes.post("/telefono", addTelefono);

gestionRoutes.get("/direcciones/:documento", getDireccionesAddress);

gestionRoutes.post("/direccion", updateDireccion);

gestionRoutes.get(
  "/pagos/:identificador/:idcartera",
  getPagosIdentificadorCartera,
);

gestionRoutes.get("/cuotas/:identificador", getCuotasIdentificador);

gestionRoutes.get("/cuotas/autoplanna/:identificador", getCuotasAutoplan);

gestionRoutes.get("/terceros/:identificador", getTerceros);

// gestionRoutes.get("/campanas/:identificador", getCampanasIdentificador);

gestionRoutes.get(
  "/campanas/:identificador/:cartera",
  getCampanasIdentificador,
);

gestionRoutes.get(
  "/programadas/:idTabla/user/:idUser",
  getGestionProgramadaCarteraUsuario,
);

gestionRoutes.get("/get-estados-animo", getEstadosAnimo);

gestionRoutes.get("/get-respuestas-cliente", getEstadosAutorizacion);

gestionRoutes.post("/", getGestionByIdentificador);

gestionRoutes.post("/filtros", filterGestion);

gestionRoutes.post("/save", saveGestion);

module.exports = { gestionRoutes };
