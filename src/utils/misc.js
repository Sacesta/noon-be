const removeNullOrUndefinedFields = (obj) => {
  const cleanedObj = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      cleanedObj[key] = obj[key];
    }
  }
  return cleanedObj;
};

const getfileNameFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  return fileName;
};

module.exports = { removeNullOrUndefinedFields, getfileNameFromUrl };
