import { Body, Controller, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import CreateCardDto from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardsService.create(createCardDto);
  }
}
