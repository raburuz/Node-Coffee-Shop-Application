const validateAdminCondition = (req, res, next) => {
      const { condition } = req.user;

      if (!condition) {
            return res.status(400).json({
                  msg: 'Must Be Authenticated',
            });
      }
      next();
};

module.exports = {
      validateAdminCondition,
};
