const { object, string } = require("zod");

module.exports.storeSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email({
      message: "Invalid email",
    }),
    password: string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: string({ required_error: "Confirm password is required" }),
    storeName: string({ required_error: "Store name is required" }),
    storeDescription: string(),
    country: string(),
    state: string(),
    city: string(),
    address: string({ required_error: "Address is required" }),
    pincode: string(),
    name: string(),
    phone: string({ required_error: "Phone is required" }),
    bankAccountNo: string(),
    bankName: string(),
    holderName: string(),
    ifsc: string(),
  }),
});
