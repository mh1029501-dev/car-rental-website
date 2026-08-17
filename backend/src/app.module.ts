import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';


import { CarsModule } from './cars/cars.module';
import { BookingsModule } from './bookings/bookings.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hammad224', 
      database: 'car_rental_db',
      
      
      autoLoadEntities: true, 
      synchronize: true,
    }),
    AuthModule,
    
    
    CarsModule,
    
    BookingsModule,
    
    ContactModule, 
  ],
})
export class AppModule {}