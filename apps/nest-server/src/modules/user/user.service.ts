import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUser } from './interfaces/create-user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(q: string) {
    return this.userRepository.findAll(q);
  }

  async findById(userId: string) {
    return this.userRepository.findById(userId);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async create({ email, password }: CreateUser) {
    const salt = bcrypt.genSaltSync();

    const hashedPassword = await bcrypt.hash(password, salt);

    return this.userRepository.create({ email, password: hashedPassword });
  }
}
