import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  bookingId!: string;

  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
