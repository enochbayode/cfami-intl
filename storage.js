// importing the required modules
const googleCloud = require('@google-cloud/storage');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const { v4: uuid } = require('uuid');
const path = require('path');

class Storage {
  constructor() {
    //defining the list of accepted media files
    this.media = ['jpeg', 'png', 'jpg', 'gif', 'mp4', 'mp3'];
    // setting up google firebase storage
    this.storage = new googleCloud.Storage({
      projectId: process.env.Firebase_Project_ID, //'<Firebase Project ID'
      keyFilename: path.resolve(process.env.Private_Key_JSON), //'<path to service accounts prviate key JSON>'
    });

    // setting up the firebase storage bucket
    this.bucket = this.storage.bucket(process.env.Image_Bucket);

    // validating the file type of the images uploaded
    this.fileFilter = (req, file, cb) => {
      if (this.media.includes(file.mimetype.split('/')[1])) {
        cb(null, true);
        return;
      } else {
        cb(new Error('Invalid file'));
        // cb(null, false);
        return;
      }
    };

    //media files should not exceed 10 MB
    this.fileSize = 10 * 1024 * 1024;

    // setting up multer for form data handling
    this.upload = multer({
      //storing image as buffer in memory for use in firebase
      storage: multerGoogleStorage.storageEngine({
        keyFilename: path.resolve(process.env.Private_Key_JSON),
        projectId: process.env.Firebase_Project_ID,
        bucket: process.env.Image_Bucket,
        // contentType: function (req, file) {
        //   var type =
        //     file.mimetype === 'image/jpeg'
        //       ? 'image/jpeg'
        //       : file.mimetype === 'image/png'
        //       ? 'image/png'
        //       : 'image/jpg';
        //   return type;
        // },
        acl: 'publicread',
        filename: (req, file, cb) => {
          const filename = this.generateFilename(file);
          cb(null, filename);
        },
      }),
      limits: { fileSize: this.fileSize }, //image should not exceed 10 MB
      fileFilter: this.fileFilter,
    });
  }

  // helper function for creating new file name
  generateFilename(file) {
    let fields = file.originalname.split('.');
    let fileType = fields[fields.length - 1];
    let randName = uuid();
    let newFileName = `${randName}.${fileType}`;
    return newFileName;
  }

  // helper function for deleting images from firestore
  deleteImages(files) {
    if (files) {
      files.map(async (file) => {
        try {
          await this.bucket.file(file.filename).delete();
          return true;
        } catch (error) {
          return false;
        }
      });
    }
  }
  // helper function for deleting image from firestore
  async deleteImage(file) {
    if (file) {
      try {
        await this.bucket.file(file.filename).delete();
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}
const store = new Storage()

store.upload.single('file')
module.exports = { Storage };
