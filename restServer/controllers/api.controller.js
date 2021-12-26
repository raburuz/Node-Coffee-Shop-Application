const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUser = async (req, res = response) => {
      const { limit = 5, from = 0 } = req.query;
      const query = { condition: true };
      const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query).skip(Number(from)).limit(Number(limit)),
      ]);
      res.json({
            total,
            users,
      });
};

const postUser = async (req, res = response) => {
      const { name, email, password, role } = req.body;

      const user = new User({
            name,
            email,
            password,
            role,
      });
      //Encryt password
      const salt = bcryptjs.genSaltSync(10);
      user.password = bcryptjs.hashSync(password, salt);

      //Save Database
      try {
            await user.save();
            res.status(201).json({
                  msg: 'post API',
                  user,
            });
      } catch (error) {
            res.status(400).json({
                  msg: 'Post API ' + error,
            });
      }
};

const putUser = async (req, res = response) => {
      const { id } = req.params;
      const { _id, password, google, ...userData } = req.body;

      if (password) {
            const salt = bcryptjs.genSaltSync(10);
            userData.password = bcryptjs.hashSync(password, salt);
      }

      try {
            const user = await User.findByIdAndUpdate(id, userData);
            res.status(200).json({
                  msg: 'put API',
                  id,
                  user,
            });
      } catch (error) {
            res.status(404).json({
                  msg: 'put API' + error,
            });
      }
};

const deleteUser = async (req, res = response) => {
      const { id } = req.params;
      //const uid = req.uid;

      //Real delete
      //const user = await User.findByIdAndDelete(id);
      const user = await User.findByIdAndUpdate(id, { condition: false });

      const { condition } = user;

      if (!condition) {
            return res.status(400).json({
                  msg: `User account doesn't found or already deleted `,
            });
      }
      const userAuthenticated = req.user;
      res.status(200).json({ user, userAuthenticated });
};

module.exports = {
      getUser,
      postUser,
      putUser,
      deleteUser,
};
