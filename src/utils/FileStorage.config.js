const multer = require("multer");
const crypto = require("crypto");
const AppError = require("./appError");

// Set up Multer for image upload
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/pdfs/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const mixStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "storeLogo") {
      cb(null, "uploads/images/");
    } else if (file.fieldname === "documentation") {
      cb(null, "uploads/pdfs/");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const imageConfig = {
  storage: imageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    const allowedMimeTypes = ["image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new AppError("Invalid file type. Only JPEG and PNG images are allowed.")
      );
    }

    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.originalname.slice(
      (((file.originalname || "").lastIndexOf(".") - 1) >>> 0) + 2
    );

    if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
      return cb(
        new AppError(
          "Invalid file extension. Only JPG and PNG extensions are allowed."
        )
      );
    }

    cb(null, true);
  },
};

const pdfConfig = {
  storage: pdfStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["application/pdf"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new AppError("Invalid file type. Only PDF documents are allowed.")
      );
    }

    cb(null, true);
  },
};

function checkFileType(file, cb) {
  if (file.fieldname === "documentation") {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new AppError("Documentation need to be of type pdf"), false);
    }
  } else if (file.fieldname === "storeLogo") {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      fiel.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new AppError("Store logo need to be of type png or jpg"), false);
    }
  }
}

const mixConfig = {
  storage: mixStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit for PDFs
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
};

module.exports = { imageConfig, pdfConfig, mixConfig };
