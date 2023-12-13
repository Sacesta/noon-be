const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  bankAccountNo: String,
  bankName: String,
  holderName: String,
  ifsc: String,
});

const addressSchema = new Schema({
  country: String,
  state: String,
  city: String,
  address: String,
  pincode: String,
});

// Vendor Schema
const storeSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    countryCode: {
      type: String,
      default: "",
    },
    storeLogo: {
      type: String,
      default: "",
    },
    storeName: {
      type: String,
      default: "",
    },
    storeDescrption: {
      type: String,
      default: "",
    },
    addressDetails: addressSchema,
    documentation: String,
    paymentDetails: paymentSchema,
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
storeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

storeSchema.methods.comparePasswords = async function (
  hashedPassword,
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

const Store = mongoose.model("Store", storeSchema);

module.exports = { Store };
