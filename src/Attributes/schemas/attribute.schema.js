const { object, string } = require("zod");

module.exports.AttributeSchema = object({
  body: object({
    name: string({ required_error: "Attribute Name is required" }),
    value: string({ required_error: "Attribute Value is required" }),
  }),
});
