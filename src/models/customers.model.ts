import { Schema, model } from 'mongoose';

import { ICustomer } from 'interfaces/customers.interface';

const TierAndDetailsSchema = new Schema({
  tier: String,
  id: String,
  active: Boolean,
  benefits: [String],
});

const CustomerSchema = new Schema<ICustomer>({
  username: String,
  name: String,
  address: String,
  birthdate: Date,
  email: String,
  active: Boolean,
  accounts: [Number],
  tier_and_details: TierAndDetailsSchema,
});

export const CustomerModel = model<ICustomer>('Customers', CustomerSchema);
