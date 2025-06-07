
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(createAuthDto: CreateAuthDto): Promise<User> {
    const { email, firstName, lastName } = createAuthDto;
    
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ 
      where: { full_name: email } 
    });
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const user = this.userRepository.create({
      full_name: `${firstName} ${lastName}`,
      role: 'farmer', // Default role
    });

    return this.userRepository.save(user);
  }

  async syncUser(userId: string, userData: Partial<User>): Promise<User> {
    let user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      // Create user if doesn't exist
      user = this.userRepository.create({
        id: userId,
        ...userData,
      });
    } else {
      // Update existing user
      Object.assign(user, userData);
    }
    
    return this.userRepository.save(user);
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
