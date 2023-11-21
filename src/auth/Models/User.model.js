const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Base User Schema
const userSchema = new Schema(
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
    role: {
      type: String,
      enum: ["superAdmin", "vendor", "customer"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Vendor Schema
const vendorSchema = new Schema({
  phone: String,
  storeName: String,
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  storeLogo: String,
  documentation: String,
  address: String,
  paymentDetails: String,
});

// Customer Schema
const customerSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  phone: String,
});

// Middleware to hash the password before saving
userSchema.pre("save", async function (next) {
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

userSchema.methods.comparePasswords = async function (
  hashedPassword,
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

const options = { discriminatorKey: "role" };
const User = mongoose.model("User", userSchema);
const Vendor = User.discriminator("vendor", vendorSchema, options);
const Customer = User.discriminator("customer", customerSchema, options);

module.exports = { User, Vendor, Customer };
