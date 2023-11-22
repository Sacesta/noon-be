const removeNullOrUndefinedFields = (obj) => {
  const cleanedObj = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      cleanedObj[key] = obj[key];
    }
  }
  return cleanedObj;
};

module.exports = { removeNullOrUndefinedFields };
