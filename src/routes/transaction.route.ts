import { Router } from 'express';

import { Routes } from 'interfaces/route.interface';
import validationMiddleware from 'middlewares/validation.middleware';
import { TransactionDto } from 'dtos/transaction.dto';
import TransactionsController from 'controllers/transaction.controller';

class TransactionsRoute implements Routes {
  public path = '/transactions';
  public router = Router();
  public transactionsController = new TransactionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(TransactionDto, 'body'),
      this.transactionsController.getTransactionsData
    );
  }
}

export default TransactionsRoute;
