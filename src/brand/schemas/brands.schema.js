const { object, string } = require("zod");

module.exports.BrandSchema = object({
  body: object({
    name: string({ required_error: "Brand Name is required" }),
  }),
});
