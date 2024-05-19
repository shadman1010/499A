// controllers/product.controller.js
exports.getProducts = async (req, res) => {
    try {
      const { page = 1, limit = 10, sort = 'createdAt', order = 'desc' } = req.query;
      const products = await Product.find({})
        .sort({ [sort]: order === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const totalProducts = await Product.countDocuments({});
      res.status(200).send({ totalProducts, products });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  //to error handle large datasets i think thats how this should work dont need this right now