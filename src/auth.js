const validateBearerToken = (req, res, next) => {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
    logger.error(`Unauthorized request to path: ${req.path}`);
  }
  next();
};

module.exports = validateBearerToken;
