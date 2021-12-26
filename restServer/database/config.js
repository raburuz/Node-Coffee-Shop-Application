const mongoose = require('mongoose');

const dbConnection = async () => {
      try {
            await mongoose.connect(process.env.MONGODB_ATLAS_CNN);
            console.log('DataBase Online');
      } catch (error) {
            console.log(error);
            throw new Error('Error on DataBase');
      }
};

module.exports = {
      dbConnection,
};
