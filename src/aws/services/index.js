const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs/promises"); // Import fs.promises for file operations

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const uploadImageToAWS = async (file) => {
  try {
    const uniqueFileName = file.filename; // Use the same filename generated when saving to disk
    console.log(file.path);

    const uploadParams = {
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: await fs.readFile(file.path), // Read the file from the disk
      ContentType: file.mimetype,
    };
    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3.send(uploadCommand);

    const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${uniqueFileName}`;

    // Remove the file from disk storage after successful upload to AWS
    await fs.unlink(file.path);

    return imageUrl;
  } catch (error) {
    console.error(error);
    throw new Error("Problem in uploading the image to AWS");
  }
};

const deleteImageFromAWS = async (fileName) => {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName,
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await s3.send(deleteCommand);
  } catch (error) {
    console.error("Error deleting file from AWS:", error);
    throw new Error("Problem in deleting the image from AWS");
  }
};

module.exports = { uploadImageToAWS, deleteImageFromAWS };
