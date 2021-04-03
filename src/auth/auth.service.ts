import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string): Promise<User | null> {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      return null;
    }
    delete user.password;
    return user;
  }

  async login({
    email,
    password,
  }: LoginUserDto): Promise<{ user: User; accessToken: string }> {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new NotFoundException(`${email}은 존재하지 않는 유저입니다.`);
    }

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException(`패스워드가 틀렸습니다.`);
    }

    delete user.password;
    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });

    return {
      user,
      accessToken,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<void> {
    const isExistUser = await this.usersService.findOne({
      email: createUserDto.email,
    });

    if (isExistUser) {
      throw new ConflictException(
        `${createUserDto.email}은 이미 존재하는 유저입니다.`,
      );
    }

    await this.usersService.create(createUserDto);
  }
}
