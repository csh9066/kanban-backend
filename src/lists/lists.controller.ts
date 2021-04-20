import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import CreateListDto from './dto/create-list.dto';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
  constructor(private listsService: ListsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/reorder')
  async reorder(@Body() orderedListIds: string[]) {
    return await this.listsService.reorder(orderedListIds);
  }
}
