const { response } = require('express');
const { Category } = require('../models');

const populate = {
      path: 'user',
      select: 'name email',
};

const getCategories = async (req, res = response) => {
      const { limit = 5 } = req.query;
      const query = { condition: true };

      try {
            const [total, categories] = await Promise.all([
                  Category.countDocuments(query),
                  Category.find(query).limit(Number(limit)).populate(populate),
            ]);
            res.status(200).json({
                  total,
                  categories,
            });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

const getCategory = async (req, res = response) => {
      const { id } = req.params;

      try {
            const category = await Category.findOne({ id }).populate(populate);
            res.status(200).json({
                  category,
            });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

const postCategories = async (req, res = response) => {
      const { condition, user } = req.body;
      const name = req.body.name.toUpperCase();

      const categoryExist = await Category.findOne({ name });

      if (categoryExist) {
            return res.status(400).json({
                  msg: 'Category already exists',
            });
      }

      try {
            const category = new Category({ name, condition, user });

            category.save();
            res.status(200).json({
                  category,
            });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

const deleteCategory = async (req, res = response) => {
      const { id } = req.params;

      try {
            const category = await Category.findByIdAndUpdate(
                  id,
                  {
                        condition: false,
                  },
                  { new: true }
            );

            const { condition } = category;
            if (!condition) {
                  return res.status(400).json({
                        msg: `Can't find this category.`,
                  });
            }
            res.status(200).json({
                  category,
            });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

const putCategory = async (req, res = response) => {
      const { id } = req.params;
      const name = req.body.name.toUpperCase();

      try {
            const category = await Category.findByIdAndUpdate(
                  id,
                  { name },
                  { new: true }
            );

            const { condition } = category;
            if (!condition) {
                  return res.status(400).json({
                        msg: `Can't find this category.`,
                  });
            }
            res.status(200).json(category);
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

module.exports = {
      getCategories,
      postCategories,
      getCategory,
      deleteCategory,
      putCategory,
};
