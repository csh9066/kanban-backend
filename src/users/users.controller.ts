import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:email')
  async findByEmail(@Param('email') email: string, @Req() req: Request) {
    return await this.userService.findByEmail(email);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }
}
