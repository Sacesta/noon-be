const { uploadImageToAWS, deleteImageFromAWS } = require("../../aws/services");
const AppError = require("../../utils/appError");
const { excludedFields } = require("../../utils/excludedFields");
const {
  getfileNameFromUrl,
  removeNullOrUndefinedFields,
} = require("../../utils/misc");
const { sendResponse } = require("../../utils/sendResponse");
const { Store } = require("../models/store.model");
const {
  registerStore,
  getAllStores,
  updateStore,
  deleteStore,
} = require("../service");
const _ = require("lodash");

const getAllStoresController = async (req, res, next) => {
  try {
    const stores = await getAllStores();
    sendResponse(res, stores, "All stores fetched successfully");
  } catch (error) {
    next(err);
  }
};

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

const updateStoreController = async (req, res, next) => {
  try {
    const storeId = req.params.id;

    const store = await Store.findById(storeId);

    if (!store) {
      throw new AppError("Store with that id not found");
    }

    const { storeLogo, documentation } = req.files;

    let storeLogoUrl = undefined;
    let documentationUrl = undefined;

    if (storeLogo[0] && store.storeLogo) {
      await deleteImageFromAWS(getfileNameFromUrl(store.storeLogo));
      storeLogoUrl = await uploadImageToAWS(storeLogo[0]);
    }

    if (documentation[0] && store.documentation) {
      await deleteImageFromAWS(getfileNameFromUrl(store.documentation));

      documentationUrl = await uploadImageToAWS(documentation[0]);
    }

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

    const cleanPayload = removeNullOrUndefinedFields(payload);
    const updatedStore = await updateStore(cleanPayload, storeId);
    const omittedResponse = _.omit(updatedStore.toObject(), excludedFields);
    sendResponse(res, omittedResponse, "Store Updated successfully");
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

const deleteStoreController = async (req, res, next) => {
  try {
    const storeId = req.params.id;

    const store = await Store.findById(storeId);

    if (!store) {
      throw new AppError("Store with that id not found");
    }

    if (store.storeLogo) {
      await deleteImageFromAWS(getfileNameFromUrl(store.storeLogo));
    }

    if (store.documentation) {
      await deleteImageFromAWS(getfileNameFromUrl(store.documentation));
    }

    const deleted = await deleteStore(storeId);
    const omittedResponse = _.omit(deleted.toObject(), excludedFields);
    sendResponse(res, omittedResponse, "This store deleted successfully");
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
  getAllStoresController,
  createStoreController,
  updateStoreController,
  deleteStoreController,
};
