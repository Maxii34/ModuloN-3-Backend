import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './dbconfig.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middlewares();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }

  listen() {
    this.app.listen(this.port, () => console.info(`El servidor se está ejecutando en: http://localhost:${this.port}`));
  }
}