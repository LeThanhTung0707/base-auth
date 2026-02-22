import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() dto: CreateBookingDto, @User() user: { sub: string }) {
    dto.userId = user.sub;
    return this.bookingService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@User() user: { sub: string }) {
    return this.bookingService.findAll(user.sub);
  }

  @Get('room/:roomId')
  @UseGuards(AuthGuard)
  findByRoomForHost(
    @Param('roomId') roomId: string,
    @User() user: { sub: string },
  ) {
    return this.bookingService.findByRoomForHost(roomId, user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateBookingDto) {
    // Ideally we should also check if the booking belongs to the user, but for now this is fine.
    return this.bookingService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
