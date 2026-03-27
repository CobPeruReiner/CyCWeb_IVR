const express = require("express");

const {
  Login,
  Logout,
  GetLastTableId,
  ReLogin,
  logOutInactividad,
} = require("../Controllers/auth.controller");
const { authMiddleware } = require("../Middleware/auth");

const authRoutes = express.Router();

authRoutes.post("/login", Login);

authRoutes.post("/logout", Logout);

authRoutes.post("/relogin", ReLogin);

authRoutes.post("/getlasttableid/:idTabla", GetLastTableId);

authRoutes.post("/logout-inactividad", authMiddleware, logOutInactividad);

module.exports = { authRoutes };
