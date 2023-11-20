const multer = require("multer");
const crypto = require("crypto");
const AppError = require("./appError");

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileConfig = {
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    // Check file type
    const allowedMimeTypes = ["image/jpeg", "image/png"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new AppError("Invalid file type. Only JPEG and PNG images are allowed.")
      );
    }

    // Check file extension
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

    // If everything is fine, accept the file
    cb(null, true);
  },
};

module.exports = { fileConfig };
