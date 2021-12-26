const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async (req, res = response, next) => {
      const token = req.header('x-token');
      if (!token) {
            return res.status(401).json({
                  msg: 'Must Be Authenticated',
            });
      }

      try {
            const { uid } = jwt.verify(token, process.env.PRIVATEKEYJWT);
            const userAuthenticated = await User.findById(uid);
            if (!userAuthenticated) {
                  return res.status(400).json({
                        msg: `'Must Be Authenticated `,
                  });
            }
            req.user = userAuthenticated;
            next();
      } catch (error) {
            res.status(401).json({
                  msg: 'Must Be Authenticated ',
            });
      }
};

module.exports = {
      validarJWT,
};
