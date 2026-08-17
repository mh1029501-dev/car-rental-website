import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  
  async login(loginData: any) {
    const user = await this.usersRepository.findOne({ where: { email: loginData.email } });

    if (!user || user.password !== loginData.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: 'fake-jwt-token',
      user_id: user.id,
      email: user.email,
      name: user.name 
    };
  }

  
  async signup(userData: any) {
    const newUser = this.usersRepository.create(userData); 
    
    try {
     
      return await this.usersRepository.save(newUser);
    } catch (error) {
      
      if (error.code === '23505') {
        throw new ConflictException('Email already exists! Please use another email.');
      }
      
      throw new InternalServerErrorException();
    }
  }

  
  async getProfile(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    
    const { password, ...result } = user; 
    return result;
  }

  
  async updateProfile(id: number, updateData: any) {
    await this.usersRepository.update(id, updateData);
    return this.getProfile(id);
  }
}