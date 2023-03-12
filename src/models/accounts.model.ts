import { Schema, model } from 'mongoose';

import { IAccount } from 'interfaces/accounts.interface';

const AccountsSchema = new Schema<IAccount>({
  account_id: { type: Number, unique: true },
  limit: Number,
  products: [String],
});

export const AccountsModel = model<IAccount>('Accounts', AccountsSchema);
