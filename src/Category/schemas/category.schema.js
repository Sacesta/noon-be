const { object, string, nullable } = require("zod");

// Zod schema for the production level category model
module.exports.categorySchema = object({
  body: object({
    name: string({
      required_error: "Category name is required",
    }),
    parentCategory: nullable(
      string({
        invalid_type_error: "Parent category must be a string or null",
        required_error: "Parent category must be a string or null",
      })
    ),
  }),
});
