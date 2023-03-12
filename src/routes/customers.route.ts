import { Router } from 'express';

import { Routes } from 'interfaces/route.interface';
import CustomersController from 'controllers/customer.controller';
import validationMiddleware from 'middlewares/validation.middleware';
import { CustomerDto } from 'dtos/customer.dto';

class CustomersRoute implements Routes {
  public path = '/customers';
  public router = Router();
  public customersController = new CustomersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(CustomerDto, 'body'),
      this.customersController.getCustomerData
    );
  }
}

export default CustomersRoute;
