const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
  },
  description: {
    type: String,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    default: null,
  },
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attribute",
  },
  stockStatus: {
    type: Boolean,
    default: false,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  salePrice: {
    type: Number,
    default: 0,
  },
  saleStatus: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  thumbnail: String,
  images: [String],
  freeShipping: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
