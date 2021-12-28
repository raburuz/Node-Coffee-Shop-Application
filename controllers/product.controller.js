const res = require('express/lib/response');
const Product = require('../models/product');

const getProducts = async (req, res) => {
      const { limit = 5 } = req.params;

      const query = { condition: true };
      const populate = {
            path: 'user category',
            select: 'name email',
      };

      try {
            const [total, products] = await getProductsPromise.all([
                  Product.countDocuments(query),
                  Product.find(query).limit(limit).populate(populate),
            ]);

            res.status(200).json({ total, products });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

module.exports = {
      getProducts,
};
