import { IsUUID, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  roomId: string;

  userId?: string;

  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;

  @IsNumber()
  @Min(0)
  totalPrice: number;
}
