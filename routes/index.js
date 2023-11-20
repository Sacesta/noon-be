const status = require("../src/health/routes");
// const classRoute = require("../src/class/routes");
const authRoute = require("../src/auth/routes");

module.exports = (app) => {
  app.use("/status", status);
  app.use("/api/auth", authRoute);

  // unknown routes
  app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
  });

  // Global error handler middleware
  // Global Error Handler
  app.use((err, req, res, next) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });
};
