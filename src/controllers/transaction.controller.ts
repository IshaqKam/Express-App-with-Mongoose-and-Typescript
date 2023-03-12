import { NextFunction, Request, Response } from 'express';

import { TransactionDto } from 'dtos/transaction.dto';
import TrasactionService from 'services/transaction.service';
import { ITransaction } from 'interfaces/transaction.interface';

class TransactionsController {
  public transactionService = new TrasactionService();

  public getTransactionsData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { account_id }: TransactionDto = req.body;
      const findAccountTransactions: ITransaction =
        await this.transactionService.findTransactionsByAccountId(account_id);
      const { transactions } = findAccountTransactions;

      const findTransactionsAmount =
        await this.transactionService.GetTransactionAmountByType(transactions);

      const { sell_amount, buy_amount } = findTransactionsAmount;

      const response = {
        total_amount_sold: sell_amount,
        total_amount_bought: buy_amount,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default TransactionsController;
