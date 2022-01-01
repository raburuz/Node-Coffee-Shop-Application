const path = require('path');

const { v4: uuidv4 } = require('uuid');

const uploadFile = (
      file,
      mimetypeAvailable = ['image/png', 'image/jpeg', 'image/jpg'],
      folder = ''
) => {
      return new Promise((resolve, reject) => {
            const { mimetype, name } = file;
            const cutName = name.split('.');
            const extension = cutName.pop();
            const temporalName = `${uuidv4()}.${extension}`;
            const uploadPath = path.join(
                  __dirname,
                  '../uploads/',
                  folder,
                  temporalName
            );

            //validate Mimetype
            if (!mimetypeAvailable.includes(mimetype)) {
                  reject(
                        `There was an error uploading the file, please try again. - ${mimetypeAvailable}`
                  );
            }

            file.mv(uploadPath, (err) => {
                  if (err) {
                        reject(` ${err}`);
                  }

                  resolve(`${temporalName}`);
            });
      });
};

module.exports = {
      uploadFile,
};
