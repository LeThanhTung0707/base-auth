import { IsUUID, IsDateString, IsInt, Min } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  roomId: string;

  @IsUUID()
  userId: string;

  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;

  @IsInt()
  @Min(0)
  totalPrice: number;
}
