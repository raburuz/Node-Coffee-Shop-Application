const { User, Product } = require('../models');

const isValidIdForUpdate = async (req, res, next) => {
      const { id, collection } = req.params;

      switch (collection) {
            case 'user':
                  try {
                        const user = await User.findById(id);
                        if (!user) {
                              return res.status(400).json({
                                    msg: 'Can not find ' + collection,
                              });
                        }
                        req.element = user;
                        next();
                  } catch (error) {
                        res.status(400).json({
                              msg: 'User not Found',
                        });
                  }
                  break;
            case 'product':
                  try {
                        const product = await Product.findById(id);
                        if (!product) {
                              return res.status(400).json({
                                    msg: 'Can not find ' + collection,
                              });
                        }
                        req.element = product;
                        next();
                  } catch (error) {
                        res.status(400).json({
                              msg: 'Product not Found',
                        });
                  }
                  break;
            default:
                  res.status(400).json({
                        msg: 'Collection not found',
                  });
                  break;
      }
};

module.exports = {
      isValidIdForUpdate,
};
