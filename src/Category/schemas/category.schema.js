const { object, string, nullable } = require("zod");

// Zod schema for the production level category model
module.exports.categorySchema = object({
  body: object({
    name: string({
      required_error: "Category name is required",
    }),
  }),
});
