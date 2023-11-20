const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const superAdminSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
superAdminSchema.pre("save", async function (next) {
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

superAdminSchema.methods.comparePasswords = async function (
  hashedPassword,
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);

module.exports = { SuperAdmin };
