const { object, string, array } = require("zod");

module.exports.AttributeSchema = object({
  body: object({
    name: string({ required_error: "Attribute Name is required" }),
    values: array(
      string({
        required_error: "At least one value is required",
      })
    ),
  }),
});
