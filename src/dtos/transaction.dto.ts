import { IsNumber } from 'class-validator';

export class TransactionDto {
  @IsNumber()
  public account_id: number;
}
