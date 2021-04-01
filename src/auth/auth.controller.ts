import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);

    return await this.authService.login(loginUserDto);
  }

  @Post('/register')
  async register(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }
}
