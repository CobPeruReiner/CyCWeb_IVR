const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const { db } = require("../config/database_v1");

const initSocket = (server) => {
  const io = new Server(server, {
    path: "/api/socket.io",
    cors: { origin: process.env.CORS_ORIGIN?.split(",") || "*" },
  });

  const userSockets = new Map();

  io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next(new Error("missing token"));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      const [row] = await db.query(
        "SELECT api_token FROM personal WHERE IDPERSONAL = :id LIMIT 1",
        { replacements: { id: payload.id }, type: QueryTypes.SELECT }
      );
      if (!row || row.api_token !== token)
        return next(new Error("stale token"));

      socket.userId = payload.id;
      return next();
    } catch {
      return next(new Error("invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const { userId } = socket;

    const oldSocketId = userSockets.get(userId);
    if (oldSocketId && oldSocketId !== socket.id) {
      io.to(oldSocketId).emit("force-logout", {
        reason: "Nueva sesión iniciada en otro dispositivo",
      });
      io.sockets.sockets.get(oldSocketId)?.disconnect(true);
    }

    userSockets.set(userId, socket.id);

    socket.on("disconnect", () => {
      if (userSockets.get(userId) === socket.id) {
        userSockets.delete(userId);
      }
    });
  });

  function notifyPreviousSession(userId) {
    const oldSocketId = userSockets.get(userId);
    if (oldSocketId) {
      io.to(oldSocketId).emit("force-logout", {
        reason: "Nueva sesión iniciada",
      });
      io.sockets.sockets.get(oldSocketId)?.disconnect(true);
    }
  }

  return { io, notifyPreviousSession };
};

module.exports = { initSocket };
