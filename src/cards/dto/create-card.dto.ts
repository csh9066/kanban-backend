import { IsNumber, IsString, IsUUID } from 'class-validator';

export default class CreateCardDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsUUID()
  listId: string;
}
