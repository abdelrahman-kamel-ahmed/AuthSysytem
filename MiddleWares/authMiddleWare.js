const { verifyToken } = require("../utils/tokenService");

// Verify Token
exports.authMiddleware = function (request, response, next) {

  const authorization = request.headers.authorization;

  // Check Authorization
  if (!authorization) {
    return response.status(401).json({ message: "un-authorized" });
  }

  const { type, token } = authorization.split(" ");
  
  // Check Type
  if (type !== "Bearer") {
    return response.status(401).json({ message: "Invalid Token Type" });
  }

  // Check Token
  if (!token) {
    return response.status(401).json({ message: "un-authorized" });
  }

  // Token
  try {
    const payload = verifyToken(token);
    request.user = payload; // Generate new Key Request

    next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid Token or Expired" });
  }
};
