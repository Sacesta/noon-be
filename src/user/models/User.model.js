const mongoose = require("mongoose");
const AppError = require("../../utils/appError");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    confirmPassword: {
      type: String,
      required: true,
    },

    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },

    status: {
      type: Boolean,
      default: false,
    },

    address: {
      type: Array,
      default: [],
    },

    country_code: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const saltRounds = 10;
    if (this.isModified("password")) {
      const hashedPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashedPassword;
    }

    if (this.isModified("confirmPassword")) {
      const hashedConfirmPassword = await bcrypt.hash(
        this.confirmPassword,
        saltRounds
      );
      this.confirmPassword = hashedConfirmPassword;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("Tuser", userSchema);

module.exports = User;
