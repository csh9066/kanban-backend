import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`${email}는 존재하지 않는 유저 입니다.`);
    }
    return user;
  }

  async create(user: CreateUserDto) {
    const isExistUser = await this.usersRepository.findOne({
      email: user.email,
    });
    if (isExistUser) {
      throw new ConflictException(`${user.email}은 사용중인 이메일 입니다.`);
    }
    const newUser = await this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
