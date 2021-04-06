import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import { Card } from '../cards/card.entity';

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

  @OneToMany(() => Card, (card) => card.list)
  cards: Card[];
}
