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
  saleStartsAt: {
    type: Date,
  },
  saleExpireAt: {
    type: Date,
  },
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attribute",
    default: null,
  },
  attributeValues: {
    type: [String],
    default: [],
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
  quantity: {
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
  status: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],

  subCategories: [
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
  tax: {
    type: String,
  },
  estimatedDeliveryText: {
    type: String,
  },
  returnPolicyText: {
    type: String,
  },
  isReturn: {
    type: Boolean,
    default: false,
  },
  moreReasonsToShop: {
    type: Boolean,
    default: false,
  },
  megaDeals: {
    type: Boolean,
    default: false,
  },
  recommendedForYou: {
    type: Boolean,
    default: false,
  },
  dealsOnlyOnNoon: {
    type: Boolean,
    default: false,
  },
  trendingDealsInTvAndAccessories: {
    type: Boolean,
    default: false,
  },
  clearanceDeals: {
    type: Boolean,
    default: false,
  },
  bestSelling: {
    type: Boolean,
    default: false,
  },
  bargainStore: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
