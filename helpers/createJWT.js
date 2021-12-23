var jwt = require('jsonwebtoken');

const createJWT = (uid = '') => {
      return new Promise((resolve, reject) => {
            const payload = { uid };
            const options = { expiresIn: '1h' };

            jwt.sign(
                  payload,
                  process.env.PRIVATEKEYJWT,
                  options,
                  (error, token) => {
                        if (error) {
                              reject('Can not create JWT');
                        } else {
                              resolve(token);
                        }
                  }
            );
      });
};

module.exports = { createJWT };
