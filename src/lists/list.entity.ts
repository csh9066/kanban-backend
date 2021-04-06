import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.lists)
  board: Board;
}
