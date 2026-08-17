import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  create(createBookingDto: any) {
    return this.bookingRepository.save(createBookingDto);
  }

  findAll() {
    return this.bookingRepository.find();
  }
}