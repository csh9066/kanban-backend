import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../users/auth-user.decorator';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @AuthUser('id') userId: string,
  ) {
    return await this.boardsService.create(createBoardDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@AuthUser('id') userId: string) {
    return await this.boardsService.findAll(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.boardsService.findById(id);
  }
}
