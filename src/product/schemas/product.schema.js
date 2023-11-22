const { object, string, number } = require("zod");

const productSchema = object({
  body: object({
    name: string({
      required_error: "Product name is required",
    }),
    category: string({
      required_error: "Product category is required",
    }),
    unitPrice: string({
      required_error: "Unit price is required",
    }),
    quantity: number({
      required_error: "Quantity is required",
    }),
  }),
});

module.exports = {
  productSchema,
};
