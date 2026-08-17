import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carModel: string;  

  @Column()
  price: string;     

  @Column()
  customerName: string; 

  @Column()
  phone: string;    

  @Column()
  pickupDate: string;

  @Column()
  dropoffDate: string;

  @Column({ default: 'Pending' })
  status: string; // Pending/Confirmed
}