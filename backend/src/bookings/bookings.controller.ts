import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: any) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }
}