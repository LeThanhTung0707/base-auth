import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { IsArray, IsString } from 'class-validator';

class UpdateImagesDto {
  @IsArray()
  @IsString({ each: true })
  images: string[];
}

import { AuthGuard } from '../common/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('ownerId') ownerId?: string,
  ) {
    return this.roomService.findAll(category, ownerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomService.update(id, dto);
  }

  @Patch(':id/images')
  @UseGuards(AuthGuard)
  updateImages(@Param('id') id: string, @Body() dto: UpdateImagesDto) {
    return this.roomService.updateImages(id, dto.images);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
