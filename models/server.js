const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
      constructor() {
            this.app = express();
            this.port = process.env.PORT;
            //Paths from rutes
            this.userPath = '/api/user';
            this.authPath = '/api/auth';

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
            this.app.use(this.userPath, require('../routes/api.user.routes'));
            this.app.use(this.authPath, require('../routes/api.auth.routes'));
      }

      listen() {
            this.app.listen(this.port, () => {
                  console.log('Listen Port: ' + this.port);
            });
      }
}

module.exports = Server;
