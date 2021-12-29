const Product = require('../models/product');

const getProducts = async (req, res) => {
      const { limit = 5 } = req.query;

      const query = { condition: true };
      const populateUser = {
            path: 'user',
            select: 'name email',
      };
      const populateCategory = {
            path: 'category',
            select: 'name',
      };

      try {
            const [total, products] = await Promise.all([
                  Product.countDocuments(query),
                  Product.find(query)
                        .limit(Number(limit))
                        .populate(populateUser)
                        .populate(populateCategory),
            ]);

            res.status(200).json({ total, products });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

const getProduct = async (req, res) => {
      const { id } = req.params;
      const query = { condition: true };
      const populateUser = {
            path: 'user',
            select: 'name email',
      };
      const populateCategory = {
            path: 'category',
            select: 'name',
      };

      try {
            const product = await Product.findById(id)
                  .populate(populateUser)
                  .populate(populateCategory);

            res.status(200).json({ product });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};
const postProduct = async (req, res) => {
      const { name, price = 0, user, category, description = '' } = req.body;

      const newProduct = {
            name: name.toUpperCase(),
            price,
            condition: true,
            user,
            category,
            description,
            available: true,
      };

      try {
            const product = new Product(newProduct);
            product.save();
            res.status(200).json(product);
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

const putProduct = async (req, res) => {
      const { id } = req.params;
      const { name, price, category, description } = req.body;

      const query = {
            name,
            price,
            category,
            description,
      };

      try {
            const product = await Product.findByIdAndUpdate(id, query, {
                  new: true,
            });

            const { condition } = product;

            if (!condition) {
                  return res.status(400).json({
                        msg: `Can't find this category.`,
                  });
            }

            res.status(200).json(product);
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator. f',
            });
      }
};

const deleteProduct = async (req, res) => {
      const { id } = req.params;

      const query = {
            condition: false,
      };

      try {
            const product = await Product.findByIdAndUpdate(id, query, {
                  new: true,
            });

            const { condition } = product;

            if (!condition) {
                  return res.status(400).json({
                        msg: `Can't find this category.`,
                  });
            }

            res.status(200).json(product);
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator. f',
            });
      }
};

module.exports = {
      getProducts,
      getProduct,
      postProduct,
      putProduct,
      deleteProduct,
};
