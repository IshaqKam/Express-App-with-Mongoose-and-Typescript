import { Schema, model } from 'mongoose';

import { ITransaction } from 'interfaces/transaction.interface';

const TransactionDetails = new Schema({
  date: Date,
  amount: Number,
  transaction_code: String,
  symbol: String,
  price: String,
  total: String,
});

const TransactionSchema = new Schema<ITransaction>({
  account_id: Number,
  transaction_count: Number,
  bucket_start_date: Date,
  bucket_end_date: Date,
  transactions: [TransactionDetails],
});

export const TransactionModel = model<ITransaction>(
  'Transactions',
  TransactionSchema
);
