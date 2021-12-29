const response = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require('../models');
const allowCollection = ['category', 'product', 'user'];

const populateUser = {
      path: 'user',
      select: 'name email',
};
const populateCategory = {
      path: 'category',
      select: 'name',
};

const searchUsers = async (term, res = response) => {
      const isMongoId = ObjectId.isValid(term);

      const regex = new RegExp(term, 'i'); //Not  case sensitive
      if (isMongoId) {
            const user = await User.findById(term);
            return res.status(200).json({
                  results: user ? [user] : [],
            });
      }

      const user = await User.find({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ condition: true }],
      });
      res.status(200).json({
            results: user ? [user] : [],
      });
};

const searchProduct = async (term, res = response) => {
      const isMongoId = ObjectId.isValid(term);
      const haveLetters = isNaN(term);

      const regex = new RegExp(term, 'i'); //Not  case sensitive
      if (isMongoId) {
            const product = await Product.findById(term)
                  .populate(populateUser)
                  .populate(populateCategory);
            return res.status(200).json({
                  results: product ? [product] : [],
            });
      }
      if (!haveLetters) {
            const product = await Product.find({
                  price: Number(term),
                  condition: true,
            });
            return res.status(200).json({
                  results: product ? [product] : [],
            });
      }

      const product = await Product.find({
            name: regex,
            condition: true,
      });
      res.status(200).json({
            results: product ? [product] : [],
      });
};

const searchCategory = async (term, res = response) => {
      const isMongoId = ObjectId.isValid(term);

      const regex = new RegExp(term, 'i'); //Not  case sensitive
      if (isMongoId) {
            const user = await Category.findById(term);
            return res.status(200).json({
                  results: user ? [user] : [],
            });
      }

      const user = await Category.find({
            name: regex,
            condition: true,
      }).populate(populateUser);
      res.status(200).json({
            results: user ? [user] : [],
      });
};

const search = (req, res = response) => {
      const { collection, term = 'carlos' } = req.params;

      if (!allowCollection.includes(collection)) {
            return res.status(400).json({
                  msg: 'Collection does not exist ',
            });
      }

      switch (collection) {
            case 'category':
                  searchCategory(term, res);
                  break;
            case 'product':
                  searchProduct(term, res);
                  break;
            case 'user':
                  searchUsers(term, res);
                  break;
            default:
                  res.status(500).json({
                        msg: 'Something has gone wrong! Please notify your administrator.',
                  });
                  break;
      }
};

module.exports = {
      search,
};
