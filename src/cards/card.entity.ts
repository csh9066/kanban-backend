import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../lists/list.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => List, (list) => list.cards)
  list: List;
}
