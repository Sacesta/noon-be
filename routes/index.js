const status = require("../src/health/routes");
// const classRoute = require("../src/class/routes");
const authRoute = require("../src/auth/routes");
const categoryRoute = require("../src/Category/routes");
const brandRoute = require("../src/brand/routes");
const attributeRoute = require("../src/Attributes/routes");
const productRoute = require("../src/product/routes");
const rolesRoute = require("../src/Roles/routes");
const userRoute = require("../src/user/routes");

module.exports = (app) => {
  app.use("/status", status);
  app.use("/api/auth", authRoute);
  app.use("/api/category", categoryRoute);
  app.use("/api/brand", brandRoute);
  app.use("/api/attribute", attributeRoute);
  app.use("/api/product", productRoute);
  app.use("/api/roles", rolesRoute);
  app.use("/api/users", userRoute);

  // unknown routes
  app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
  });

  // Global error handler middleware
  // Global Error Handler
  app.use((err, req, res, next) => {
    console.log(err);
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  });
};
