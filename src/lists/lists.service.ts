import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import CreateListDto from './dto/create-list-dto';
import { List } from './list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    private boardsService: BoardsService,
  ) {}

  async create(createListDto: CreateListDto): Promise<List> {
    const board = await this.boardsService.findById(createListDto.boardId);
    if (!board) {
      throw new NotFoundException('not found board');
    }
    const newList = await this.listRepository.create({
      ...createListDto,
      board,
    });
    await this.listRepository.save(newList);
    delete newList.board;
    return newList;
  }

  async findById(id: string): Promise<List> {
    return this.listRepository.findOne(id);
  }
}
