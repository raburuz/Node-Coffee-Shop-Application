const { Category, Product } = require('../models');
const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
      const existRole = await Role.findOne({ role });
      if (!existRole) {
            throw new Error('Not a valid role');
      }
};
const isUniqueEmail = async (email = '') => {
      const alreadyExistEmail = await User.findOne({ email });
      if (alreadyExistEmail) {
            throw new Error('Email already registered');
      }
};

const isValidId = async (_id = '') => {
      const existId = await User.findById(_id);

      if (!existId) {
            throw new Error('Not a valid Id');
      }
};

const isValidCategory = async (_id = '') => {
      const existId = await Category.findById(_id);

      if (!existId) {
            throw new Error('Not a valid Id');
      }
};

const isValidName = async (name = '') => {
      const nameToUpper = name.toUpperCase();

      const nameExist = await Category.findOne({ name: nameToUpper });

      if (nameExist) {
            throw new Error('Name is already taken ');
      }
};

const isValidProduct = async (id = '') => {
      const existId = await Product.findOne({ id });

      if (!existId) {
            throw new Error('Product is not valid ');
      }
};

module.exports = {
      isValidRole,
      isUniqueEmail,
      isValidId,
      isValidCategory,
      isValidName,
      isValidProduct,
};
