import { Document } from 'mongoose';

export interface ICustomer extends Document {
  username: string;
  name: string;
  address: string;
  birthdate: string;
  email: string;
  active: string;
  accounts: number[];
  tier_and_details: {
    tier: string;
    id: string;
    active: boolean;
    benefits: string[];
  };
}
