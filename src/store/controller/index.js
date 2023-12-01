const { uploadImageToAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const { excludedFields } = require("../../utils/excludedFields");
const { sendResponse } = require("../../utils/sendResponse");
const { registerStore } = require("../service");
const _ = require("lodash");

const createStoreController = async (req, res, next) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      storeName,
      storeDescription,
      country,
      state,
      city,
      address,
      pincode,
      name,
      phone,
      bankAccountNo,
      bankName,
      holderName,
      ifsc,
    } = req.body;

    if (password !== confirmPassword)
      throw new AppError("password should match confirm password");

    const { storeLogo, documentation } = req.files;
    if (!storeLogo[0]) throw new AppError("Store logo is required");
    if (!documentation[0])
      throw new AppError("Store documentation is required");
    const storeLogoUrl = await uploadImageToAWS(storeLogo[0]);
    const documentationUrl = await uploadImageToAWS(documentation[0]);

    const payload = {
      email,
      password,
      name,
      phone,
      storeLogo,
      storeName,
      storeDescription,
      addressDetails: {
        country,
        state,
        city,
        address,
        pincode,
      },
      paymentDetails: {
        bankAccountNo,
        bankName,
        holderName,
        ifsc,
      },
      address,
      storeName,
      phone,
      storeLogo: storeLogoUrl,
      documentation: documentationUrl,
    };
    const store = await registerStore(payload);
    await store.save();
    const omittedResponse = _.omit(store.toObject(), excludedFields);
    sendResponse(res, omittedResponse, "Store created successfully");
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};

module.exports = {
  createStoreController,
};
