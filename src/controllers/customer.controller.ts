import { format } from 'date-fns';
import { NextFunction, Request, Response } from 'express';

import { CustomerDto } from 'dtos/customer.dto';
import CustomersService from 'services/customers.service';
import { ICustomer } from 'interfaces/customers.interface';

class CustomerController {
  public customersService = new CustomersService();

  public getCustomerData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username }: CustomerDto = req.body;
      const findCustomerByUsername: ICustomer =
        await this.customersService.findCustomerByUsername(username);
      const { accounts } = findCustomerByUsername;

      const findAccountsTransactionData =
        await this.customersService.findAccountsAndTransactionDataByAccountId(
          accounts
        );

      const { name, email, birthdate } = findCustomerByUsername;

      const response = {
        name,
        birthdate: format(new Date(birthdate), 'yyyy-MM-dd'),
        email: email,
        accounts: findAccountsTransactionData,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default CustomerController;
