const validateAdminRole = (req, res, next) => {
      if (!req.user) {
            return res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }

      const { role } = req.user;

      if (role !== 'ADMIN_ROLE') {
            return res.status(401).json({
                  msg: 'Must Be Authorized',
            });
      }
      next();
};

const validateRoles = (...roles) => {
      return (req, res, next) => {
            if (!req.user) {
                  return res.status(500).json({
                        msg: 'Something has gone wrong! Please notify your administrator.',
                  });
            }
            const { role } = req.user;
            if (!roles.includes(role)) {
                  return res.status(401).json({
                        msg: 'Must Be Authorized',
                  });
            }
            next();
      };
};

module.exports = {
      validateAdminRole,
      validateRoles,
};
