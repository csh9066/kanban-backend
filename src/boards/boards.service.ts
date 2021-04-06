import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    private usresService: UsersService,
  ) {}

  async create(
    createBoardDto: CreateBoardDto,
    ownerId: string,
  ): Promise<Board> {
    const owner = await this.usresService.findOne({ id: ownerId });
    const newBoard = await this.boardRepository.create({
      ...createBoardDto,
      owner,
    });
    await this.boardRepository.save(newBoard);
    delete newBoard.owner;
    return newBoard;
  }

  async findAll(ownerId: string): Promise<Board[]> {
    const boards = await this.boardRepository.find({
      where: {
        owner: {
          id: ownerId,
        },
      },
    });
    return boards;
  }
}
