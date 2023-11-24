const { object, string } = require("zod");

module.exports.userSchema = object({
  body: object({
    name: string({ required_error: "name is required" }),
    email: string({ required_error: "Email is required" }).email({
      message: "Invalid email",
    }),
    phone: string({ required_error: "phone is required" }),
    password: string({ required_error: "password is required" }).min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: string({
      required_error: "confirmPassword is required",
    }).min(8, {
      message: "password must be at least 8 characters long",
    }),
    role_id: string({ required_error: "role_id is required" }),
  }),
});
