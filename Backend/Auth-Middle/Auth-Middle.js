const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token"); // Token is expected in x-auth-token header
  console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
