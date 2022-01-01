const path = require('path');
const fs = require('fs');

const { response } = require('express');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { deletePreviousImage } = require('../helpers/deletePreviousImage');
const { uploadFile } = require('../helpers/uploadFile');

const uploadImages = async (req, res = response) => {
      const { file } = req.files;

      try {
            const name = await uploadFile(file, undefined, 'images');
            res.json({
                  name,
            });
      } catch (msg) {
            res.status(400).json({
                  msg,
            });
      }
};
const uploadText = async (req, res = response) => {
      const { file } = req.files;
      try {
            const name = await uploadFile(
                  file,
                  ['text/plain', 'text/plain'],
                  'text'
            );
            res.json({
                  name,
            });
      } catch (msg) {
            res.status(400).json({
                  msg,
            });
      }
};

const updateImage = async (req, res = response) => {
      const { collection } = req.params;
      const { element } = req;
      const { file } = req.files;

      deletePreviousImage(element.img, collection);
      const name = await uploadFile(file, undefined, collection);
      element.img = name;
      try {
            element.save();
            res.json({
                  element,
            });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

const updateImageClouddinary = async (req, res = response) => {
      const { element } = req;
      const { file } = req.files;
      if (element.img) {
            const fullPathArray = element.img.split('/');
            const fullNameArray = fullPathArray.pop();
            const [public_id] = fullNameArray.split('.');
            cloudinary.uploader.destroy(public_id);
      }

      const { secure_url } = await cloudinary.uploader.upload(
            file.tempFilePath
      );
      const image = secure_url;
      element.img = image;
      try {
            element.save();
            res.json({
                  element,
            });
      } catch (error) {
            res.status(500).json({
                  msg: 'Something has gone wrong! Please notify your administrator.',
            });
      }
};

const getImage = async (req, res = response) => {
      const { collection } = req.params;
      const { element } = req;

      if (!element.img) {
            element.img = 'no-image.jpg';
      }

      const pathToImage = path.join(
            __dirname,
            '../uploads',
            collection,
            element.img
      );
      if (!fs.existsSync(pathToImage)) {
            const notFoundImg = path.join(__dirname, '../assets', element.img);

            return res.sendFile(notFoundImg);
      }

      if (fs.existsSync(pathToImage)) {
            return res.sendFile(pathToImage);
      }
};
module.exports = {
      uploadImages,
      uploadText,
      updateImage,
      getImage,
      updateImageClouddinary,
};
