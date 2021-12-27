const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
      constructor() {
            this.app = express();
            this.port = process.env.PORT;
            //Paths from rutes
            this.paths = {
                  user: '/api/user',
                  auth: '/api/auth',
                  category: '/api/category',
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
      }

      //Rutes from App
      routes() {
            this.app.use(this.paths.user, require('../routes/api.user.routes'));
            this.app.use(this.paths.auth, require('../routes/api.auth.routes'));
            this.app.use(
                  this.paths.category,
                  require('../routes/api.category.routes')
            );
      }

      listen() {
            this.app.listen(this.port, () => {
                  console.log('Listen Port: ' + this.port);
            });
      }
}

module.exports = Server;
