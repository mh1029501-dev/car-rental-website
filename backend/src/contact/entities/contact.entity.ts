 import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

    @Entity()
    export class Contact {
      @PrimaryGeneratedColumn()
      id: number;

      @Column()
      firstName: string;

      @Column()
      lastName: string;

      @Column()
      email: string;

      @Column('text')
      message: string;

      @CreateDateColumn()
      createdAt: Date; 
    }