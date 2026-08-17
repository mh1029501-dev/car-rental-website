import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { Contact } from './entities/contact.entity';

    @Injectable()
    export class ContactService {
      constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
      ) {}

     
      async create(createContactDto: any) {
        return await this.contactRepository.save(createContactDto);
      }

     
      async findAll() {
        return await this.contactRepository.find({ order: { createdAt: 'DESC' } });
      }
    }