import { IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  public username: string;
}
