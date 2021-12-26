const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { createJWT } = require('../helpers/createJWT');
const { googleVerify } = require('../helpers/google.verify');

const User = require('../models/user');

const login = async (req, res = response) => {
      const { email, password } = req.body;

      try {
            const user = await User.findOne({ email });

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

const googleSignIn = async (req, res) => {
      const { id_token } = req.body;

      try {
            const googleUser = await googleVerify(id_token);
            const { name, email, picture } = googleUser;
            let user = await User.findOne({ email });

            if (!user) {
                  //create
                  const data = {
                        name,
                        email,
                        password: ':P',
                        img: picture,
                        role: 'USER_ROLE',
                        google: true,
                  };

                  user = new User(data);

                  await user.save();
            }

            if (!user.condition) {
                  return res.status(401).json({
                        msg: 'User Blocked',
                  });
            }

            const token = await createJWT(user.id);

            res.status(200).json({
                  user,
                  token,
            });
      } catch (error) {
            res.status(400).json({
                  msg: 'Something was wrong with Google Account',
            });
      }
};

module.exports = { login, googleSignIn };
