const path = require('path');
const fs = require('fs');

const deletePreviousImage = (img, collection) => {
      if (img) {
            const pathImage = path.join(
                  __dirname,
                  '../uploads',
                  collection,
                  img
            );

            if (fs.existsSync(pathImage)) {
                  fs.unlinkSync(pathImage);
            }
      }
};

module.exports = {
      deletePreviousImage,
};
