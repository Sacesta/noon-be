const { object, string } = require("zod");

module.exports.superAdminRegistrationSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email({
      message: "Invalid email",
    }),
    password: string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters long",
    }),
  }),
});




m

module.exports.LoginSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email({
      message: "Invalid email",
    }),
    password: string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters long",
    }),
  }),
});
