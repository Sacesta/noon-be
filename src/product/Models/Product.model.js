const mongoose = require("mongoose");

const discountDateRangeSchema = new mongoose.Schema({
  discountStartDate: Date,
  discountEndDate: Date,
});

const saleDateRangeSchema = new mongoose.Schema({
  discountStartDate: Date,
  discountEndDate: Date,
});

const imageSchema = new mongoose.Schema({
  url: String,
});

const thumbnailSchema = new mongoose.Schema({
  url: String,
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortDescriptions: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  unit: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  sale: {
    salePrice: Number,
    saleDateRange: saleDateRangeSchema,
  },
  discount: {
    discountPrice: Number,
    discountDateRange: discountDateRangeSchema,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  shippingDays: {
    type: String,
    default: null,
  },
  isCod: {
    type: Boolean,
    default: false,
  },
  isFreeShipping: {
    type: Boolean,
    default: false,
  },
  isSaleEnable: {
    type: Boolean,
    default: false,
  },
  isReturn: {
    type: Boolean,
    default: false,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  isRandomRelatedProducts: {
    type: Boolean,
    default: false,
  },
  stockStatus: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },

  thumbnail: thumbnailSchema,
  estimatedDeliveryText: {
    type: String,
    default: null,
  },
  returnPolicyText: {
    type: String,
    default: null,
  },
  safeCheckout: {
    type: Boolean,
    default: false,
  },
  secureCheckout: {
    type: Boolean,
    default: false,
  },
  socialShare: {
    type: Boolean,
    default: false,
  },
  encourageOrder: {
    type: Boolean,
    default: false,
  },
  encourageView: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default: false,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    default: null,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  taxId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tax",
    default: null,
  },
  ordersCount: {
    type: Number,
    default: 0,
  },
  reviewsCount: {
    type: Number,
    default: 0,
  },
  canReview: {
    type: Boolean,
    default: false,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  orderAmount: {
    type: Number,
    default: 0,
  },
  reviewRatings: [String],
  relatedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  crossSellProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  galleryImages: [imageSchema],
  sizeChartImage: {
    type: String,
    default: null,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  attributes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
    },
  ],

  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    default: "null",
  },

  videoProvider: String,
  videoLink: String,

  shippingRate: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
