import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { List } from '../lists/list.entity';

@Entity()
export class Card {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => List, (list) => list.cards)
  list: List;
}
