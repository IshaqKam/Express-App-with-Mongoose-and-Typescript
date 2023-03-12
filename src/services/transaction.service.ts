import { isEmpty } from 'utils/util';
import { HttpException } from 'exceptions/HttpException';
import { TransactionModel } from 'models/transactions.model';
import {
  ITransaction,
  ITransactionDetails,
} from 'interfaces/transaction.interface';

class TrasactionService {
  public transaction = TransactionModel;

  public async findTransactionsByAccountId(
    account_id: number
  ): Promise<ITransaction> {
    if (isEmpty(account_id))
      throw new HttpException(400, 'No account id received');

    const findAccount: ITransaction | null = await this.transaction.findOne(
      { account_id },
      'transaction_count transactions'
    );
    if (!findAccount) throw new HttpException(404, 'No transaction found');

    return findAccount;
  }

  public async GetTransactionAmountByType(
    transactions: ITransactionDetails[]
  ): Promise<{ buy_amount: number; sell_amount: number }> {
    if (isEmpty(transactions))
      throw new HttpException(400, 'No transactions received');

    const buy = [];
    const sell = [];

    for (let index in transactions) {
      const transaction = transactions[index];
      if (transaction.transaction_code === 'buy') {
        buy.push(transaction.amount);
      } else if (transaction.transaction_code === 'sell') {
        sell.push(transaction.amount);
      }
    }

    return {
      sell_amount: sell.reduce((a, b) => a + b),
      buy_amount: buy.reduce((a, b) => a + b),
    };
  }
}

export default TrasactionService;
