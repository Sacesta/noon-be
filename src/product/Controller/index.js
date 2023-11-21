const createProductController = async (req, res, next) => {
  try {
    const {
      name,
      category,
      brand,
      unit,
      unitPrice,
      videoProvider,
      videoLink,
      sku,
      description,
      discountPrice,
      discountStartDate,
      discountEndDatem,
      quantity,
      shippingRate,
    } = req.body;
    const { galleryImages, thumbnail } = req.files;
  } catch (error) {}
};

module.exports = { createProductController };
