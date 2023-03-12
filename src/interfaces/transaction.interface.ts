import { Document } from 'mongoose';

export interface ITransactionDetails {
  date: string;
  amount: number;
  transaction_code: string;
  symbol: string;
  price: string;
  total: string;
}

export interface ITransaction extends Document {
  account_id: number;
  transaction_count: number;
  bucket_start_date: string;
  bucket_end_date: string;
  transactions: ITransactionDetails[];
}
