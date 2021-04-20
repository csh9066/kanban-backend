import { IsNumber, IsString, IsUUID } from 'class-validator';
export default class CreateListDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsUUID()
  boardId: string;
}
