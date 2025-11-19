import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly repo: BookingRepository) {}

  create(dto: CreateBookingDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const booking = await this.repo.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  update(id: string, dto: UpdateBookingDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
