import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  ownerId: string;

  @IsInt()
  wardCode: number;

  @IsOptional()
  @IsInt()
  historicalWardCode?: number;
}
