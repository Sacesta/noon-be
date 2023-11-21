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

module.exports.customerSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email({
      message: "Invalid email",
    }),
    password: string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters long",
    }),
    name: string({ required_error: "Name is required" }),
    phone: string({ required_error: "Phone is required" }),
  }),
});

module.exports.vendorSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email({
      message: "Invalid email",
    }),
    password: string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters long",
    }),
    category: string({ required_error: "Category is required" }),
    paymentDetails: string({ required_error: "Payment details are required" }),
    address: string({ required_error: "Address is required" }),
    storeName: string({ required_error: "Store name is required" }),
    phone: string({ required_error: "Phone is required" }),
  }),
});

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
