import { Document } from 'mongoose';

export interface IAccount extends Document {
  account_id: number;
  limit: number;
  products: string[];
}
