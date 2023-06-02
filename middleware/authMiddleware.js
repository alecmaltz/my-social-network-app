const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Retrieve the authentication token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication token not found" });
  }

  try {
    // Verify and decode the token using the same secret key used to sign it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token payload to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
