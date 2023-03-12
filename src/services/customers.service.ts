import { isEmpty } from 'utils/util';
import { CustomerModel } from 'models/customers.model';
import AccountsService from 'services/accounts.service';
import { HttpException } from 'exceptions/HttpException';
import { ICustomer } from 'interfaces/customers.interface';
import TransactionService from 'services/transaction.service';

interface IAccountsTransaction {
  account_id: number;
  limit: number;
  transaction_count: number;
}
class CustomersService {
  public customer = CustomerModel;
  public accountService = new AccountsService();
  public transactionService = new TransactionService();

  public async findCustomerByUsername(username: string): Promise<ICustomer> {
    if (isEmpty(username)) throw new HttpException(400, 'No username received');

    const findCustomer: ICustomer | null = await this.customer.findOne(
      { username },
      'name birthdate email accounts'
    );
    if (!findCustomer) throw new HttpException(404, 'No customer found');

    return findCustomer;
  }

  public async findAccountsAndTransactionDataByAccountId(
    accounts: number[]
  ): Promise<IAccountsTransaction[]> {
    if (isEmpty(accounts)) throw new HttpException(400, 'No accounts received');

    const accountsTransactionData = [];
    for (let index in accounts) {
      const account_id = accounts[index];

      const [account, transaction] = await Promise.all([
        this.accountService.findAccountsByAccountId(account_id),
        this.transactionService.findTransactionsByAccountId(account_id),
      ]);
      if (!account || !transaction)
        throw new HttpException(404, 'No data found');

      const obj: IAccountsTransaction = {
        account_id,
        limit: account.limit,
        transaction_count: transaction.transaction_count,
      };
      accountsTransactionData.push(obj);
    }

    return accountsTransactionData;
  }
}

export default CustomersService;
