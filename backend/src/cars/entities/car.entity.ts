import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;      

  @Column()
  price: number;      

  @Column()
  description: string; 

  @Column({ nullable: true })
  image: string;      
}