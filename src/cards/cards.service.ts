import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListsService } from '../lists/lists.service';
import { Card } from './card.entity';
import CreateCardDto from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private listsService: ListsService,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const list = await this.listsService.findById(createCardDto.listId);
    if (!list) {
      throw new NotFoundException('not found list');
    }
    const newCard = this.cardRepository.create({
      ...createCardDto,
      list,
    });
    return this.cardRepository.save(newCard);
  }
}
