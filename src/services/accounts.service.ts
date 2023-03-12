import { isEmpty } from 'utils/util';
import { AccountsModel } from 'models/accounts.model';
import { HttpException } from 'exceptions/HttpException';
import { IAccount } from 'interfaces/accounts.interface';

class AccountsService {
  public accounts = AccountsModel;

  public async findAccountsByAccountId(account_id: number): Promise<IAccount> {
    if (isEmpty(account_id))
      throw new HttpException(400, 'No account id received');

    const findAccount: IAccount | null = await this.accounts.findOne(
      { account_id },
      'limit'
    );
    if (!findAccount) throw new HttpException(404, 'No account found');

    return findAccount;
  }
}

export default AccountsService;
