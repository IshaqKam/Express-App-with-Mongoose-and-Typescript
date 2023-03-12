import express from 'express';
import cors from 'cors';
import { url } from './config/db.config';
import mongoose from 'mongoose';
import { Routes } from 'interfaces/route.interface';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = 3000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeMongooseConnection();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log('=================================');
      console.log(`App listening on the port ${this.port}`);
      console.log('=================================');
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({ origin: 'http://localhost:8081' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeMongooseConnection() {
    mongoose
      .connect(url, {})
      .then(() => {
        console.log('=================================');
        console.log('Connected to the database!');
        console.log('=================================');
      })
      .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
      });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }
}

export default App;
