import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.comparePassword(password))) {
      delete user.password;
    }

    const accessToken = this.jwtService.sign({ userId: user.id });

    return {
      user,
      accessToken,
    };
  }
}
