import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common'; 
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: any) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id); 
  }
}