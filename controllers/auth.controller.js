const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { createJWT } = require('../helpers/createJWT');

const User = require('../models/user');

const login = async (req, res = response) => {
      const { email, password } = req.body;

      try {
            const user = await User.findOne({ email });
            console.log(user);
            //Validate Mail
            if (!user) {
                  return res.status(400).json({
                        msg: 'Email or Password are incorrect ',
                  });
            }

            //Validate Condition
            if (!user.condition) {
                  return res.status(400).json({
                        msg: 'Email or Password are incorrect ',
                  });
            }

            //Validate Password
            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                  return res.status(400).json({
                        msg: 'Email or Password are incorrect ',
                  });
            }

            //create JWT
            const token = await createJWT(user.id);

            res.status(200).json({
                  user,
                  token,
            });
      } catch (error) {
            res.status(500).json({
                  error,
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

module.exports = { login };
