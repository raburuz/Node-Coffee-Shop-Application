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
            throw new Error('Not a valid Id ff');
      }
};

module.exports = {
      isValidRole,
      isUniqueEmail,
      isValidId,
};
