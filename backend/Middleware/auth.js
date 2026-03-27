const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const h = req.headers.authorization || "";
    const [, token] = h.split(" ");
    if (!token) return res.status(401).json({ error: "Token faltante" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    req.bearer = token;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

module.exports = { authMiddleware };
