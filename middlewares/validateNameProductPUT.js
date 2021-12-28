const { Product } = require('../models');

const isValidNameProductPUT = async (req, res, next) => {
      let { name } = req.body;
      const { id } = req.params;
      name = name.toUpperCase();
      try {
            const product = await Product.findOne({ name });

            if (product) {
                  if (product.id !== id && product.name === name) {
                        return res.status(400).json({
                              ms: 'Name is already taken ',
                        });
                  }
            }
            next();
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator. ',
            });
      }
};

module.exports = {
      isValidNameProductPUT,
};
