const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
      constructor() {
            this.app = express();
            this.port = process.env.PORT;
            //Paths from rutes
            this.paths = {
                  user: '/api/user',
                  auth: '/api/auth',
                  category: '/api/category',
                  product: '/api/product',
                  search: '/api/search',
                  upload: '/api/upload',
            };

            //Connect DB
            this.connectDB();

            //Middlewares
            this.middlewares();

            //Rutes from App
            this.routes();
      }

      async connectDB() {
            await dbConnection();
      }

      middlewares() {
            this.app.use(cors());

            //read json.body
            this.app.use(express.json());

            //Public
            this.app.use(express.static('public'));

            //File Upload
            this.app.use(
                  fileUpload({
                        useTempFiles: true,
                        tempFileDir: '/tmp/',
                        createParentPath: true,
                  })
            );
      }

      //Rutes from App
      routes() {
            this.app.use(this.paths.user, require('../routes/api.user.routes'));
            this.app.use(this.paths.auth, require('../routes/api.auth.routes'));
            this.app.use(
                  this.paths.category,
                  require('../routes/api.category.routes')
            );
            this.app.use(
                  this.paths.product,
                  require('../routes/api.product.routes')
            );

            this.app.use(
                  this.paths.search,
                  require('../routes/api.search.routes')
            );

            this.app.use(
                  this.paths.upload,
                  require('../routes/api.upload.routes')
            );
      }

      listen() {
            this.app.listen(this.port, () => {
                  console.log('Listen Port: ' + this.port);
            });
      }
}

module.exports = Server;
