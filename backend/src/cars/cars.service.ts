import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  create(createCarDto: any) {
    const newCar = this.carsRepository.create(createCarDto);
    return this.carsRepository.save(newCar);
  }

  findAll() {
    return this.carsRepository.find();
  }

 
  async remove(id: number) {
    await this.carsRepository.delete(id);
    return { deleted: true };
  }
}