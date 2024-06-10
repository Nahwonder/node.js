const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  res.success = (message, data, code = 200) => {
    res.status(code).json({ error: false, message, data });
  };
  res.notFound = (message) => {
    res.status(404).json({ error: true, message });
  };

  res.validationError = (message) => {
    res.status(400).json({ error: true, message });
  };

  next();
};

export { responseMiddleware };
