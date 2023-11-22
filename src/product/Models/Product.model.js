const mongoose = require("mongoose");

const discountRangeSchema = new mongoose.Schema({
  discountStartDate: Date,
  discountEndDate: Date,
});

const imageSchema = new mongoose.Schema({
  url: String,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    default: "null",
  },
  unit: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: String,
    required: true,
  },
  galleryImages: [imageSchema],
  thumbnail: String,
  videoProvider: String,
  videoLink: String,
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  discount: {
    discountPrice: String,
    discountDateRange: discountRangeSchema,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingRate: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
